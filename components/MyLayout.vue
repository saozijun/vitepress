<script  lang="ts" setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <ClientOnly>
        <Music/>
      </ClientOnly>
    </template>
  </Layout>
</template>