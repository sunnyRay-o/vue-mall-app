<template>
  <div class="classify-container">
    <div class="search-btn">
      <van-icon name="search" class="search-icon" />
      荔枝水果9.95
    </div>
    <div class="first-level-nav-wrapper">
      <FirstLevelNav />
    </div>
  </div>
</template>
<script>
import FirstLevelNav from "../components/FirstLevelNav.vue";

export default {
  components: {
    FirstLevelNav,
  },
};
</script>
<style scoped lang='less'>
.classify-container {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    margin: 11px auto 0;
    font-size: 14px;
    color: #a1a1a1;
    border-radius: 10px;
    background: #eee;
    text-align: center;
    line-height: 33px;
    .search-icon {
      vertical-align: middle;
    }
  }
}
</style>
