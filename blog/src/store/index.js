import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 引入存储文章的小仓库
import article from './article';



// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // vuex仓库模块式开发存储数据
    modules: {
        article
    }
})