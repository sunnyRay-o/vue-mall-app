<template>
  <div class="tab-bar-container">
    <van-tabbar route>
      <van-tabbar-item :to="{ name: 'Home' }" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'Classify' }" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'Shopping' }" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'User' }" icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
