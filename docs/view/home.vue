<template>
	<div class="box">
		<div class="vanta-box">
			<div class="vanta-text" :style="{ color: textColor }">
				<div class="loxbe-container">
					<Loxbe width="45" height="45" bgColor="#60b790" color="#203B83"/>
					<ShinyText text="Volcnao" :disabled="false" :speed="3" className="t1"/>
				</div>
				<ShinyText text="欢迎来到我的博客！" :disabled="false" :speed="2.5" className="t2"/>
				<div class="btn" @click="start">
					<ShinyText text="开始" :disabled="false" :speed="3" className="btn-text"/>
				</div>
			</div>
			<div class="vanta-icon" :style="{ color: textColor }">
				<img  @click="handleAn" ref="logoRef" src="/logo.gif" alt="">
				<span>不要点我噢 我在锻炼！！</span>
			</div>
		</div>
		<div class="title">
			<p>日常记</p>
			<span>按住拖动切换笔记</span>
		</div>
		<div class="vanta-menu">
			<InfiniteMenu :items="items"/>
			<span></span>
		</div>
		<!-- <div class="title" style="margin-top: 80px;">
			<p>🎮 击剑大乱斗</p>
			<span>拖拽任意玩家来场有趣的碰撞吧~</span>
		</div>
		<div class="falling-text">
			<FallingText
			:text="`🤺 🤺 🤺 🤺 🤺 🤺`"
			:highlightWords="['🤺']"
			highlightClass="highlighted"
			trigger="hover"
			backgroundColor="transparent"
			:wireframes="false"
			:gravity="0.35"
			:restitution="0.95"
			:friction="0.03"
			:frictionAir="0.02"
			fontSize="6.4rem"
			:mouseConstraintStiffness="0.45"
			/>
		</div> -->
	</div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { animateCSS } from "../utils/index"
import { useRouter } from 'vitepress';
import { useData } from 'vitepress'
const { site } = useData();
const logoRef = ref()
const router = useRouter();
const items = site.value.themeConfig.sidebar['/notes/'][0].items.slice(0 , 5)
const textColor = ref('#fff')

const animateList = ['rubberBand','jello','wobble','tada','swing','headShake','shakeY','shakeX','pulse','flash','bounce','hinge', 'zoomOutUp']
const animateIndex = ref(0)
const animateLoading = ref(false)
const handleAn = () => {
	if (animateLoading.value) return
	nextTick(async ()=>{
		animateLoading.value = true
		await animateCSS(logoRef.value, animateList[animateIndex.value])
		animateIndex.value++
		if (animateIndex.value >= animateList.length) animateIndex.value = 0
		animateLoading.value = false
	})
}
const start = () => {
	router.go('/web/FrontEnd/tutorial')
}
</script>
<style lang="less" scoped>
.box {
	width: 100%;
	.vanta-box{
		max-width: 1152px;
		padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
		margin: 20px auto;
		display: flex;
		box-sizing: content-box;
		justify-content: space-between;
		align-items: flex-end;
		.vanta-text{
			min-width: 560px;
			display: flex;
			flex-direction: column;
		}
		.loxbe-container{
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}
}
.title{
	max-width: 1150px;
	margin: 0 auto;
	font-size: 28px;
	color: var(--vp-c-text-1);
	padding: 0 60px;
	box-sizing: content-box;
	span{
		display: block;
		color: #999;
		font-size: 14px;
		margin-top: 10px;
	}
}
.falling-text{
	max-width: 1150px;
	height: 400px;
	margin: 20px auto;
}
.vanta-menu{
	max-width: 1150px;
	margin: 0 auto;
	position: relative;
	height: 600px;
	margin-bottom: 20px;
	&::after{
		content: "";
		width: 120px;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: linear-gradient(to right, var(--vp-c-bg) 10%, #eeeeee00);
		pointer-events: none;
		z-index: 11;
	}
	&::before{
		content: "";
		width: 120px;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		background: linear-gradient(to left, var(--vp-c-bg) 10%, #eeeeee00);
		pointer-events: none;
		z-index: 11;
	}
	span{
		&::after{
			content: "";
			width: 100%;
			height: 80px;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(to bottom, var(--vp-c-bg), #eeeeee00);
			pointer-events: none;
			z-index: 11;
		}
		&::before{
			content: "";
			width: 100%;
			height: 80px;
			position: absolute;
			right: 0;
			bottom: 0;
			background: linear-gradient(to top, var(--vp-c-bg) 10%, #eeeeee00);
			pointer-events: none;
			z-index: 11;
		}
	}
}
.t1{
	font-size: 60px;
	line-height: 1;
	font-weight: bold;
	background-color: var(--vp-c-brand);
}
.t2{
	font-size: 26px;
	line-height: 1.2;
	font-weight: bold;
	background-color: var(--vp-c-text-1);
	margin-top: 10px;
	text-wrap: nowrap;
}
.btn{
	font-size: 16px;
	cursor: pointer;
    background-color: #d0eeea;
    border-radius: 50px;
    padding: 10px 40px;
	width: fit-content;
	margin-top: 40px;
	&:hover{
		background-color: var(--vp-c-brand);
		.btn-text{
			background-color: #fff;
		}
	}
	.btn-text{
		background-color: #333;
	}
}
.vanta-icon{
	width: 560px;
	height: 210px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	span{
		color: #999;
		font-size: 12px;
	}
	img{
		width: 330px;
		margin-top: -80px;
		cursor: pointer;
	}
}
@media screen and (max-width: 1150px) {
	.vanta-menu{
		max-width: 685px;
		height: 70vh;
	}
}
@media screen and (max-width: 968px) {
	.title{
		text-align: center;
	}
	.vanta-menu{
		&::after{
			opacity: 0;
		}
		&::before{
			opacity: 0;
		}
		span{
			opacity: 0;
		}
	}
	.vanta-box{
		flex-direction: column-reverse;
		gap: 20px;
		.vanta-text{
			min-width: 0 !important;
			width: 100%;
			margin-bottom: 20px;
			align-items: center;
		}
		.vanta-icon{
			width: 100%;
			img{
				width: 300px;
			}
		}
	}
}
@media screen and (max-width: 768px) {
	.vanta-box{
		.vanta-text{
			width: 100%;
			.t1{
				font-size: 38px;
			}
			.t2{
				font-size: 28px;
			}
		}
		.vanta-icon{
			height: 50px;
			img{
				width: 150px;
				margin-bottom: 0;
			}
		}
	}
}
</style>

