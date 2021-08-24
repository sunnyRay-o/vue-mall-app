<template>
  <div class="first-level-nav-container" ref="navWrap">
    <div
      class="nav-item"
      :class="{ active: index === i }"
      v-for="(menuItem, index) in menuList"
      :key="menuItem.title"
      @click="scrollTo(index, $event)"
      @touchstart="move = true"
      @touchend="move = false"
    >
      <div class="img-wrap">
        <img :src="menuItem.imgURL" />
      </div>
      <div class="text-wrap">
        {{ menuItem.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import api from '../api';
import tools from '../utils/tools';

export default {
  data() {
    return {
      i: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
      timer: null,
    };
  },
  methods: {
    ...mapActions(['getSideList']),
    scrollTo(index, e) {
      if (this.move) {
        return false;
      }
      this.i = index;
      // 将选中的元素滚动到容器中间位置.
      const { navWrap } = this.$refs;
      const wrapWidth = navWrap.offsetWidth; // 导航栏容器宽度
      // console.log('wrap:', wrapWidth);
      const itemLeft = e.target.getBoundingClientRect().left; // 元素本身距离容器左边的距离
      // console.log('item:', itemLeft);
      const itemWidth = e.target.offsetWidth; // 元素本身宽度；
      // console.log('itemWidth:', itemWidth);
      // console.log(navWrap.scrollLeft);
      tools.moveTo(navWrap.scrollLeft, itemWidth / 2 + itemLeft - wrapWidth / 2, navWrap, 'scrollLeft');
      // 获取二级导航数据
      this.getSideList(this.menuList[index].title);
      return true;
    },
    /**
     * 滚动条过渡动画
     * @param {Number} start 运动开始前的滚动条位置
     * @param {Number} end 运动的距离
     */
    // async getData(i) {
    //   const resp = await api.getSideBarList(this.menuList[i].title);
    //   console.log(resp);
    // },
  },
  created() {
    this.getSideList(this.menuList[0].title);
  },
};
</script>

<style scoped lang='less'>
.first-level-nav-container {
  display: flex;
  height: 94px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0px;
    background: none;
  }
  .nav-item {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    .img-wrap {
      background: #fff;
      display: flex;
      justify-content: center;
      align-content: center;
      border-width: 2px;
      border-style: solid;
      border-radius: 23px;
      border-color: #fff;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
    }
    .text-wrap {
      margin-top: 5px;
      text-align: center;
      width: 50px;
    }
    &.active {
      .text-wrap {
        border-radius: 30px;
        background: #d13193;
        color: #fff;
        font-weight: bold;
      }
      .img-wrap {
        border-color: #d13193;
      }
    }
  }
}
</style>
