import Vue from 'vue';
import com from './index.vue';

// 组件构造函数
const Animate = Vue.extend(com);
export default function ({
  imgWidth, imgHeight, imgLeft, imgTop, src, endX, endY,
}) {
  // 组件实例
  const animate = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        imgWidth,
        imgHeight,
        opacity: 1,
        startX: imgLeft,
        startY: imgTop,
        sX: 1,
        sY: 1,
        src,
        exist: true,
      };
    },
  });
  document.body.appendChild(animate.$el);
  // 过渡动画
  setTimeout(() => {
    animate.opacity = 0;
    animate.startX = endX;
    animate.startY = endY;
    animate.sX = 0.2;
    animate.sY = 0.2;
  }, 0);
  setTimeout(() => {
    animate.exist = false;
  }, 1100);
}
