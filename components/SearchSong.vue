<template>
  <div class="box">
    <div class="flex flex-wrap">
      <div class="m-4">
        <!-- <p>搜索歌曲</p> -->
        <el-select
          v-model="value"
          filterable
          remote
          default-first-option
          reserve-keyword
          suffix-icon="Search"
          placeholder="搜索歌曲"
          ref="select"
          :clearable="showClose"
          @hook:mounted="cancalReadOnly"
          
          @visible-change="cancalReadOnly"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="songChange"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
    </div>
    <!-- <el-button type="primary" @click="toggleDark">{{ isDark?'dark':'light' }}</el-button> -->
    <el-table
      :data="songData"
      style="width: 100%; height: 60vh;"
      v-loading="searchLoading"
      v-if="songData.length > 0 || searchLoading"
    >
      <el-table-column fixed prop="name" label="歌曲" width="120" />
      <el-table-column prop="songName" label="歌手" width="120" />
      <el-table-column label="头像" width="120" >
        <template #default="scope">
            <el-avatar :size="50" :src="scope.row.artists[0].img1v1Url"  />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            :loading="scope.row.loading"
            :key="scope.row.id"
            @click.prevent="playM(scope.$index, scope.row)"
          >
            播放
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, nextTick,computed,watch } from "vue";
import { search, suggest, songUrl,lyric } from "../docs/api/search";
import { useStore } from "vuex"
const {state,commit}  = useStore()
const options = ref<any[]>([]);
const songData = ref<any[]>([]);
const value = ref<string>();
const showClose = ref<boolean>(false);
const searchLoading = ref<boolean>(false);
const select = ref();
const loading = ref(false);
onBeforeUnmount(()=>{
  let lrc: any = document.getElementsByClassName("aplayer-lrc")[0];
  lrc.style.bottom = "28px";
  lrc.style.left = "30px";
  lrc.style.right = "auto";
})
// 配合watch监听播放索引的变化
const getAudioShow = computed(() => {
  return state.audioShow;
});
watch(getAudioShow,(newVal, oldVal) => {
    if(newVal){
      let lrc: any = document.getElementsByClassName("aplayer-lrc")[0];
      if(window.location.href.indexOf('music.html')>=0){
          lrc.style.bottom = "110px";
          lrc.style.left = "0";
          lrc.style.right = "0";
      }
    }
},{ immediate: true, deep: true });
const playM = async (query: number, row: any) => {
  row.loading = true;
  //判断列表中是否存在 如果存在直接播放
  for(let i = 0;i<state.audiolist.length;i++){
    if(state.audiolist[i].id == songData.value[query].id){
      commit('setPlayIndex',i)
      row.loading = false;
      return
    }
  }
  //请求歌曲的播放链接和歌词
  const { data } = await songUrl({ id: songData.value[query].id });
  const {lrc} = await lyric({ id: songData.value[query].id });
  row.loading = false;
  let tempdata = {
    id:songData.value[query].id,
    name:songData.value[query].name,
    artist:songData.value[query].songName,
    url:data[0].url,
    cover:songData.value[query].artists[0].img1v1Url,
    lrc:lrc.lyric,
  };
  //赋值给vuex中的对象
  commit('setAudiolist',[tempdata,...state.audiolist])
};
const cancalReadOnly = (onOff: any) => {
  if (onOff) {
    // 打开下拉框 显示可清空按钮
    showClose.value = true;
  }
  nextTick(() => {
    if (!onOff) {
      const input = select.value.$el.querySelector(".el-input__inner");
      input.removeAttribute("readonly");
      // this.$refs.select.blur();  根据tip自行判断是否添加
    }
  });
};
//搜索框值改变时搜索歌曲
const songChange = async (query: string) => {
  if(query=="") return
  searchLoading.value = true;
  const data: any = await search({ keywords: query});
  songData.value = []
  data.result?.songs.map((item: any) => {
    item.songName = item.artists[0].name;
  });
  searchLoading.value = false;
  songData.value = data.result.songs;
};
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true;
    const data: any = await suggest({ keywords: query, limit: 10 });
    loading.value = false;
    // 需要添加一条输入的值数据
    let toData = { id: 1, name: query };
    if (data.result.songs) {
      data.result.songs.unshift(toData);
    } else {
      data.result.songs = [toData];
    }
    options.value = data.result.songs;
  } else {
    options.value = [];
  }
};
</script>
<style scoped lang="less">
.box {
  width: 80%;
  margin: 50px auto;
  font-size: 14px;
  color: #409eff;
  // border: 1px solid #409eff;
  box-shadow: 1px 1px 10px #f7f7f757;
  padding: 20px;
  border-radius: 10px;
  :deep(.el-table__body),:deep(.el-table__header){
    width: 100% !important;
  }
  :deep(.el-select){
    margin: 0 auto;
  }
  .m-4 {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto;
    align-items: center;
    p {
      margin-right: 20px;
    }
  }
}
@media screen and (max-width: 1000px) {
  .box {
    width: 100%;
    border: none;
  }
}
</style>