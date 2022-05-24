// 对axios进行二次封装

// 引入 axios
import axios from 'axios';
// 引入进度条插件
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
import router from '../router';
import store from '@/store';

// 利用 axios 的 create方法，创建一个axios实例，可以传入一个配置对象
const http = axios.create({
    baseURL: "/admin",
    timeout: 5000
});

// 请求拦截器
http.interceptors.request.use(config => {
    nprogress.start();
    if (store.state.home.token) {
        config.headers.Authorization = store.state.home.token;
    }
    if (store.getters.isAdmin) {
        config.headers.isAdmin = 'superAdmin';
    }
    return config;
})

// 响应拦截器
http.interceptors.response.use(res => {
    nprogress.done();
    if (res.data.status == 401) {
        store.commit('LOGINOUT');
        router.push('/login');
    }
    return res.data;
}, (err) => {
    if (err) {
        return Promise.reject(new Error(err))
    }
});


// 对外暴露
export default http;