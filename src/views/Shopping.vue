<template>
  <div class="shopping-container">
    <div class="nav-bar">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="onDel"
      />
    </div>
    <div class="cards-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" v-model="checked" :name="item.id"></van-checkbox>
          <GoodsCard v-bind="item"/>
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar :price="allMoney" :button-text="`去提交(${totalNum})`" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Toast, Dialog } from 'vant';
import GoodsCard from '../components/GoodsCard.vue';

export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      result: [],
      checked: false,
      list: [],
    };
  },
  computed: {
    ...mapState(['counterMap']),
    allMoney() {
      const product = this.list.filter((item) => this.result.includes(item.id));
      return product.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return (num * next.price * 100) + prev;
      }, 0);
    },
    totalNum() {
      const product = this.list.filter((item) => this.result.includes(item.id));
      return product.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return num + prev;
      }, 0);
    },
  },
  methods: {
    ...mapMutations(['changeStorage']),
    async onDel() {
      if (this.result.length === 0) {
        Toast('你没有选中商品');
        return;
      }
      try {
        await Dialog.confirm({ message: '您是否要删除已选中商品' });
        this.result.forEach((id) => {
          this.changeStorage({ id, value: -Infinity });
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        });
      } catch (error) {
        Toast('用户点击了取消');
      }
    },
    async getAllData() {
      const goods = this.counterMap;
      const key = Object.keys(goods);
      const { list } = await this.$api.getGoodsByIds(key.join());
      this.list = list;
    },
    onSubmit() {
      if (this.result.length === 0) {
        Toast('去挑选你喜欢的商品再来哦');
      } else {
        Toast('结算成功');
      }
    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  created() {
    this.getAllData();
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.shopping-container {
  min-height: 100vh;
  background: #eee;
  .nav-bar {
    position: fixed;
    width: 100%;
    z-index: 10;
  }
  .cards-list {
    background: #fff;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px ;
    position: absolute;
    top: 46px;
    width: 100%;
    .card-box {
      display: flex;
      justify-content: center;
      .check {
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
