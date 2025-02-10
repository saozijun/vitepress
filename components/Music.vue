<script  lang="ts" setup>
import "aplayer/dist/APlayer.min.css";
import { onMounted, ref, nextTick, watch, computed, h } from "vue";
import { playlist, songUrl, lyric } from "../docs/api/search";
import { useStore } from "vuex";
import { inBrowser } from 'vitepress'
const { state, commit } = useStore();
const aplayer = ref();
const ap = ref<any>();
const ishsow = ref<boolean>(false);
const audioList = ref<any>([]);
const isFirstLoad = ref(true); // 新增标志位
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
  try {
    let APlayer = null
    if (inBrowser) {
      let aplayerTemp = await import('aplayer')
      APlayer = aplayerTemp.default
    }
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
    if (audioList.value[0].url == '') return 
    //实例化 APlayer
    ap.value = new APlayer({
      container: aplayer.value,
      audio: audioList.value,
      fixed: true,
      autoplay: false, // 设置为 false
      lrcType: 2,
      theme: "#47ba86",
    });
    //等dom加载完成监听按钮事件
    nextTick(() => {
      document.getElementsByClassName("aplayer-miniswitcher")[0].addEventListener("click", aplayerBtn);
      // 获取音乐组件内容
      let ele: any = document.getElementsByClassName("aplayer-body")[0];
      //如果页面可视宽度小于1000 并且为音乐组件内容隐藏时
      ele.style.left = document.body.clientWidth < 1000 && !ishsow.value ? "-66px" : "0";
    });
    ap.value.on("canplay", () => {
      //当文件就绪可以开始播放时触发（缓冲已足够开始时）
      listBtn(); //获取歌曲的歌词
    });
    ap.value.on("error", (e: any) => {
      // getList()
    });
    isFirstLoad.value = false;
  } catch (error: any) {
    let { response } = error
  }
});

//根据当前歌曲获取歌词赋值
const listBtn = async () => {
  // ap.value.pause();
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
  }
};

const aplayerBtn = (e: any) => {
  // 获取整个音乐组件
  let ele: any = document.getElementsByClassName("aplayer-body")[0];
  ishsow.value = !ishsow.value; //音乐组件内容是否为可视状态
  if (document.body.clientWidth > 1000) return; //如果页面可视宽度小于1000  直接返回
  ele.style.left = ishsow.value ? "0px" : "-66px";
};
window.addEventListener("resize", function () {
  nextTick(() => {
    // 获取音乐组件内容
    let ele: any = document.getElementsByClassName("aplayer-body")[0];
    //如果页面可视宽度小于1000 并且为音乐组件内容隐藏时
    try{
      ele.style.left = document.body.clientWidth < 1000 && !ishsow.value ? "-66px" : "0";
    }catch{}
  });
});

</script>

<template>
  <div class="box">
    <div ref="aplayer" id="aplayer"></div>
  </div>
</template>
<style lang="less" scoped>
:deep(.aplayer.aplayer-fixed .aplayer-body) {
  bottom: 100px;
  left: 0;
  background: #fff0;
  overflow: hidden;
}

:deep(.aplayer .aplayer-list ol li) {
  background-color: var(--vp-c-bg);
  &:hover {
    background-color: var(--vp-c-bg);
    color: #47ba86;
  }
}

:deep(.aplayer .aplayer-list ol li.aplayer-list-light) {
  background-color: var(--vp-c-bg);
  color: #47ba86;
}

:deep(.aplayer) {
  background: none;
}

:deep(.aplayer.aplayer-fixed .aplayer-list) {
  position: relative;
  bottom: 100px;
  border: none;
}

:deep(.aplayer.aplayer-fixed .aplayer-info) {
  border-bottom: 1px solid var(--vp-c-bg-mute);
  border-top: 1px solid var(--vp-c-bg-mute);
}

:deep(.aplayer .aplayer-miniswitcher){
  background: var(--vp-c-bg-mute);
}

:deep(.aplayer.aplayer-fixed .aplayer-lrc) {
  bottom: 28px;
  left: 30px;
  right: auto;
  text-shadow: none;
}

:deep(.aplayer .aplayer-lrc p) {
  color: #47ba86;
}

@media screen and (max-width: 1000px) {
  :deep(.aplayer.aplayer-fixed .aplayer-body) {
    bottom: 20px;
  }

  :deep(.aplayer.aplayer-fixed .aplayer-info) {
    background-color: var(--vp-c-bg);
  }

  // :deep(.aplayer .aplayer-info .aplayer-music .aplayer-title) {
  //   color: #000;
  // }

  // :deep(.aplayer .aplayer-list ol li) {
  //   background-color: #0d0d0d7b;
  // }

  :deep(.aplayer .aplayer-list ol li) {
    &:hover {
      background: #ffffff91;
      color: #47ba86;
    }
  }
  :deep(.aplayer .aplayer-miniswitcher .aplayer-icon path){
    fill: var(--vp-c-text-1) !important;
  }

  // :deep(.aplayer .aplayer-list ol li.aplayer-list-light) {
  //   background: #fff;
  //   color: #47ba86;
  // }

  :deep(.aplayer.aplayer-fixed .aplayer-list) {
    bottom: 10px;
  }

  :deep(.aplayer.aplayer-fixed) {
    bottom: 10px;
  }

  :deep(.aplayer.aplayer-fixed .aplayer-lrc) {
    text-shadow: -1px -1px 0 #fff;
  }
}
</style>