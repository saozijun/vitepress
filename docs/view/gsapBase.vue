<template>
    <div class="container">
        <div class="top-text">
            <div class="top-title">
                <ShinyText text="GSAP" :disabled="false" :speed="3" className="h1" />
                <ShinyText text="base" :disabled="false" :speed="3" className="h2" />
            </div>
            <div class="page-more">
                滑动浏览更多
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    <div class="base1">
        <div class="list1">
            <ul>
                <li v-for="i in 3" :key="i"></li>
            </ul>
        </div>
        <div class="list2">
            <ul>
                <li v-for="i in 3" :key="i"></li>
            </ul>
        </div>
    </div>
    <div class="base2" ref="base2Ref">
        <div ref="tips" class="tips"></div>
        <ul ref="b2BoxRef">
            <li ref="b1"></li>
            <li ref="b2"></li>
            <li ref="b3"></li>
            <li ref="b4"></li>
            <li ref="b5"></li>
            <li ref="b6"></li>
            <li ref="b7"></li>
            <li ref="b8"></li>
            <li ref="b9"></li>
            <li ref="b10"></li>
            <li ref="b11"></li>
            <li ref="b12"></li>
            <li ref="b14"></li>
            <li ref="b13">
                <ShinyText text="volcano" :disabled="false" :speed="3" className="b13-text" />
            </li>
        </ul>
    </div>

    <div class="base3" ref="base3Ref">
        <div class="b3Box" ref="b3BoxRef">
            <div class="b3Box-inner" ref="b3BoxInnerRef">
                <img ref="b3ImgRef" src="../viewMd/img/bg.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { gsap } from "gsap";
import { inBrowser } from 'vitepress'
const base2Ref = ref(null);
const b2BoxRef = ref(null);

const tips = ref(null);
const b1 = ref(null);
const b2 = ref(null);
const b3 = ref(null);
const b4 = ref(null);
const b5 = ref(null);
const b6 = ref(null);
const b7 = ref(null);
const b8 = ref(null);
const b9 = ref(null);
const b10 = ref(null);
const b11 = ref(null);
const b12 = ref(null);
const b13 = ref(null);
const b14 = ref(null);

const base3Ref = ref(null);
const b3BoxRef = ref(null);
const b3BoxInnerRef = ref(null);
const b3ImgRef = ref(null);
onMounted(async () => {
    if (inBrowser) {
        let gsapCj = await import('gsap/ScrollTrigger')
        const { ScrollTrigger } = gsapCj
        gsap.registerPlugin(ScrollTrigger);
    }
    init();
});
const init = () => {
    nextTick(async () => {
        // 效果1
        const items = gsap.utils.toArray(".list1 li");
        items.forEach((item, i) => {
            gsap.from(
                item,
                {
                    opacity: 0,
                    x: i % 2 == 0 ? 400 : -400,
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 1,
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        });
        // 效果2
        const items2 = gsap.utils.toArray(".list2 li");
        items2.forEach((item, i) => {
            gsap.from(
                item,
                {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    ease: "power1.Out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom bottom",
                        scrub: 1,
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        });
        // 效果3
        gsap.timeline({
            scrollTrigger: {
                trigger: base2Ref.value,
                start: "center bottom",
                end: "+=1500",
                scrub: 1,
                anticipatePin: 1,
                pin: base2Ref.value,
                // markers: true, // 调试显示
            }
        })
            .from(b2BoxRef.value, { opacity: 0, duration: .4 }, 0)
            .to(b1.value, { y: 80, x: -200, scale: 1.5, duration: 2 }, 0)
            .to(b2.value, { y: 80, x: 200, scale: 1.5, duration: 2 }, 0)
            .to(b3.value, { y: 120, x: -300, scale: 2, duration: 2 }, 0)
            .to(b4.value, { y: 120, x: 300, scale: 2, duration: 2 }, 0)
            .to(b5.value, { y: -80, x: -200, scale: 1.5, duration: 2 }, 0)
            .to(b6.value, { y: -80, x: 200, scale: 1.5, duration: 2 }, 0)
            .to(b7.value, { y: -120, x: -300, scale: 2, duration: 2 }, 0)
            .to(b8.value, { y: -120, x: 300, scale: 2, duration: 2 }, 0)
            .to(b9.value, { y: -50, scale: 1, duration: 2 }, 2)
            .to(b10.value, { y: 50, scale: 1, duration: 2 }, 2)
            .to(b11.value, { y: -50, scale: 1, duration: 2 }, 2)
            .to(b12.value, { y: 50, scale: 1, duration: 2 }, 2)
            .to(b9.value, { x: 80, scale: 1, duration: 2 }, 4)
            .to(b10.value, { x: -80, scale: 1, duration: 2 }, 4)
            .to(b11.value, { x: -80, scale: 1, duration: 2 }, 4)
            .to(b12.value, { x: 80, scale: 1, duration: 2 }, 4)
            .from(b13.value, { opacity: 0, scale: 0, duration: 2 }, 6)
            .to(b14.value, { scale: 2.5, duration: 1 }, 6)
            .to({}, { duration: 3 }, 8);

        // 效果4
        gsap.timeline({
            scrollTrigger: {
                trigger: base3Ref.value,
                start: "top center",
                end: "+=1500",
                scrub: 1,
                anticipatePin: 1,
                pin: base3Ref.value,
                markers: true, // 调试显示
            }
        })
            .to(b3BoxInnerRef.value, { width: 250, duration: 3 }, 0)
            .to(b3BoxInnerRef.value, {
                rotationX: 45,
                rotationY: -400,
                rotationZ: 11,
                boxShadow: "2.34vw 2.08vw 1.3vw rgba(0,0,0,.11)",
                duration: 3
            }, 3)
            .from(b3ImgRef.value, { opacity: 0, duration: 5 }, 3);
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
            padding-top: 80px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .h1,
            .h2 {
                text-align: center;
                transition: .4s;
                font-size: 8rem;
                line-height: 1.2;
                font-weight: bold;
                background-color: var(--vp-c-text-1);
            }

            .h2 {
                font-size: 4rem;
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

.list1,
.list2 {
    width: 100%;

    ul {
        max-width: 960px;
        padding: 0 20px;
        margin: 80px auto;
        display: flex;
        flex-direction: column;
        gap: 20px;

        li {
            width: 100%;
            height: 200px;
            background-color: #0000001f;
        }
    }
}

.base2 {
    width: 100%;

    ul {
        max-width: 960px;
        padding: 20px;
        margin: 0 auto;
        height: calc(100vh - 200px);
        position: relative;

        li {
            width: 50px;
            height: 50px;
            background-color: #0000001f;
            border-radius: 50%;
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translate(-50%, -50%);

            &:last-child {
                width: fit-content;
                background: none;
                line-height: 50px;
            }
        }
    }
}

.b13-text {
    font-size: 28px;
    background-color: #606060;
}

.base3 {
    width: 100%;

    .b3Box {
        max-width: 960px;
        margin: 0 auto;
        height: calc(100vh - 200px);
        position: relative;

        .b3Box-inner {
            width: 100%;
            height: 500px;
            border-radius: 15px;
            background-color: #0000001f;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
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
}

@media screen and (max-width: 768px) {
    .top-text{
        .h1{
            font-size: 78px !important;
        }
    }
}
</style>