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
      v-loading="searchLoading"
      v-if="songData.length > 0 || searchLoading"
    >
      <el-table-column fixed prop="name" label="歌曲" width="120" />
      <el-table-column prop="songName" label="歌手" width="120" />
      <!-- <el-table-column label="头像" width="120" >
        <template #default="scope">
            <el-avatar :size="50" :src="scope.row.artists[0].img1v1Url"  />
        </template>
      </el-table-column> -->
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
    <div>
      <AudioA
        ref="audioD"
        :key="timer"
        :songur="songur"
        :songuser="songuser"
        :data="songData?.[Index]"
        @ended="changeFinish"
        @gat="changeIndex"
      />
      <div class="hied"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { search, suggest, songUrl } from "../docs/api/search";
// import {toggleDark,isDark} from '../composables'
const options = ref<any[]>([]);
const songData = ref<any[]>([]);
const value = ref<string>();
const songuser = ref<object>();
const Index = ref<number>(0);
const showClose = ref<boolean>(false);
const searchLoading = ref<boolean>(false);
const timer = ref<number>(0);
const songur = ref<String>();
const audioD = ref();
const select = ref();
const loading = ref(false);
const playM = async (query: number, row: any) => {
  Index.value = query;
  row.loading = true;
  const { data } = await songUrl({ id: songData.value[query].id });
  songur.value = data[0].url;
  row.loading = false;
  songuser.value = {
    name: songData.value[query].name,
    artistsName: songData.value[query].artists[0].name,
  };
  if (!audioD?.value.isPlaying) {
    audioD.value.isPlaying = true;
  }
  if (!data[0].url) {
    ElMessage.error(`音乐请求url为${data[0].url},请换一首~`);
  }
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
const changeFinish = () => {
  changeIndex(false);
};
//上一首 下一首
const changeIndex = async (type: boolean) => {
  // type为true为上一首
  if (type) {
    Index.value--;
  } else {
    Index.value++;
  }
  //判断边界点进行循环
  Index.value = Index.value > 9 ? 0 : Index.value;
  Index.value = Index.value < 0 ? 9 : Index.value;
  // console.log(songData.value[Index.value],songData.value);
  //给音乐组件添加时间戳key  防止不刷新
  timer.value = new Date().getTime();
  const { data } = await songUrl({ id: songData.value[Index.value].id });
  songur.value = data[0].url;
  //歌曲的名字和歌手的名字 存下传给子组件显示
  songuser.value = {
    name: songData.value[Index.value].name,
    artistsName: songData.value[Index.value].artists[0].name,
  };
  //有时候的url会没有  很奇怪
  if (!data[0].url) {
    ElMessage.error(`音乐请求url为${data[0].url},请换一首~`);
    changeIndex(false);
  }
  // console.log(songur.value,data);
};
//搜索框值改变时搜索歌曲
const songChange = async (query: string) => {
  if(query=="") return
  searchLoading.value = true;
  const data: any = await search({ keywords: query, limit: 10 });
  data.result?.songs.map((item: any) => {
    item.songName = item.artists[0].name;
  });
  searchLoading.value = false;
  // console.log(data.result.songs);
  songData.value = data.result.songs;
};
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true;
    const data: any = await suggest({ keywords: query, limit: 10 });
    loading.value = false;
    // 需要添加一条输入的值数据
    // console.log(data);
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
.hied {
  height: 0px;
}
.box {
  width: 560px;
  margin: 50px auto;
  font-size: 14px;
  color: #409eff;
  border: 1px solid #409eff;
  padding: 20px;
  border-radius: 10px;
  /deep/ .el-table__body,/deep/ .el-table__header{
    width: 100% !important;
  }
  /deep/.el-select{
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
  .hied {
    height: 100px;
  }
  .box {
    width: 100%;
    border: none;
  }
}
</style>