<template>
    <div class="box">
        <div>{{data?.title}}</div>
        <p>{{data?.msg}}</p>
        <div v-if="data?.aShow" class="a-box">
            <a v-for="item in data?.link" :key="item.id" :href="item.href">{{item.text}}</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineComponent } from 'vue'
    defineProps({
        data:Object,
    })
</script>
<style scoped lang="less">
    .box{
        width: 90%;
        margin: 0 auto;
        font-size:14px;
        color: #1d7d52;
        border: 1px solid #42b883;
        padding: 20px;
        border-radius: 10px;
        div{
            font-weight: bold;
        }
        .a-box{
            display: flex;
            flex-direction: column;
            a{
            color: #1d7d52;
            text-decoration: underline;
            font-weight: bold;
            &:hover{
                color: #1d7d52b8;
            }
        }
        }
    }
</style>