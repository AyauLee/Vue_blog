import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
//引入store
import store from '@/store'
// 统一引入 接口api文件夹里面全部请求函数
import * as API from '@/api';
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 把请求函数注册到vue的实例上
    Vue.prototype.$API = API;
  },
  router,
  store
}).$mount('#app')
