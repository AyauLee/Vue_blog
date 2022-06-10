// router/index.js 配置路由的地方
import Vue from 'vue'; // 引入Vue
import VueRouter from 'vue-router'; // 引入路由
// 应用插件
Vue.use(VueRouter);

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

// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: '/',
            component: () => import('@/views/MyHome')
        },
        {
            path: '/archive',
            component: () => import('@/views/MyArchive'),
            children: [
                {
                    path: '/',
                    component: () => import('@/views/MyArchive/TimeStamp'),
                },
                {
                    path: 'artcate',
                    component: () => import('@/views/MyArchive/ArtCate'),
                },
                {
                    path: 'article',
                    component: () => import('@/views/MyArchive/ArtMain'),
                },
            ]
        },
        {
            path: '/picture',
            component: () => import('@/views/MyPicture')
        },
        {
            path: '/link',
            component: () => import('@/views/GetLinks')
        },
        {
            path: '/about',
            component: () => import('@/views/AboutMe')
        },
        {
            // 重定向
            path: '*',
            redirect: '/'
        }
    ],
    // 滚动行为 
    scrollBehavior() { // (to, from, savedPosition)
        // 始终滚动到顶部
        return { y: 0 }
    },
})
