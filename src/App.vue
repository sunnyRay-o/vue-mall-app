<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['setCounterMap']),
  },
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {}; // 如果是第一次操作添加购物车，本地没有存储任何数据，所以给一个空对象
    this.setCounterMap(counterMap);
  },
};
</script>
<style lang="less">
</style>
