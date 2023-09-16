<!--这里创建一个vantajs的挂载区域-->
<template>
	<div class="video_box">
		<video src="../public/Render.mp4" muted autoplay loop></video>
		<div class="svg-wrapper">
			<svg height="60" width="190" xmlns="http://www.w3.org/2000/svg">
				<rect class="shape" height="60" width="190"></rect>
			</svg>
			<a class="text" href="/web/FrontEnd/tutorial">
				Start
			</a>
		</div>
	</div>
	<div class="about">
		<div class="about_title">📕 笔记</div>
		<div class="card_box">
			<Crad title="vitepress部署 📦" text="📦 VitePress部署 遇到的问题 和 解决方案📦" link="/vite/vitepress"></Crad>
		</div>
	</div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
const textColor = ref('#fff')
onMounted(() => {
	//监听主题按钮的事件变化
	nextTick(() => {
		document.getElementsByClassName('VPSwitchAppearance')[0].addEventListener('click', () => {
			const htmlClass = ref(document.querySelector('html').getAttribute('class'))
			if (htmlClass.value === 'dark') {
				textColor.value = '#fff'
			} else {
				textColor.value = '#03a9f4c7'
			}
		})
	})
})
</script>
<style lang="less" scoped>
.video_box {
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	mix-blend-mode: difference;
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -1;
	}
	.svg-wrapper {
		position: absolute;
		width: 190px;
		height: 60px;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		transform: translate(-50%, -50%);
		left: 50%;
		bottom: 20%;
		z-index: 9999;
		.text {
			display: block;
			font-size: 22px;
			top: -52px;
			position: relative;
			font-weight: 600;
			//   color: white;
		}
		.shape {
			stroke-dasharray: 100 300;
			stroke-dashoffset: -297;
			fill: transparent;
			stroke: #c7e5f7;
			stroke-width: 5px;
			transition: stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s;
		}
	}
}
.card_box{
	display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.about{
	width: 80%;
	margin: 40px auto;
	.about_title{
		font-size: 36px;
		font-weight: bold;
		margin-bottom: 50px;
	}
}
.svg-wrapper:hover .shape {
	stroke-width: 2px;
	stroke-dashoffset: 0;
	stroke-dasharray: 760;
}

.svg-wrapper:hover {
	background-color: #6dc7ff61;
	transition: 1s;
}
</style>

