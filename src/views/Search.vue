<template>
<div class="search-container">
    <div class="search-head">
        <van-icon name="arrow-left" class="arrow-left" @touchend="$router.goBack()"/>
        <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="onInput"
        @focus="onFocus"
        >
            <template #action v-if="showLikeList">
                <div @click="onSearch(value)">搜索</div>
            </template>
            <template #action v-else>
                <div>
                    <van-icon
                    :badge="badge" name="cart-o" class="shop-car" id="shopCar"
                    @click="$router.push({
                      name: 'Shopping'
                    })"/>
                </div>
            </template>
        </van-search>
    </div>
    <div class="like-list" v-if="likeList.length && showLikeList">
        <van-list>
            <van-cell
            v-for="item in likeList"
            :key="item"
            @click="onSearch(item)"
            >
                <template>
                  <span v-html="formatHTML(item)"></span>
                </template>
            </van-cell>
        </van-list>
    </div>
    <div class="goods-list" v-if="!showLikeList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          >
            <GoodsCard v-for="(item, i) in goodsList" :key="i" v-bind="item"/>
        </van-list>
    </div>
    <div class="history" v-if="showLikeList && likeList.length <= 0">
      <MyHistory :list="searchList" @searchGoods="onSearch($event)"/>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsCard from '../components/GoodsCard.vue';
import MyHistory from '../components/MyHistory.vue';

export default {
  components: {
    GoodsCard,
    MyHistory,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      page: 1,
      size: 5,
      goodsList: [],
      total: 0,
      loading: false,
      finished: false,
      showLikeList: true,
      searchList: [],
    };
  },
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
  methods: {
    async onLoad() {
      const { list, total } = await this.$api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...list];
      this.total = total;
      this.loading = false;
      if (this.total <= this.goodsList.length) {
        this.finished = true;
        this.loading = true;
      } else {
        this.page += 1;
      }
    },
    async onSearch(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.loading = true;
      this.finished = false;
      this.onLoad();
      this.showLikeList = false;
      // 历史记录
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
    },
    onInput() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const resp = await this.$api.fuzzyQuery(this.value);
          this.likeList = resp.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 50);
      }
    },
    onFocus() {
      this.showLikeList = true;
    },
    formatHTML(value) {
      const reg = new RegExp(this.value, 'g');
      const result = value.replace(reg, this.value.fontcolor('red'));
      return result;
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
    // this.searchList.sort((a, b) => b.time - a.time);
  },
};
</script>

<style lang="less" scoped>
.search-container {
    width: 100%;
    height: 100vh;
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    .search-head {
        width: 345px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        position: fixed;
        background: #fff;
        left: 15px;
        top: 0px;
        z-index: 100;
        .arrow-left {
            font-size: 23px;
        }
        .search-content {
            flex: 1;
            .shop-car {
                font-size: 30px;
                vertical-align: middle;
            }
        }
    }
    .like-list {
        position: relative;
        top: 50px;
        box-sizing: border-box;
        padding-left: 35px;
    }
    .goods-list {
        width: 345px;
        margin: 48px auto 0;
        position: relative;
        z-index: 10;
        background: #fff;
    }
}
</style>
