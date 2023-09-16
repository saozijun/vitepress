<!--
 * @Description: 
 * @Version: 2.0
 * @Author: volcano
 * @Date: 2023-09-15 23:41:21
 * @LastEditors: volcano
 * @LastEditTime: 2023-09-16 11:58:16
-->
<!--这里创建一个vantajs的挂载区域-->
<template>
	<div class="vanta_area" ref="Area">
		<div class="svg-wrapper">
			<svg height="60" width="190" xmlns="http://www.w3.org/2000/svg">
				<rect class="shape" height="60" width="190"></rect>
			</svg>
			<!-- <div class="text" :style="{color:textColor}">Start</div> -->
			<a class="text" href="/web/FrontEnd/tutorial">
				Start
			</a>
		</div>
	</div>
</template>
<script setup>
//导入vanta.js和three.js，以及ref等hooks
import * as THREE from 'three'
import GLOBE from 'vanta/src/vanta.globe'
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
const textColor = ref('#fff')
//监听html的class属性，当class属性发生变化时，更新vantaEffect

//使用ref引用挂载区域
const Area = ref(null)
//创建一个全局的变量来使用vanta.js
/**
  *因为在vue2中，是使用this.vantaEffect来创建指定的3d动画模板的
  *但是vue3 setup中是没有this，所以要另外创建一个
**/
let vantaEffect = null;
//在两个生命周期钩子内创建vantaEffect
onMounted(() => {
	const htmlClass = ref(document.querySelector('html').getAttribute('class'))
	let temp = {
		backgroundColor: htmlClass.value === 'dark' ? 0x222222 : 0xffffff,
	}
	vantaEffect = GLOBE({
		el: Area.value,
		THREE: THREE,
		mouseControls: true,
		touchControls: true,
		gyroControls: false,
		minHeight: 200.00,
		minWidth: 200.00,
		scale: 1.00,
		scaleMobile: 1.00,
		size: 0.8,
		color: 0xbfdced,
		color2: 0xffe4e4,
		backgroundColor: htmlClass.value === 'dark' ? 0x222222 : 0xffffff
	})
	textColor.value = htmlClass.value === 'dark' ? '#fff' : '#03a9f4c7'
	//监听主题按钮的事件变化
	nextTick(() => {
		document.getElementsByClassName('VPSwitchAppearance')[0].addEventListener('click', () => {
			const htmlClass = ref(document.querySelector('html').getAttribute('class'))
			if (htmlClass.value === 'dark') {
				vantaEffect.setOptions({
					backgroundColor: 0x222222
				})
				textColor.value = '#fff'
			} else {
				vantaEffect.setOptions({
					backgroundColor: 0xffffff
				})
				textColor.value = '#03a9f4c7'
			}
		})
	})
})
const toStart = () => {
	window.location.href = '/web/FrontEnd/tutorial'
}
onBeforeUnmount(() => {
	if (vantaEffect) {
		vantaEffect.destroy()
	}
})
</script>
<style lang="less" scoped>
.vanta_area {
	width: 100%;
	height: 100vh;
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
}

.shape {
	stroke-dasharray: 100 300;
	stroke-dashoffset: -297;
	fill: transparent;
	stroke: #c7e5f7;
	stroke-width: 5px;
	transition: stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s;
}

.text {
	display: block;
	font-size: 22px;
	top: -52px;
	position: relative;
	font-weight: 600;
	//   color: white;
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

