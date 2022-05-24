import { getLinkList, updateLinkInfo, deletelinkInfo } from '@/api';

const actions = {
    // 获取链接列表
    async getLinksInfo({ commit }) {
        let data = await getLinkList();
        if (data) {
            commit('GETLINKSINFO', data);
        }
    },
    // 添加或更新链接
    async updateLink(context, linkdoc) {
        let result = await updateLinkInfo(linkdoc);
        if (result.status == 0) {
            return result.message;
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除链接
    async deleteLink(context, _id) {
        let result = await deletelinkInfo(_id);
        if (result.status == 0) {
            return result.message;
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
};

const mutations = {
    GETLINKSINFO(state, data) {
        state.linksInfo = data;
    }
};

const state = {
    linksInfo: [],
};

export default {
    actions,
    mutations,
    state
}