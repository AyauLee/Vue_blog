// 引入 axios
import axios from 'axios';
// 引入进度条插件
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
import store from '@/store';


export default (username, password) => {
    // 利用 axios 的 create方法，创建一个axios实例，可以传入一个配置对象
    const requests = axios.create({
        baseURL: "/login",
        timeout: 5000
    });
    // 请求拦截器
    requests.interceptors.request.use(config => {
        nprogress.start();
        return config;
    })

    // 响应拦截器
    requests.interceptors.response.use(res => {
        nprogress.done();
        if (res.data.token && res.data.uid) {
            store.commit('USERLOGIN', { token: res.data.token, uid: res.data.uid });
        }
        return res.data;
    }, (error) => {
        if (error) {
            return Promise.reject(new Error(error))
        }
    });
    return requests({ url: '/user', method: 'post', data: { username, password } })
}