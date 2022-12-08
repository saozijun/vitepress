# 绑定元素 ref

```vue
<template>
    <div ref="box">哈哈</div>
</template>
 
<script setup lang='ts'>
import { ref,onMounted } from "vue";

const box = ref(null)

onMounted(()=>{
    console.log(box.value)
})
</script>
```

![图 1](img/08507ffd6efaa2ee8de8cad0c8a30741509d3e7c6c158ed2aa03744bf11df668.png) 