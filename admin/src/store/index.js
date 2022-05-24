import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import link from './link';
import artcate from './artcate';
import article from './article';
import home from './home';

const getters = {
    cateList(state) {
        let data = state.artcate.artCateInfo;
        let cates = [];
        data.forEach(item => cates.push(item.catename))
        return cates
    },
    isAdmin(state) {
        return state.home.userInfo.isSuperAdmin
    }
}

// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 实现vuex仓库模块化开发存储数据
    modules: {
        link,
        artcate,
        article,
        home
    },
    getters
})