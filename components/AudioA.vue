<template>
  <div id="app-cover" v-if="songur" ref="player">
    <div id="player">
      <div id="player-track" ref="playerTrack" :class="{ active: isPlaying }">
        <div id="album-name" ref="albumName">{{ songuser?.name }}</div>
        <div id="track-name" ref="trackName">{{ songuser?.artistsName }}</div>
        <div id="track-time" ref="trackTime">
          <div id="current-time">{{ tProgress }}</div>
          <div id="track-length">{{ tTime }}</div>
        </div>
        <div id="s-area" ref="sArea" @click="setProgress">
          <div id="ins-time" ref="insTime" ></div>
          <div id="s-hover" ref="sHover"></div>
          <div id="seek-bar" ref="seekBar" :style="{ width: seekBarW }"></div>
        </div>
      </div>
      <div id="player-content">
        <div id="album-art" ref="albumArt" :class="{ active: isPlaying }">
          <img :src="data?.artists[0].img1v1Url" class="active" id="_1" />
          <div id="buffer-box">Buffering ...</div>
        </div>
        <div id="player-controls">
          <div class="control">
            <div class="button" id="play-previous" @click="$emit('gat', true)">
              <img src="../static/sy.png" alt="" />
            </div>
          </div>
          <div class="control">
            <div class="button" id="play-pause-button" @click="playPause">
              <img :src="isPlaying ? zt : bf" />
            </div>
          </div>
          <div class="control">
            <div class="button" id="play-next" @click="$emit('gat', false)">
              <img src="../static/xy.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      autoplay
      @timeupdate="updateProgress"
      @ended="$emit('ended')"
      :src="songur"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import bf from "../static/bf.png";
import zt from "../static/zt.png";
import { defineExpose, ref } from "vue";
defineProps({
  songur: String,
  data: Object,
  songuser: Object,
});
defineEmits(["gat", "ended"]);
const isPlaying = ref<boolean>(true);
const seekBarW = ref<string>("0%");
const audioRef = ref(); // 音频标签对象
const seekBar = ref();
const sArea = ref();
const player = ref();
const tProgress = ref<string>("00:00");
const tTime = ref<string>("00:00");
const playPause = async () => {
  setTimeout(() => {
    isPlaying.value = !isPlaying.value;
    if (audioRef.value.paused) {
      audioRef.value.play();
    } else {
      audioRef.value.pause();
    }
  }, 300);
};
const updateProgress = (event: any) => {
  // 对象解构操作
  const { duration, currentTime } = event.target;
  // event.target = {
  //     duration: 225,  // 当前音频时间长度
  //     currentTime:0  // 当前播放时间
  // }
  // 处理时间
  let curMinutes = Math.floor(currentTime / 60);
  let curSeconds = Math.floor(currentTime - curMinutes * 60);
  let zcdMinutes = Math.floor(duration / 60);
  let zcdSeconds = Math.floor(duration - zcdMinutes * 60);
  //因为结束的时候duration会为NaN  判断一下啦  不然页面显示NaN不雅观啦~
  if (!isNaN(duration)) {
    // 播放时间
    tProgress.value =(curMinutes < 10 ? "0" + curMinutes : curMinutes) +":" +(curSeconds < 10 ? "0" + curSeconds : curSeconds);
    // 总时长
    tTime.value =(zcdMinutes < 10 ? "0" + zcdMinutes : zcdMinutes) +":" +(zcdSeconds < 10 ? "0" + zcdSeconds : zcdSeconds);
  } else {
    tProgress.value = "00:00";
    tTime.value = "00:00";
  }

  const progressPercent = (currentTime / duration) * 100;
  // 进度条
  seekBarW.value = `${progressPercent}%`;
};
const setProgress = (event: any) => {
  // progressContainer代理视图宽度
  const width = sArea.value.clientWidth;
  // 鼠标点击时处于progressContainer里的水平偏移量
  const clickX = event.offsetX;
  // audio.duration: 音频长度
  const duration = audioRef.value.duration;
  // audio.currentTime: 音频播放位置
  audioRef.value.currentTime = (clickX / width) * duration;
};
defineExpose({
  isPlaying,
});
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#app-cover {
  position: fixed;
  width: 430px;
  height: 100px;
  bottom: 10%;
  right: 20px;
  z-index: 1111;
}
.hied {
  height: 0px;
}
@media screen and (max-width: 1000px) {
  #app-cover {
    width: 100%;
    bottom: 0%;
    right: 0;
  }
}

#player {
  position: relative;
  height: 100%;
  z-index: 3;
}

#player-track {
  height: 100%;
  position: absolute;
  top: 0;
  right: 15px;
  left: 15px;
  padding: 13px 22px 10px 184px;
  background-color: #e8f5ff;
  border-radius: 15px 15px 0 0;
  transition: 0.3s ease top;
  z-index: 1;
}

#player-track.active {
  top: -100px;
}

#album-name {
  color: #54576f;
  font-size: 17px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#track-name {
  color: #acaebd;
  font-size: 13px;
  margin: 2px 0 6px 0;
}

#track-time {
  height: 19px;
  margin-bottom: 3px;
  overflow: hidden;
}

#current-time {
  float: left;
}

#track-length {
  float: right;
}

#current-time,
#track-length {
  color: #767676;
  font-size: 11px;
  border-radius: 10px;
  transition: 0.3s ease all;
}

#track-time.active #current-time,
#track-time.active #track-length {
  color: #f86d92;
  background-color: transparent;
}

#s-area,
#seek-bar {
  position: relative;
  height: 4px;
  border-radius: 4px;
}

#s-area {
  background-color: #9dd4ff;
  cursor: pointer;
}

#ins-time {
  position: absolute;
  top: -29px;
  color: #fff;
  font-size: 12px;
  white-space: pre;
  padding: 5px 6px;
  border-radius: 4px;
  display: none;
}

#s-hover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: 0.2;
  z-index: 1111;
}

#ins-time,
#s-hover {
  background-color: #0019f8;
}

#seek-bar {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  background-color: #58aad5;
  transition: 0.2s ease width;
  z-index: 1;
}

#player-content {
  position: relative;
  height: 100%;
  background-color: #fff;
  box-shadow: 1px 3px 11px #a0dbff82;
  border-radius: 15px;
  z-index: 2;
}

#album-art {
  position: absolute;
  top: -40px;
  width: 115px;
  height: 115px;
  margin-left: 40px;
  transform: rotateZ(0);
  transition: 0.3s ease all;
  box-shadow: 0 0 0 10px #fff;
  border-radius: 50%;
  overflow: hidden;
}

#album-art.active {
  top: -60px;
  box-shadow: 0 0 0 4px #fff7f7, 0 30px 50px -15px #afb7c1;
}

#album-art:before {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  width: 20px;
  height: 20px;
  margin: -10px auto 0 auto;
  background-color: #d6dee7;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px #fff;
  z-index: 2;
}

#album-art img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
}

#album-art img.active {
  opacity: 1;
  z-index: 1;
}

#album-art.active img.active {
  z-index: 1;
  animation: rotateAlbumArt 3s linear 0s infinite forwards;
}

@keyframes rotateAlbumArt {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

#buffer-box {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  height: 13px;
  color: #1f1f1f;
  font-size: 13px;
  font-family: Helvetica;
  text-align: center;
  font-weight: bold;
  line-height: 1;
  padding: 6px;
  margin: -12px auto 0 auto;
  background-color: rgba(255, 255, 255, 0.19);
  opacity: 0;
  z-index: 2;
}

#album-art img,
#buffer-box {
  transition: 0.1s linear all;
}

#album-art.buffering img {
  opacity: 0.25;
}

#album-art.buffering img.active {
  opacity: 0.8;
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

#album-art.buffering #buffer-box {
  opacity: 1;
}

#player-controls {
  width: 250px;
  height: 100%;
  margin: 0 5px 0 141px;
  float: right;
  overflow: hidden;
}

.control {
  width: 33.333%;
  float: left;
  padding: 12px 0;
}

.button {
  /* width: 28px;
  height: 28px; */
  padding: 25px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button img {
  width: 28px;
  height: 28px;
  max-width: none;
}

.button:hover {
  background-color: #f3f3f3;
}
</style>