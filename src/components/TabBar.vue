<template>
  <div class="tab-bar-container">
    <van-tabbar route>
      <van-tabbar-item :to="{ name: 'Home' }" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'Classify' }" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item :badge="badge" :to="{ name: 'Shopping' }" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'User' }" icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['counterMap']),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>
</style>
