<template>
  <div id="app">
      <Transition :name="transitionName" :mode="$router.back ? 'out-in' : 'in-out'">
        <router-view class="view"></router-view>
      </Transition>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      transitionName: 'left',
    };
  },
  methods: {
    ...mapMutations(['setCounterMap']),
  },
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {}; // 如果是第一次操作添加购物车，本地没有存储任何数据，所以给一个空对象
    this.setCounterMap(counterMap);
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>
<style lang="less" scoped>
.view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: transform .3s linear;
}
.left-enter {
  transform: translate(100%, 0);
}
.right-leave-to {
  transform: translate(100%, 0);
}
</style>
