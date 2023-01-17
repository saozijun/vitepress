<script  lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import "aplayer/dist/APlayer.min.css";
import { onMounted, ref, nextTick, watch, computed } from "vue";
import { playlist, songUrl, lyric } from "../docs/api/search";
import APlayer from "aplayer";
import { useStore } from "vuex";
const { state, commit } = useStore();
const { Layout } = DefaultTheme;
const aplayer = ref();
const ap = ref<any>();
const ishsow = ref<boolean>(false);
const audioList = ref<any>([]);
// 配合watch监听播放列表audiolist的变化
const getShowTask = computed(() => {
  return state.audiolist;
});
watch(getShowTask,(newVal, oldVal) => {
    // 播放新加入列表的
    oldVal = oldVal?oldVal:[]
    nextTick(() => {
      if (ap.value && newVal.length!=oldVal.length) {
        audioList.value = newVal;
        ap.value.pause();
        ap.value.list.clear();
        ap.value.list.add([...audioList.value]);
        ap.value.list.switch(0);
        ap.value.play();
      }
    });
},{ immediate: true, deep: true });

// 配合watch监听播放索引的变化
const getShowIdnex = computed(() => {
  return state.palyIndex;
});
watch(getShowIdnex,(newVal, oldVal) => {
    // 索引改变 就播放新的索引歌曲
    if (ap.value) {
      nextTick(() => {
        ap.value.pause();
        ap.value.list.switch(newVal);
        ap.value.play();
      });
    }
},{ immediate: true, deep: true });
//根据id合并两个对象数组
const combined = (arr1: any, arr2: any) => {
  return arr1.map((item: any) => {
    const data = arr2.find((i: any) => item.id == i.id);
    return {
      ...item,
      url: data ? data.url : "",
    };
  });
};
//页面加载时
onMounted(async () => {
  audioList.value = [];
  // 获取我的喜欢歌曲列表
  const { playlist: data } = await playlist();
  let id = ""; //设置初始id
  let tempList = []; //初始化音乐url列表
  //循环把id 相加 用来下一次请求
  for (let i = 0; i < data.tracks.length; i++) {
    id += data.tracks[i].id + (data.tracks.length != i + 1 ? "," : "");
    tempList[i] = {
      id: data.tracks[i].id,
      name: data.tracks[i].name,
      artist: data.tracks[i].ar[0].name,
      url: "",
      cover: data.tracks[i].al.picUrl,
      lrc: "",
    };
  }
  const { lrc } = await lyric({ id: data.tracks[0].id });
  //获取全部音乐的url

  let { data: musicList } = await songUrl({ id });
  tempList[0].lrc = lrc.lyric;
  //音乐数据列表赋值
  audioList.value = combined(tempList, musicList);
  commit("setAudiolist", combined(tempList, musicList));
  //实例化 APlayer
  ap.value = new APlayer({
    container: aplayer.value,
    audio: audioList.value,
    fixed: true,
    autoplay: true,
    lrcType: 2,
    theme: "#47ba86",
  });
  //等dom加载完成监听按钮事件
  nextTick(() => {
    commit("setaudioShow", true);
    document.getElementsByClassName("aplayer-miniswitcher")[0].addEventListener("click", aplayerBtn);
     // 获取音乐组件内容
     let ele: any = document.getElementsByClassName("aplayer-body")[0];
     //如果页面可视宽度小于1000 并且为音乐组件内容隐藏时
     ele.style.left = document.body.clientWidth < 1000 && !ishsow.value ? "-66px" : "0";
    //  let lrc: any = document.getElementsByClassName("aplayer-lrc")[0];
    //  if(window.location.href.indexOf('music.html')>=0 && document.body.clientWidth < 1000 ){
    //     lrc.style.bottom = "110px";
    //     lrc.style.left = "0";
    //     lrc.style.right = "0";
    //  }
  });
  ap.value.on("canplay", () => {
    //当文件就绪可以开始播放时触发（缓冲已足够开始时）
    listBtn(); //获取歌曲的歌词事件
  });
  commit("setAP", ap);
});
//根据当前歌曲获取歌词赋值
const listBtn = async () => {
  ap.value.pause();
  for (let i = 0; i < audioList.value.length; i++) {
    if (audioList.value[i].url === ap.value.audio.src) {
      if (audioList.value[i].lrc === "") {
        const { lrc } = await lyric({ id: audioList.value[i].id });
        audioList.value[i].lrc = lrc.lyric;
        ap.value.list.clear();
        ap.value.list.add([...audioList.value]);
        ap.value.list.switch(i);
        ap.value.play();
        return;
      }
    }
    if (i + 1 == audioList.value.length) ap.value.play();
  }
};
const aplayerBtn = (e: any) => {
  // 获取音乐组件内容的宽度
  let w = document.getElementsByClassName("aplayer-info")[0].clientWidth;
  // 获取整个音乐组件
  let ele: any = document.getElementsByClassName("aplayer-body")[0];
  ishsow.value = !ishsow.value; //音乐组件内容是否为可视状态
  if (document.body.clientWidth > 1000) return; //如果页面可视宽度小于1000  直接返回
  ele.style.left = w < 334 ? "0px" : "-66px";
};
window.addEventListener("resize", function () {
  nextTick(() => {
    // 获取音乐组件内容
    let ele: any = document.getElementsByClassName("aplayer-body")[0];
    //如果页面可视宽度小于1000 并且为音乐组件内容隐藏时
    ele.style.left = document.body.clientWidth < 1000 && !ishsow.value ? "-66px" : "0";
  });
});

</script>

<template>
  <Layout>
    <template #layout-bottom>
      <div ref="aplayer" id="aplayer"></div>
    </template>
  </Layout>
</template>
<style lang="less" scoped >
:deep(.aplayer.aplayer-fixed .aplayer-body) {
  bottom: 100px;
  left: 0;
  overflow: hidden;
}
:deep(.aplayer.aplayer-fixed) {
  bottom: 100px;
}

:deep(.aplayer.aplayer-fixed .aplayer-info) {
  border-bottom:1px solid #e9e9e9;
}
:deep(.aplayer.aplayer-fixed .aplayer-lrc) {
  bottom: 28px;
  left: 30px;
  right: auto;
}
:deep(.aplayer .aplayer-lrc p) {
  color: #47ba86;
}
@media screen and (max-width: 1000px) {
  :deep(.aplayer.aplayer-fixed .aplayer-body) {
    bottom: 10px;
  }
  :deep(.aplayer.aplayer-fixed) {
    bottom: 10px;
  }
}
</style>