import http from './http';

// 获取文章分类
export const getArtcate = () => http.get('/artcate');
// 获取最新发布十条文章
export const getNewArticle = () => http.get('/article/new');
// 获取全部文章列表归档
export const getArchiveList = () => http.get('/article/archive');
// 根据标签名获取文章列表
export const getArtListByTag = (tag) => http.get(`/article/artbytag?tag=${tag}`);
// 根据文章id获取文章内容
export const getArticleById = (id) => http.get(`/article/artbyid?id=${id}`);
// 获取全部链接
export const getLinksInfo = () => http.get('/getlinks');
// 获取照片墙
export const getPicInfo = (pagenum) => http({ url: '/picture', params: { pagenum }, method: 'get' });
// 提交访问者信息
export const submitinfo = (data) => http({
    url: '/visitor/submitinfo',
    method: 'post',
    data,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
});
// 发送邮箱校验码 
export const getEmailCode = (email) => http.get(`/authcode?email=${email}`);
// 提交留言
export const postMessage = (data) => http({
    url: '/message',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
});