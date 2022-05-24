import Vue from 'vue';
import App from './App.vue';
// 引入路由
import router from '@/router/index';
// 引入store仓库
import store from '@/store/index';

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI);

// 全局mixin混入 (页面滚动)
import scroll from './mixins/scroll';
import goArticle from "@/mixins/goArticle";
Vue.mixin(scroll);
Vue.mixin(goArticle);
// 注册全局组件
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
import MyTags from "@/components/MyTags";
import GoTop from "@/components/GoTop";
Vue.component(MyHeader.name, MyHeader);
Vue.component(MyFooter.name, MyFooter);
Vue.component(MyTags.name, MyTags);
Vue.component(GoTop.name, GoTop);




Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
