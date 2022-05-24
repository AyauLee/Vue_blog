// router/index.js 配置路由的地方
import Vue from 'vue'; // 引入Vue
import VueRouter from 'vue-router'; // 引入路由
// 应用插件
Vue.use(VueRouter);


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
