import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/global.less';

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
