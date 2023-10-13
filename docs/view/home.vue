<!--这里创建一个vantajs的挂载区域-->
<template>
	<div class="video_box">
		<video v-if="!curDeviceIsMobile" src="../public/Render.mp4" muted autoplay loop></video>
		<!-- 如果是移动端，上述样式会不兼容，故降级为图片显示 -->
		<div v-else class="image-container">
			<p class="logo-text">Volcano</p>
		</div>
		<div class="btn_box">
			<a href="/web/FrontEnd/tutorial.html">
				<button data-text="Awesome" class="button">
					<span class="actual-text">&nbsp;start&nbsp;</span>
					<span class="hover-text" aria-hidden="true">&nbsp;start&nbsp;</span>
				</button>
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
import { onMounted, onBeforeUnmount, ref, watch, nextTick, onBeforeMount } from 'vue'
import { isMobile } from "../utils/mobile"
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

const curDeviceIsMobile = ref(false)
onBeforeMount(() => {
	curDeviceIsMobile.value = isMobile();
});

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

	.btn_box {
		position: absolute;
		top: 80%;
		left: 50%;
		transform: translate(-50%, -50%);

		.button {
			margin: 0;
			height: auto;
			background: transparent;
			padding: 0;
			border: none;

		}

		/* button styling */
		.button {
			--border-right: 6px;
			--text-stroke-color: rgba(255, 255, 255, 0.6);
			--animation-color: #5bbdff;
			--fs-size: 2em;
			letter-spacing: 3px;
			text-decoration: none;
			font-size: var(--fs-size);
			font-family: "Arial";
			position: relative;
			text-transform: uppercase;
			color: transparent;
			-webkit-text-stroke: 1px var(--text-stroke-color);
		}

		/* this is the text, when you hover on button */
		.hover-text {
			position: absolute;
			box-sizing: border-box;
			content: attr(data-text);
			color: var(--animation-color);
			width: 0%;
			inset: 0;
			border-right: var(--border-right) solid var(--animation-color);
			overflow: hidden;
			transition: 0.5s;
			-webkit-text-stroke: 1px var(--animation-color);
		}

		/* hover */
		.button:hover .hover-text {
			width: 100%;
			filter: drop-shadow(0 0 23px var(--animation-color))
		}
	}
}

.image-container {
	text-align: center;
	font-size: 48px;
	margin-top: 40%;
	color: #74340d;
}

.card_box {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.about {
	width: 80%;
	margin: 40px auto;

	.about_title {
		font-size: 36px;
		font-weight: bold;
		margin-bottom: 50px;
	}
}
</style>

