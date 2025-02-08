<template>
    <div class="container">
        <div class="top-text">
            <div class="top-title">
                <ShinyText text="轻而易剪" :disabled="false" :speed="3" className="h1" />
                <ShinyText text="上演大幕" :disabled="false" :speed="4" className="h1" />
            </div>
            <div class="page-more">
                滑动浏览更多
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    <div class="wrapper-box" ref="wrapperBox">
        <div class="wrapper1" ref="wrapper1">
            <div class="w-b1" ref="wB1">
                <img ref="phone" class="phone" src="../viewMd/img/iPhone.webp" alt="phone" />
                <img ref="t1" class="t1" src="../viewMd/img/MacBookContent.webp" alt="t1" />
                <img ref="t2" class="t2" src="../viewMd/img/MacBookContent.webp" alt="t2" />
                <img ref="k1" class="k1" src="../viewMd/img/MacBook.webp" alt="k1" />
                <img ref="k2" class="k2" src="../viewMd/img/iPad.webp" alt="k2" />
                <img ref="cloud" class="cloud" src="../viewMd/img/cloud.webp" alt="cloud" />
            </div>
        </div>
        <div class="wrapper2" ref="wrapper2">
            <div class="w-b2" ref="wB2">
                <video src="../viewMd/img/demo.mp4" autoplay loop muted></video>
                <div class="editor" ref="editorRef">
                    <img ref="monitor" class="monitor" src="../viewMd/img/monitor.webp" alt="monitor" />
                    <img ref="sidebar" class="sidebar" src="../viewMd/img/sidebar.webp" alt="sidebar" />
                    <img ref="tracks" class="tracks" src="../viewMd/img/tracks.webp" alt="tracks" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { gsap } from "gsap";
import { inBrowser } from 'vitepress'
import imagesLoaded from 'imagesloaded';

const wrapperBox = ref();

// 第一个动画参数
const wB1 = ref();
const phone = ref();
const t1 = ref();
const t2 = ref();
const k1 = ref();
const k2 = ref();
const cloud = ref();
const wrapper1 = ref();

// 第二个动画参数
const wB2 = ref();
const editorRef = ref();
const monitor = ref();
const sidebar = ref();
const tracks = ref();
const wrapper2 = ref();

onMounted(async () => {
    if (inBrowser) {
      let gsapCj = await import('gsap/ScrollTrigger')
      const { ScrollTrigger } = gsapCj
      gsap.registerPlugin(ScrollTrigger);
    }
    imagesLoaded(wrapperBox.value, () => {
        init();
    });
});
const init = () => {
    nextTick(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: wrapper1.value,  // 触发元素
                start: "top center",  // 触发
                end: "+=1500", // 结束
                scrub: 1, // 平滑滚动同步动画
                pin: wB1.value, // 固定 wB1 视图，使其停留在视口中
                // markers: true, // 调试显示
            }
        })
            .to(phone.value, { x: 90, y: 100, scale: 0.9, duration: 1.4 }, 0)
            .to(phone.value, { x: 110, y: 150, scale: 0.75, duration: 1 }, 1.4)
            .to(t1.value, { x: -158, opacity: 1, duration: 1 }, 0)
            .to(t2.value, { x: 268, opacity: 1, duration: 1 }, 0)
            .to(k1.value, { opacity: 1, duration: 1 }, 1)
            .to(k2.value, { opacity: 1, duration: 1 }, 1)
            .to(cloud.value, { opacity: 1, x: 300, duration: 1.5 }, 2.5)
            .to({}, { duration: 5 });

        // 创建一个时间轴
        gsap.timeline({
            scrollTrigger: {
                trigger: wrapper2.value,  // 触发元素
                start: "top center",  // 触发
                end: "+=1000", // 结束
                scrub: 1, // 平滑滚动同步动画
                anticipatePin: 1, 
                pin: wB2.value, // 固定 wB1 视图，使其停留在视口中
                // markers: true, // 调试显示
            }
        })
            .to(editorRef.value, { opacity: 1, duration: 2 }, 0)
            .from(monitor.value, { y: -200, x: 800, scale: 2, duration: 2 }, 0)
            .from(sidebar.value, { y: -200, x: -800, scale: 1.5, duration: 2 }, 0)
            .from(tracks.value, { y: 200, scale: 1.5, duration: 2 }, 0)
            .to({}, { duration: 3 });
    });
};
</script>

<style lang="less" scoped>
.container {
    width: 100%;

    .top-text {
        max-width: 960px;
        height: calc(100vh - 200px);
        margin: 0 auto;
        position: relative;

        .top-title {
            margin: 80px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .h1 {
                text-align: center;
                transition: .4s;
                font-size: 8rem;
                line-height: 1.2;
                font-weight: bold;
                background-color: var(--vp-c-text-1);
            }
        }

        .page-more {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            color: var(--vp-c-text-1);

            span {
                content: "";
                display: block;
                box-sizing: content-box;
                width: 20px;
                height: 20px;
                background: linear-gradient(45deg,
                        rgba(0, 0, 0, 0) 50%,
                        transparent 50%);
                border-bottom: 1px solid var(--vp-c-text-1);
                border-left: 1px solid var(--vp-c-text-1);
                transform: rotate(-45deg);
                animation: arrowMove1 1s infinite;
                flex-shrink: 0;
                position: relative;

                &:nth-child(2) {
                    animation: arrowMove2 1s infinite;
                    top: -12px;
                }

                &:nth-child(3) {
                    animation: arrowMove3 1s infinite;
                    top: -24px;
                }
            }
        }
    }
}
.wrapper-box{
    width: 100%;
    overflow: hidden;
}
.wrapper1 {
    max-width: 960px;
    margin: 80px auto;
    padding-top: 150px;
    text-align: center;
    position: relative;

    .w-b1 {
        width: 960px;
        height: 1000px;
        position: relative;
        perspective: 1000px;
        transform-style: preserve-3d;
        img {
            backface-visibility: hidden;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .phone {
            width: 17%;
            z-index: 111;
        }

        .t1,
        .t2 {
            opacity: 0;
            top: -115px;
            width: 27.3%;
        }

        .t2 {
            width: 33.8%;
            top: -41px;
        }

        .k1,
        .k2 {
            opacity: 0;
            width: 49%;
        }

        .k1 {
            left: 29%;
            top: -2%;
            z-index: 2;
            width: 81%;
        }

        .k2 {
            left: auto;
            top: 2.8%;
            right: -27%;
        }

        .cloud {
            opacity: 0;
            top: 205px;
            width: 8%;
        }
    }
}

.wrapper2 {
    width: 960px;
    margin: 80px auto;
    padding: 150px 0;
    text-align: center;
    position: relative;
    .w-b2 {
        width: 100%;
        height: 540px;
        position: relative;
        perspective: 1000px;
        transform-style: preserve-3d;
        .editor {
            width: 100%;
            height: 100%;
            background: url('../viewMd/img/editor.webp') no-repeat center;
            background-size: 100% 100%;
            opacity: 0;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);

            >img {
                position: absolute;
                top: 0;
                left: 0;
                backface-visibility: hidden;
            }

            .monitor {
                width: 72.5%;
                height: 76.4%;
                left: auto;
                top: 2.8%;
                right: .4%;
            }

            .sidebar {
                top: 2.8%;
                height: 76.4%;
                width: 26.3%;
                left: .4%;
            }

            .tracks {
                width: 99.2%;
                left: 50%;
                top: 100%;
                transform: translate(-50%,-100%);
            }
        }

        video {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

@keyframes arrowMove1 {
    0% {
        transform: translateY(0) rotate(-45deg);
        opacity: 0.9;
    }

    100% {
        transform: translateY(10px) rotate(-45deg);
        opacity: 0.6;
    }
}

@keyframes arrowMove2 {
    0% {
        transform: translateY(0) rotate(-45deg);
        opacity: 0.6;
    }

    100% {
        transform: translateY(10px) rotate(-45deg);
        opacity: 0.3;
    }
}

@keyframes arrowMove3 {
    0% {
        transform: translateY(0) rotate(-45deg);
        opacity: 0.3;
    }

    100% {
        transform: translateY(10px) rotate(-45deg);
        opacity: 0;
    }
}


@media screen and (max-width: 1200px) {
    .top-text{
        .h1{
            font-size: 88px !important;
        }
    }
    .wrapper1{
        width: 100%;
    }
    .wrapper2{
        width: 350px;
        .w-b2 {
            height: 197px;
        }
    }
}

@media screen and (max-width: 768px) {
    .top-text{
        .h1{
            font-size: 58px !important;
        }
    }
}
</style>