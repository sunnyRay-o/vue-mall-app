<template>
  <div class="goods-list-container">
    <div  class="list-header van-hairline--top van-hairline--bottom">
      <div :class="{active: type === 'all'}" @click="changeType('all')">综合</div>
      <div :class="{active: type === 'sales'}" @click="changeType('sales')">销量</div>
      <div
      class="price"
      @click="changeType('price')"
      :class="{'price-up': type == 'price-up', 'price-down': type == 'price-down'}"
      >价格</div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="true"
          >
            <GoodsCard v-for="item in goodsList" :key="item.id" v-bind="item"/>
          </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import GoodsCard from './GoodsCard.vue';

export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      sortType: 'all',
    };
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    changeType(type) {
      if (type === 'all') {
        this.type = 'all';
      } else if (type === 'sales') {
        this.type = 'sales';
      } else if (this.type === 'price-up') {
        this.type = 'price-down';
      } else {
        this.type = 'price-up';
      }
      // 改变type后，要重新获取数据，所以要刷新页面
      this.onRefresh();
    },
    onRefresh() {
      // 初始化属性
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.page = 1;
      // 清空列表
      this.resetGoodsList();
      // 重新获取数据
      this.getGoodsList({ page: this.page, sort: this.type });
      this.isLoading = false;
    },
    async onLoad() {
      // 初始化属性
      this.page += 1;
      this.loading = true;
      this.finished = false;
      // 获取下一页数据
      const result = await this.getGoodsList({ page: this.page, sort: this.type });
      if (result) {
        // 可以继续获取下一页数据
        this.loading = false;
      } else {
        // 数据加载完了
        this.finished = true;
      }
    },
  },
  computed: mapState({
    goodsList: (state) => state.goodsList,
    total: (state) => state.total,
  }),
};
</script>

<style lang="less" scoped>
.goods-list-container {
  overflow: auto;
  position: fixed;
  top: 127px;
  bottom: 50px;
  left: 79px;
  width: 296px;
  .list-header {
    width: 296px!important;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 8px;
    position: relative;
    top: 0;
    z-index: 1024;
    & > div {
      width: 50px;
      height: 25px;
      color: #cecece;
      text-align: center;
      line-height: 25px;
      &.active,&.price-up,&.price-down {
        color: #ff1a90;
        font-weight: bold;
      }
    }
    .price {
      position: relative;
    }
    .price::before {
      content: "";
      position: absolute;
      right: 0;
      top: 3px;
      border: 4px solid transparent;
      border-bottom-color: #aaa;
    }
    .price::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 3px;
      border: 4px solid transparent;
      border-top-color: #aaa;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
  }
  .van-pull-refresh {
    overflow: visible!important;
  }
}
</style>
