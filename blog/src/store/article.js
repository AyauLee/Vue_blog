import { getArtcate, getNewArticle, getArchiveList, getArtListByTag, getArticleById } from "@/api";

const actions = {
    // 获取全部文章分类标签
    async artcate({ commit }) {
        let result = await getArtcate();
        if (result) {
            commit('ARTCATE', result);
        }
    },
    // 获取最新发布五条文章标题
    async newArticle({ commit }) {
        let result = await getNewArticle();
        if (result) {
            commit('NEWARTICLE', result);
        }
    },
    // 获取全部文章归档列表
    async archiveList({ commit }) {
        let result = await getArchiveList();
        if (result) {
            commit('ARCHIVELIST', result)
        }
    },
    //根据标签获取文章列表
    async artListByTag({ commit }, tag) {
        let result = await getArtListByTag(tag);
        if (result) {
            commit('ARTLISTBYTAG', result);
        }
    },
    // 根据文章id获取对应文章
    async articleById({ commit }, id) {
        let result = await getArticleById(id);
        if (result) {
            commit('ARTICLEBYID', result);
        }
    }
};

const mutations = {
    ARTCATE(state, catelist) {
        state.catelist = catelist;
    },
    NEWARTICLE(state, newArtList) {
        state.newArtList = newArtList;
    },
    ARCHIVELIST(state, archiveList) {
        state.archiveList = archiveList;
    },
    ARTLISTBYTAG(state, artListByTag) {
        state.artListByTag = artListByTag;
    },
    ARTICLEBYID(state, artmain) {
        state.artmain = artmain;
    }
};

const state = {
    catelist: [], // 全部文章分类
    newArtList: [], // 最新发布五条文章
    archiveList: [], // 全部文章归档列表
    artListByTag: [], // 标签对应文章列表
    artmain: {}, // id对应文章
};

export default {
    actions,
    mutations,
    state
}