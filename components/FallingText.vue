<template>
    <div
      ref="containerRef"
      class="falling-text-container"
      :style="{ position: 'relative', overflow: 'hidden' }"
      @click="handleTrigger"
      @mouseover="handleTrigger"
    >
      <div
        ref="textRef"
        class="falling-text-target"
        :style="{ fontSize: fontSize, lineHeight: 1.4 }"
      ></div>
      <div ref="canvasContainerRef" class="falling-text-canvas"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
  import Matter from "matter-js";
  
  // 定义 props
  const props = defineProps({
    text: { type: String, default: "" },
    highlightWords: { type: Array, default: () => [] },
    highlightClass: { type: String, default: "highlighted" },
    trigger: { type: String, default: "auto" }, // auto, scroll, click, hover
    backgroundColor: { type: String, default: "transparent" },
    wireframes: { type: Boolean, default: false },
    gravity: { type: Number, default: 1 },
    mouseConstraintStiffness: { type: Number, default: 0.2 },
    fontSize: { type: String, default: "1rem" },
    restitution: { type: Number, default: 0.8 },
    frictionAir: { type: Number, default: 0.01 },
    friction: { type: Number, default: 0.2 },

  });
  
  // DOM 引用
  const containerRef = ref(null);
  const textRef = ref(null);
  const canvasContainerRef = ref(null);
  
  // 控制物理效果是否启动
  const effectStarted = ref(false);
  
  // 更新文本内容：将 text 拆分为单词，并根据 highlightWords 添加对应的类名
  const updateTextContent = () => {
    if (!textRef.value) return;
    const words = props.text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = props.highlightWords.some((hw) =>
          word.startsWith(hw)
        );
        return `<span class="word ${isHighlighted ? props.highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
    textRef.value.innerHTML = newHTML;
  };
  
  // 初次挂载时更新文本内容
  onMounted(() => {
    updateTextContent();
  });
  
  // 当 props.text、props.highlightWords、props.highlightClass 变化时，更新文本
  watch(
    () => [props.text, props.highlightWords, props.highlightClass],
    () => {
      updateTextContent();
    }
  );
  
  // 根据 trigger 类型决定何时启动物理效果
  onMounted(() => {
    if (props.trigger === "auto") {
      effectStarted.value = true;
    } else if (props.trigger === "scroll" && containerRef.value) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            effectStarted.value = true;
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.value);
    }
  });
  
  // 针对 click 和 hover 类型，触发启动函数
  const handleTrigger = () => {
    if (
      !effectStarted.value &&
      (props.trigger === "click" || props.trigger === "hover")
    ) {
      effectStarted.value = true;
    }
  };
  
  // 声明 Matter 相关变量和 requestAnimationFrame 的 id
  let engine, render, runner, updateAnimationFrameId;
  
  // 初始化 Matter 物理引擎与渲染器
  const initMatter = () => {
    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
    } = Matter;
  
    const containerRect = containerRef.value.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
  
    if (width <= 0 || height <= 0) {
      return;
    }
  
    engine = Engine.create();
    engine.world.gravity.y = props.gravity;
  
    render = Render.create({
      element: canvasContainerRef.value,
      engine,
      options: {
        width,
        height,
        background: props.backgroundColor,
        wireframes: props.wireframes,
      },
    });
  
    // 添加边界（地板、左右墙、天花板）
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);
  
    // 获取所有单词的 DOM 节点并为每个单词创建一个物理 body
    const wordSpans = textRef.value.querySelectorAll(".word");
    const wordBodies = Array.from(wordSpans).map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
  
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: props.restitution,
        frictionAir: props.frictionAir,
        friction: props.friction,
      });
  
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      return { elem, body };
    });
  
    // 设置每个单词 DOM 的初始位置
    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      const w = body.bounds.max.x - body.bounds.min.x;
      const h = body.bounds.max.y - body.bounds.min.y;
      elem.style.left = `${body.position.x - w / 2}px`;
      elem.style.top = `${body.position.y - h / 2}px`;
      elem.style.transform = "none";
    });
  
    // 添加鼠标控制
    const mouse = Mouse.create(containerRef.value);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: props.mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;
  
    // 将所有元素添加到物理世界中
    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);
  
    runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);
  
    // 动画更新循环，同步 DOM 与物理状态
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        const w = body.bounds.max.x - body.bounds.min.x;
        const h = body.bounds.max.y - body.bounds.min.y;
        elem.style.left = `${x - w / 2}px`;
        elem.style.top = `${y - h / 2}px`;
        elem.style.transform = `rotate(${body.angle}rad)`;
      });
      Engine.update(engine);
      updateAnimationFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();
  };
  
  // 当 effectStarted 为 true 时启动物理效果
  watch(effectStarted, (newVal) => {
    if (newVal) {
      // 确保 DOM 更新完毕
      nextTick(() => {
        initMatter();
      });
    }
  });
  
  // 清理工作
  onBeforeUnmount(() => {
    if (render) {
      Matter.Render.stop(render);
      if (render.canvas && canvasContainerRef.value) {
        canvasContainerRef.value.removeChild(render.canvas);
      }
    }
    if (runner) {
      Matter.Runner.stop(runner);
    }
    if (engine) {
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
    }
    if (updateAnimationFrameId) {
      cancelAnimationFrame(updateAnimationFrameId);
    }
  });
  </script>
  
<style scoped lang="less">
.falling-text-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
  padding-top: 2em;
}

.falling-text-target {
  display: inline-block;
}

:deep(.word) {
  display: inline-block;
  margin: 0 2px;
  user-select: none;
}

:deep(.highlighted){
  color: var(--vp-c-brand);
  font-weight: bold;
}

.falling-text-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
  