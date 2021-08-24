<template>
  <div class="classify-container">
    <router-link :to="{name: 'Search'}" tag="div" class="search-btn">
      <van-icon name="search" class="search-icon" />
      荔枝水果9.95
    </router-link>
    <FirstLevelNav />
    <template v-if="showContent">
      <SideBar />
      <GoodsList />
    </template>
    <van-loading
      v-else-if="showContent !== true"
      type="spinner"
      color="#3296fa"
      size="2rem"
      vertical
    />
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import FirstLevelNav from '../components/FirstLevelNav.vue';
import SideBar from '../components/SideBar.vue';
import GoodsList from '../components/GoodsList.vue';

export default {
  components: {
    FirstLevelNav,
    SideBar,
    GoodsList,
  },
  computed: mapState(['showContent', 'sideBarList']),
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideBarList[0], page: 1, sort: 'all' });
      }
    },
  },
};
</script>
<style scoped lang='less'>
.classify-container {
  width: 375px;
  min-height: 100vh;
  position: absolute;
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
