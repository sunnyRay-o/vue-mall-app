<template>
  <div class="goods-card-container van-hairline--bottom">
      <div class="card-img">
          <img :src="images[0]" ref="img">
      </div>
      <div class="card-content">
          <div class="title">{{title}}</div>
          <div class="desc">{{desc}}</div>
          <div class="tags">
              <div v-for="t in tags" :key="t">{{t}}</div>
          </div>
          <div class="price">￥{{price}}</div>
          <div class="counter">
              <div @click="counter(id, -1)" v-if="counterMap[id]">
                  <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
              </div>
              <div class="num">{{counterMap[id]}}</div>
              <div @click="counter(id, 1)">
                  <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Animate from '../tools/Animate';

export default {
  computed: mapState(['counterMap']),
  props: ['tags', 'images', 'title', 'price', 'desc', 'id'],
  methods: {
    ...mapMutations(['changeStorage', 'setBadge']),
    counter(id, num) {
      this.changeStorage({ id, value: num });
      this.animate(num);
    },
    animate(num) {
      if (num === -1) {
        return;
      }
      // 飞入购物车效果
      // 图片元素
      const { img } = this.$refs;
      // 图片链接
      const { src } = img;
      // 图片尺寸
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = img;
      // 图片位置
      const { left: imgLeft, top: imgTop } = img.getBoundingClientRect();
      // 购物车元素
      const shopCar = document.getElementById('shopCar');
      // 购物车尺寸
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      // 购物车位置
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();
      // 终点位置
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      // 运动方法
      Animate({
        imgWidth, imgHeight, imgLeft, imgTop, src, endX, endY,
      });
    },
  },
};
</script>

<style scoped lang="less">
@import '../assets/css/global.less';
.goods-card-container {
    width: 100%;
    height: 100px;
    display: flex;
    .card-img {
        width: 90px;
        height: 90px;
        margin-right: 20px;
        img {
            width: 90px;
        }
    }
    .card-content {
        width: 170px;
        .title {
            font-size: 13px;
            margin-top: 5px;
            .text-overflow();
        }
        .desc {
            font-size: 11px;
            color: #cecece;
            margin-top: 5px;
            .text-overflow();
        }
        .tags {
            display: flex;
            div {
                color: #cecece;
                font-size: 10px;
                margin-top: 4px;
                border: 2px solid #cecece;
                border-radius: 4px;
                margin-right: 10px;
            }
        }
        .price {
            margin-top: 4px;
            color: #ff1a90;
            font-size: 14px;
            font-weight: bold;
        }
        .counter {
            display: flex;
            position: absolute;
            right: 15px;
            bottom: 10px;
            >div:not(.num) {
                width: 16px;
                height: 16px;
                img {
                    width: 100%;
                }
            }
            .num {
                height: 16px;
                padding: 0 5px;
                line-height: 16px;
            }
        }
    }
}

</style>
