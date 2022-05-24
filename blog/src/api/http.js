// 对axios进行二次封装

// 引入 axios
import axios from 'axios';
// 引入进度条插件
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';

// 利用 axios 的 create方法，创建一个axios实例，可以传入一个配置对象
const http = axios.create({
    baseURL: "/web",
    timeout: 5000
});

// 请求拦截器
http.interceptors.request.use(config => {
    nprogress.start();
    return config;
})

// 响应拦截器
http.interceptors.response.use(res => {
    nprogress.done();
    return res.data;
}, (error) => {
    if (error) {
        return Promise.reject(new Error('faile'))
    }
});


// 对外暴露
export default http;