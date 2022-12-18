<template>
  <div class="box">
    <div class="flex flex-wrap">
      <div class="m-4">
        <p>搜索歌曲</p>
        <el-select
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="喜欢你、Letting"
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
    <el-table
      :data="songData"
      style="width: 100%; margin: 0 auto"
      v-if="songData.length > 0"
    >
      <el-table-column fixed prop="name" label="歌曲" width="150" />
      <el-table-column prop="songName" label="歌手" width="120" />
      <el-table-column label="头像" width="120" >
        <template #default="scope">
            <el-avatar :size="50" :src="scope.row.artists[0].img1v1Url" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="playM(scope.$index)"
          >
            播放
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
        <AudioA ref="audioD"  :key="timer" :songur="songur" :songuser="songuser" :data="songData?.[Index]" @gat="changeIndex" />
        <div class="hied"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElMessage } from 'element-plus'
import { search, suggest, songUrl } from "../docs/api/search";
const options = ref<any[]>([]);
const songData = ref<any[]>([]);
const value = ref<string>();
const songuser = ref<object>();
const Index = ref<number>(0);
const timer = ref<number>(0);
const songur = ref<String>();
const audioD=ref(null)
const loading = ref(false);
const playM = async (query: number) => {
  Index.value = query
  const { data } = await songUrl({ id: songData.value[query].id });
  songur.value = data[0].url;
  songuser.value ={
    name:songData.value[query].name,
    artistsName:songData.value[query].artists[0].name,
  }
  if(!audioD.value.isPlaying){
    audioD.value.isPlaying = true
  }
  if(!data[0].url){
    ElMessage.error(`音乐请求url为${data[0].url},请换一首~`)
  }
};
const changeIndex = async (type:boolean)=>{
  if(type){
    Index.value--
  }else{
    Index.value++
  }
  Index.value = Index.value>9?0:Index.value
  Index.value = Index.value<0?9:Index.value
  console.log(songData.value[Index.value],songData.value);
  
  timer.value = new Date().getTime()
  const { data } = await songUrl({ id: songData.value[Index.value].id });
  songur.value = data[0].url;
  songuser.value ={
    name:songData.value[Index.value].name,
    artistsName:songData.value[Index.value].artists[0].name,
  }
  if(!data[0].url){
    ElMessage.error(`音乐请求url为${data[0].url},请换一首~`)
  }
  console.log(songur.value,data);
  
}
const songChange = async (query: string) => {
  const data: any = await search({ keywords: query, limit: 10 });
  data.result?.songs.map((item:any) => {
    item.songName = item.artists[0].name;
  });
  console.log(data.result.songs);
  songData.value = data.result.songs;
};
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true;
    const data: any = await suggest({ keywords: query, limit: 10 });
    loading.value = false;
    options.value = data.result.songs;
  } else {
    options.value = [];
  }
};
</script>
<style scoped lang="less">

.hied{
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
@media screen and (max-width:600px){
  .hied{
    height: 100px;
  }
  .box {
    width: 100%;
    border:none
  }
}
</style>