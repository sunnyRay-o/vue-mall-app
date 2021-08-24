<template>
  <div class="side-bar-container" ref="sideBar">
      <div class="item"
       :class="{active: index === i}"
       v-for="(item,i) in sideBarList"
       :key="item"
       @touchend="scrollTo(i, $event)"
       @touchstart="move = false"
       @touchmove="move = true"
       >
       {{i === 0 ? "全部" : item}}
      </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import tools from '../utils/tools';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const { sideBar } = this.$refs; // 父元素
      const sTop = e.target.getBoundingClientRect().top; // 子元素的顶部距离视窗顶部的距离
      const pTop = sideBar.getBoundingClientRect().top; // 父元素上边框距离视窗上边框的距离
      const sHeight = e.target.offsetHeight; // 子元素高度
      const pHeight = sideBar.offsetHeight; // 父元素高度
      tools.moveTo(sideBar.scrollTop, sTop + sHeight / 2 - pTop - pHeight / 2, sideBar, 'scrollTop');
      // 获取商品列表的数据
      this.resetGoodsList(); // 清空列表数据
      this.getGoodsList({ type: this.sideBarList[i], page: 1, sort: 'all' });
    },
  },
  computed: mapState(['sideBarList']),
  mounted() {
    console.log('mounted');
    // this.resetGoodsList();
    // this.getGoodsList({ type: this.sideBarList[0], page: 1, sort: 'all' });
  },
};
</script>

<style scoped lang="less">
.side-bar-container {
    width: 79px;
    position: fixed;
    left: 0;
    top: 127px;
    bottom: 50px;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0px;
        background: none;
    }
    .item {
        text-align: center;
        width: 79px;
        height: 40px;
        line-height: 40px;
        position: relative;
        &.active {
            font-weight: bold;
            color: #ff1a90;
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 18px;
                background: #ff1a90;
            }
        }
    }
}
</style>
