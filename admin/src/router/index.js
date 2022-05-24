import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import store from '@/store';
import { getToken } from '@/utils/userToken';


// 解决编程式路由导航重复跳转报错的问题
// 先把VueRouter原型对象的push | replace，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push | replace
// 第一个参数，告诉原来push方法，往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    // 这个函数的this就是VueRouter类的一个实例$router
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


const routes = [
    {
        path: '/login',
        component: () => import('@/views/XLogin'),
    },
    {
        path: '/',
        component: () => import('@/views/XMain'),
        children: [
            {
                path: 'home',
                component: () => import('@/views/XMain/XHome'),
            },
            {
                path: 'link',
                component: () => import('@/views/XMain/XLink'),
            },
            {
                path: 'picture',
                component: () => import('@/views/XMain/XPicture'),
            },
            {
                path: 'message',
                component: () => import('@/views/XMain/XMessage'),
            },
            {
                path: 'artcate',
                component: () => import('@/views/XMain/ArtCate'),
            },
            {
                path: 'article',
                component: () => import('@/views/XMain/ArticleAll'),
            },
            {
                path: 'addart',
                component: () => import('@/views/XMain/AddArt'),
            },
            {
                path: 'editart',
                name: 'editart',
                component: () => import('@/views/XMain/EditArt'),
            },
            {
                path: 'center',
                component: () => import('@/views/XMain/XCenter'),
            },
            {
                // 重定向
                path: '*',
                redirect: '/home'
            }
        ]
    },
]

let router = new VueRouter({
    routes,
    // 滚动行为 
    scrollBehavior() { // (to, from, savedPosition)
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach((to, from, next) => {
    // to：可以获取 要跳转到哪个路由的信息 from：从哪去
    let token = store.state.home.token || getToken() || false;
    if (!token) { // 用户未登录
        if (to.path == '/login') {
            next();
        } else {
            Vue.prototype.$message({ type: 'info', message: '请登录管理员账号！' });
            next('/login')
        }
    } else {
        if (to.path == '/login') {
            // 已经登录了就不准再去登录
            Vue.prototype.$message({ type: 'info', message: '您已经登录过啦！' });
            next(false)
        } else {
            next();
        }
    }
})
export default router;