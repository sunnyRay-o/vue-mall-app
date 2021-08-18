/* eslint no-param-reassign: off */
function moveTo(start, end, dom, prop) {
  clearInterval(this.timer);
  let iSpeed = 7;
  let dis = 0;
  if (end < 0) {
    iSpeed *= -1;
  }
  this.timer = setInterval(() => {
    dis += iSpeed;
    dom[prop] = start + dis;
    if (Math.abs(end) - Math.abs(dis) < iSpeed) {
      dom[prop] = start + end;
      clearInterval(this.timer);
    }
  }, 2);
}
export default {
  moveTo,
};
