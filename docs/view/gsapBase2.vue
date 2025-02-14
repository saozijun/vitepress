<template>
    <div class="gsap-base" ref="wrapperBox">
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
        <div class="base1" ref="base1Ref">
            <div ref="b1BoxRef" class="b1Box">
                <div class="tops" ref="topsRef"></div>
                <ul>
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
                    <li ref="b13"></li>
                    <li ref="b14"></li>
                    <li ref="b15"></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="end">
        <ShinyText text="已经到底啦！" :disabled="false" :speed="3" className="h2" />
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { gsap } from "gsap";
import { inBrowser } from 'vitepress'
import imagesLoaded from 'imagesloaded';

const wrapperBox = ref(null);

const base1Ref = ref(null);
const b1BoxRef = ref(null);
const topsRef = ref(null)
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
const b15 = ref(null);
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
    nextTick(async () => {
        // 效果1
        let computedStyle = window.getComputedStyle(b1.value);
        const items1 = gsap.utils.toArray(".b1Box ul li");
        let b1target = {
            width: parseFloat(computedStyle.width),
            height: parseFloat(computedStyle.height),
        }   
        let b1tl = gsap.timeline({
            scrollTrigger: {
                trigger: base1Ref.value,
                start: "top center",
                end: "+=1000",
                scrub: 1,
                anticipatePin: 1,
                pin: base1Ref.value,
                markers: true, // 调试显示
            }
        })
        b1tl.to(topsRef.value, {width: b1target.width , height: b1target.height, duration: 1.2 }, 0)
        b1tl.to(b1.value, {x: -520, y: -320, opacity: 1, scale: 1, duration: .8 }, 0)
        b1tl.to(b2.value, {x: -260, y: -320, opacity: 1, scale: 1,  duration: 1.2 }, 0)
        b1tl.to(b3.value, {y: -320, opacity: 1, scale: 1,  duration: 1.5 }, 0)
        b1tl.to(b4.value, {x: 520, y: -320, opacity: 1, scale: 1,  duration: .8 }, 0)
        b1tl.to(b5.value, {x: 260, y: -320, opacity: 1, scale: 1,  duration: 1.2 }, 0)
        b1tl.to(b6.value, {x: -520, opacity: 1, scale: 1,  duration: .8 }, 0)
        b1tl.to(b7.value, {x: -260, opacity: 1, scale: 1,  duration: 1.2 }, 0)
        b1tl.to(b8.value, {x: 520, opacity: 1, scale: 1,  duration: .8 }, 0)
        b1tl.to(b9.value, {x: 260, opacity: 1, scale: 1,  duration: 1.2 }, 0)
        
        b1tl.to(b10.value, {x: -520, y: 320, scale: 1,  opacity: 1, duration: .8 }, 0)
        b1tl.to(b11.value, {x: -260, y: 320, scale: 1,  opacity: 1, duration: 1.2 }, 0)
        b1tl.to(b12.value, {y: 320, opacity: 1,scale: 1,  duration: 1.5 }, 0)
        b1tl.to(b13.value, {x: 520, y: 320,scale: 1,  opacity: 1, duration: .8 }, 0)
        b1tl.to(b14.value, {x: 260, y: 320,scale: 1,  opacity: 1, duration: 1.2 }, 0)
        b1tl.to({}, { duration: 1 }, 1)
    });
};
</script>

<style lang="less" scoped>
.gsap-base {
    width: 100%;
    overflow: hidden;
}

.container {
    width: 100%;
    padding-bottom: 400px;
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

.base1{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    height: calc(100vh - 200px);
    .tops{
        width: 100%;
        height: 700px;
        border-radius: 10px;
        background: url('../viewMd/img/bg.webp') no-repeat center center;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 111;
        transform: translate(-50%, -50%);
    }
    .b1Box{
        width: 100%;
        position: relative;
        ul{
            li{
                width: calc(100% / 5);
                height: 300px;
                border-radius: 10px;
                background-color: #0000001f;
                text-align: center;
                line-height: 300px;
                font-size: 40px;
                position: absolute;
                top: 50%;
                left: 50%;
                opacity: 0;
                transform: translate(-50%, -50%) scale(.5);
            }
        }
    }
}
.end{
    text-align: center;
    margin-bottom: 200px;
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
    .top-text {
        .h1 {
            font-size: 88px !important;
        }
    }
}

@media screen and (max-width: 768px) {
    .top-text {
        .h1 {
            font-size: 78px !important;
        }
    }
}
</style>