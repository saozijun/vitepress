<template>
  <div
    :class="`shiny-text ${disabled ? 'disabled' : ''} ${className}`"
    :style="{ animationDuration }"
  >
    {{ text }}
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

let props = defineProps({
  text: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  speed: {
    type: Number,
    default: 5,
  },
  className: {
    type: String,
    default: "",
  },
});
let animationDuration = computed(() => {
  return `${props.speed}s`;
});
</script>

<style lang="less" scoped>
.shiny-text {
  color: #b5b5b542;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  display: inline-block;
  animation: shine 5s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}

.shiny-text.disabled {
  animation: none;
}
</style>
