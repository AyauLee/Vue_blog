import { reqUserInfo, getHomeTRInfo, getHomeArtCount, getVisitorList } from '@/api';
import { setToken, setUid, removeToken, removeUid, getUid, getToken } from '@/utils/userToken';

const actions = {
    // 获取管理员信息
    async getUserInfo({ commit, state }) {
        let data = await reqUserInfo(state.uid);
        if (data) {
            commit('GETUSERINFO', data);
        }
    },
    // 获取首页右上角统计信息
    async getHomeInfo({ commit }) {
        let data = await getHomeTRInfo();
        if (data instanceof Array) {
            commit('GETHOMEINFO', data);
        }
    },
    // 获取首页文章字数统计信息
    async getArtCount({ commit }) {
        let data = await getHomeArtCount();
        if (data instanceof Array) {
            commit('GETARTCOUNT', data);
        }
    },
    // 获取地图信息
    async getAreaData({ commit }) {
        let data = await getVisitorList();
        if (data) {
            commit('GETAREADATA', data);
        }
    }
};

const mutations = {
    // 管理员信息
    GETUSERINFO(state, data) {
        state.userInfo = data;
    },
    // 首页右上角展示信息
    GETHOMEINFO(state, data) {
        state.homeInfo = data;
    },
    // 首页文章字数统计
    GETARTCOUNT(state, data) {
        state.artCount = data;
    },
    // 地图信息
    GETAREADATA(state, data) {
        state.areaData = [...data];
    },
    USERLOGIN(state, data) {
        setToken(data.token);
        setUid(data.uid);
        state.token = data.token;
        state.uid = data.uid;
    },
    LOGINOUT(state) {
        removeToken();
        removeUid();
        state.token = '';
        state.uid = '';
    }
};

const state = {
    userInfo: {},
    homeInfo: [],
    artCount: [],
    areaData: [],
    token: getToken(),
    uid: getUid(),
};

export default {
    actions,
    mutations,
    state
}