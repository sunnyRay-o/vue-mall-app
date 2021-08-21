<template>
  <div class="item"
    v-if="exist"
    :style="{
      width: imgWidth + 'px',
      height: imgHeight + 'px',
      opacity: opacity,
      transform: `translate(${startX}px, ${startY}px) scale(${sX}, ${sY})`,
    }"
  >
    <img :src="src">
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="less">
.item {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    transition: all 1s;
    transform-origin: 0 0;
    img {
        width: 100%;
        border-radius: 50%;
    }
}

</style>
