import { getArtCateList, updateArtCateInfo, deleteArtCateInfo } from '@/api';

const actions = {
    // 获取文章分类信息
    async getArtCateInfo({ commit }) {
        let data = await getArtCateList();
        if (data) {
            commit('GETARTCATEINFO', data);
        }
    },
    // 新增或更新文章分类
    async updateArtCate(context, catedoc) {
        let result = await updateArtCateInfo(catedoc);
        if (result.status == 0) {
            return result.message;
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 删除文章分类
    async deleteArtCate(context, _id) {
        let result = await deleteArtCateInfo(_id);
        if (result.status == 0) {
            return result.message;
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const mutations = {
    GETARTCATEINFO(state, data) {
        state.artCateInfo = data;
    }
};
const state = {
    artCateInfo: [],
}

export default {
    actions,
    mutations,
    state
}