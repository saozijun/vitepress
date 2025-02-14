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
                    <div ref="b3t1Ref"></div>
                    <div ref="b3t2Ref"></div>
                    <section>
                        <p ref="b3t3Ref">
                            <ShinyText text="壁纸" :disabled="false" :speed="3" className="b3text" />
                        </p>
                        <p ref="b3t4Ref">
                            <ShinyText text="推荐" :disabled="false" :speed="3" className="b3text" />
                        </p>
                    </section>
                </div>
            </div>
        </div>

        <div class="base4" ref="base4Ref">
            <div class="b4Box" ref="b4BoxRef">
                <ul ref="b4BoxInnerRef">
                    <li class="b4-i-title">早上吃什么？</li>
                    <li class="b4-i-box">
                        <div>燕麦片</div>
                        <div>小米粥</div>
                        <div>豆浆</div>
                        <div>油条</div>
                    </li>
                    <li class="b4-i-box">
                        <div>牛油果</div>
                        <div>面包</div>
                        <div>玉米</div>
                        <div>煎蛋</div>
                    </li>
                    <li class="b4-i-title">中午吃什么？</li>
                    <li class="b4-i-box">
                        <div>叉烧饭</div>
                        <div>烧鸭饭</div>
                        <div>煲仔饭</div>
                        <div>黄焖鸡</div>
                    </li>
                    <li class="b4-i-box">
                        <div>云吞面</div>
                        <div>螺蛳粉</div>
                        <div>猪肠粉</div>
                        <div>老友粉</div>
                    </li>
                    <li class="b4-i-title">晚上吃什么？</li>
                    <li class="b4-i-box">
                        <div>一碗香</div>
                        <div>酱爆茄子</div>
                        <div>清炒西兰花</div>
                        <div>西红柿炒蛋</div>
                    </li>
                    <li class="b4-i-box">
                        <div>皮蛋瘦肉粥</div>
                        <div>生滚鱼片粥</div>
                        <div>猪润粥</div>
                        <div>海鲜炒饭</div>
                    </li>
                    <li class="b4-i-title">夜宵吃什么？</li>
                </ul>
            </div>
        </div>

        <div class="base5" ref="base5Ref">
            <div class="b5tb">
                <div ref="ytRef">夜</div>
                <div ref="xtRef">宵</div>
            </div>
            <ul ref="b5BoxRef" class="b5Box">
                <li><ShinyText text="🦪" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍔" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍰" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍖" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍕" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍱" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍨" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍡" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍇" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍝" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🦪" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍔" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍰" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍖" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍕" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍱" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍨" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍡" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍇" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍝" :disabled="false" :speed="4" className="b6text" /></li>
            </ul>
            <ul class="b5BoxText">
                <li v-for="i in 10" :key="i">
                    <ShinyText text="- 配 -" :disabled="false" :speed="3" className="b3text" />
                </li>
            </ul>
        </div>

        <div class="base6" ref="base6Ref">
            <ul ref="b6BoxRef" class="b6Box">
                <li><ShinyText text="🦪" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍔" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍰" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍖" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍕" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍱" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍨" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍡" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍇" :disabled="false" :speed="4" className="b6text" /></li>
                <li><ShinyText text="🍝" :disabled="false" :speed="4" className="b6text" /></li>
                <div ref="b6Img">
                    <img src="../viewMd/img/eat.gif" alt="">
                </div>
            </ul>
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
const b3t1Ref = ref(null);
const b3t2Ref = ref(null);
const b3t3Ref = ref(null);
const b3t4Ref = ref(null);

const base4Ref = ref(null);
const b4BoxRef = ref(null);
const b4BoxInnerRef = ref(null);

const base5Ref = ref(null);
const b5BoxRef = ref(null);
const ytRef = ref(null)
const xtRef = ref(null)

const b6Img = ref(null);
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
        
        const b3tbox = gsap.utils.toArray(".b3textbox .b13-text");
        gsap.timeline({
            scrollTrigger: {
                trigger: base3Ref.value,
                start: "top center",
                end: "+=1500",
                scrub: 1,
                anticipatePin: 1,
                pin: base3Ref.value,
                // markers: true, // 调试显示
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
            .from(b3ImgRef.value, { opacity: 0, duration: 5 }, 3)
            .to(b3t3Ref.value, { opacity: .1, duration: 3 }, 3)
            .to(b3t4Ref.value, { opacity: .1, duration: 3 }, 3)
            .to(b3t1Ref.value, { opacity: 1, x: 300, duration: 3 }, 5)
            .to(b3t2Ref.value, { opacity: 1, x: -300, duration: 3 }, 5)
            .to(b3t3Ref.value, { opacity: .5, x: -250, duration: 3 }, 5)
            .to(b3t4Ref.value, { opacity: .5, x: 250, duration: 3 }, 5)
            .to({}, { duration: 3 }, 8)

        // 效果5
        const items4 = gsap.utils.toArray(".b4Box li");
        items4.forEach((item, i) => {
            if (i === items4.length - 1) {
                gsap.from(
                    item,
                    {
                        y: 200,
                        x: 200,
                        opacity: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 100%",
                            scrub: 1,
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            } else {
                gsap.from(
                    item,
                    {
                        x: i % 2 == 0 ? 200 : -200,
                        duration: .4,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            scrub: 1,
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            }

        });

        // 效果6
        const items5 = gsap.utils.toArray(".b5Box li");
        items5.forEach((item, i) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                trigger: item,
                start: "bottom 100%",
                end: "top 0%",
                scrub: true, 
                }
            });
            tl.fromTo(
                item,
                { opacity: 0, y: 60, scale: 0, x: i % 2 !== 0 ? -50 : 50, },
                { opacity: 1, y: 0, scale: 1, x: i % 2 !== 0 ? 60 : -60, duration: 2}
            );
            tl.to(item, { opacity: 0, y: -60, x: i % 2 !== 0 ? -60 : 60, scale: 0, duration: 2 });
        });
        
        gsap.from(
            ytRef.value,
            {
                x: -200,
                duration: 2,
                opacity: 0,
                scrollTrigger: {
                    trigger: ytRef.value,
                    start: "top 80%",
                    scrub: 1
                },
            }
        );

        gsap.from(
            xtRef.value,
            {
                x: 200,
                duration: 2,
                opacity: 0,
                scrollTrigger: {
                    trigger: xtRef.value,
                    start: "top 80%",
                    scrub: 1
                },
            }
        );
        const items6 = gsap.utils.toArray(".b5BoxText li");
        items6.forEach((item, i) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                trigger: item,
                start: "bottom 100%",
                end: "top 0%",
                scrub: true, 
                }
            });
            tl.fromTo(
                item,
                { opacity: 0, y: 60, scale: 0},
                { opacity: 1, y: 0, scale: 1, duration: 2 }
            );
            tl.to(item, { opacity: 0, y: -60, scale: 0, duration: 2 });
        });

        // 效果 7
        const items7 = gsap.utils.toArray(".b6Box li");
        items7.forEach((item, i) => {
            gsap.to(
                item,
                {
                    rotate: i * - 36,
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        scrub: 1,
                        end: "+=400",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
            if (i === items7.length - 1){
                gsap.from(
                    b6Img.value,
                    {
                        scale: 0,
                        opacity: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: b6Img.value,
                            start: "top 80%",
                            scrub: 1,
                            end: "+=400",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            }
        });
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

            // overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                border-radius: 15px;
            }
            section{
                width: 100%;
                height: 100%;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                .b3text{
                    font-size: 50px;
                    line-height: 1;
                    background-color: #606060;
                }
            }
            >div {
                opacity: 0;
                width: 100%;
                height: 100%;
                border-radius: 15px;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
                background-color: #00000028;
                box-shadow: 2.34vw 2.08vw 1.3vw rgba(0, 0, 0, .11);

                &:nth-child(3) {
                    z-index: -2;
                    background-color: #5f5f5f28;
                }
            }
        }
    }
}

.base4 {
    width: 100%;
    overflow: hidden;

    .b4Box {
        width: 100%;
        margin: 0 auto;
        position: relative;

        ul {
            width: 100%;
            position: relative;
            padding-bottom: 80px;
            left: 0;
            display: flex;
            flex-direction: column;
            gap: 20px;
            top: 0;

            .b4-i-box {
                width: 100%;
                display: flex;
                gap: 20px;

                div {
                    flex-shrink: 0;
                    width: 40vw;
                    height: 400px;
                    background-color: #0000001f;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 4vw;
                    color: var(--vp-c-text-1);
                }
            }

            .b4-i-title {
                width: fit-content;
                font-size: 8vw;
                line-height: 12vw;
            }
        }
    }
}

.base5{
    width: 100%;
    padding-bottom: 200px;
    position: relative;
    .b5tb{
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100vh;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        font-size: 50vw;
        >div{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image:-webkit-linear-gradient(left,#494949,#2b2b2b,#242424); 
            -webkit-background-clip:text; 
            -webkit-text-fill-color:transparent;
            // opacity: 0;
            &:nth-child(2){
                background-image:-webkit-linear-gradient(right,#494949, #2b2b2b,#242424); 
            }
        }
        
    }
    .b5Box{
        display: grid;
        grid-template-columns: repeat(2, 150px);
        gap: 10px;
        justify-content: center;
        li{
            height: 100px;
            border-radius: 10px;
            background-color: #0000001f;
            // opacity: 0;
            transform: scale(0);
            text-align: center;
            line-height: 100px;
            font-size: 40px;
            &:nth-child(2n){
                background-color: #bcccc43a;
            }
            .b3text{
                background-color: #ffd7a92d;
            }
        }
    }
    .b5BoxText{
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        display: grid;
        grid-template-columns: repeat(1, 150px);
        gap: 10px;
        justify-content: center;
        li{
            text-align: center;
            height: 100px;
            line-height: 100px;
            .b3text{
                background-color: #606060;
            }
        }
    }
}

.base6{
    width: 100%;
    height: 100vh;
    // padding-bottom: 500px;
    .b6Box{
        max-width: 996px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        li{
            width: 100px;
            height: 200px;
            background-color: #0000001f;
            transform-origin: 50% 220%;
            border-radius: 10px;
            position: absolute;
            left: 50%;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translateX(-50%) rotateX(45deg);
            .b6text{
                font-size: 40px;
            }
        }
        >div{
            position: absolute;
            left: 51%;
            top: 430px;
            transform: translate(-50%, -50%);
            width: 150px;
            img{
                width: 100%;
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
    .top-text {
        .h1 {
            font-size: 88px !important;
        }
    }

    .b4-i-box {
        div {
            width: 60vw !important;
            height: 300px !important;
        }
    }
}

@media screen and (max-width: 768px) {
    .top-text {
        .h1 {
            font-size: 78px !important;
        }
    }

    .b4-i-box {
        div {
            height: 200px !important;
        }
    }

    .b4-i-title {
        width: fit-content;
        font-size: 12vw !important;
    }
    .b5Box{
        grid-template-columns: repeat(2, 100px) !important;
    }
    .b5BoxText{
        grid-template-columns: repeat(1, 80px) !important;
    }
    .base5{
        padding-bottom: 200px;
    }
}
.end{
    text-align: center;
    margin-bottom: 200px;
}
</style>