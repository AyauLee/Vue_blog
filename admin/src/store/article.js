import { getArticleList, getArticleById, updateArticleInfo } from '@/api';

const actions = {
    // 获取文章列表
    async getArticles({ commit }) {
        let data = await getArticleList();
        if (data) {
            commit('GETARTICLES', data);
        }
    },
    // 根据id获取对应文章
    async getArticleInfo({ commit }, _id) {
        let data = await getArticleById(_id);
        if (data) {
            commit('GETARTICLEINFO', data);
        }
    },
    // 更新文章
    async updateArticle(context, data) {
        let result = await updateArticleInfo(data);
        if (result.status == 0) {
            return result.message
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
};

const mutations = {
    // 获取文章列表
    GETARTICLES(state, data) {
        state.articleList = data;
    },
    // 获取文章信息
    GETARTICLEINFO(state, data) {
        state.articleInfo = data;
    }
};

const state = {
    articleList: [],
    articleInfo: {},
};

export default {
    actions,
    mutations,
    state
}
