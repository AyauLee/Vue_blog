import http from './http';

// 获取链接列表
export const getLinkList = () => http.get('/getlinks');
// 添加或更新链接
export const updateLinkInfo = (linkdoc) => http({ url: '/updatelink', params: { linkdoc }, method: 'post' });
// 删除链接
export const deletelinkInfo = (_id) => http({ url: '/deletelink', params: { _id }, method: 'post' });
// 获取文章分类列表
export const getArtCateList = () => http.get('/artcate/getlist');
// 新增或更新文章分类
export const updateArtCateInfo = (catedoc) => http({ url: '/artcate/update', params: { catedoc }, method: 'post' });
// 删除文章分类
export const deleteArtCateInfo = (_id) => http({ url: '/artcate/delete', params: { _id }, method: 'post' });
// 获取文章列表
export const getArticleList = () => http.get('/article/getList');
// 根据id获取文章
export const getArticleById = (_id) => http.get(`/article/artbyid?_id=${_id}`);
// 更新文章 
export const updateArticleInfo = (data) => http({
    url: '/article/update',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
})
// 根据id删除文章
export const deleteArticleById = (_id) => http({ url: '/article/delete', params: { _id }, method: 'post' });
// 更新图片资源
export const uploadImg = (formdata) => http({
    url: '/file/upload',
    method: 'post',
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' },
})
// 删除图片资源
export const deleteImg = (url) => http({ url: '/file/delete', method: 'post', params: { url } });
// 获取照片墙
export const getPicInfo = (pagenum) => http({ url: '/picture/getlist', params: { pagenum }, method: 'get' });
// 更新照片信息
export const updatePicInfo = (data) => http({
    url: '/picture/updateinfo',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
});
// 根据id删除照片信息
export const deletePicInfo = (_id) => http.post(`/picture/deleteByid?_id=${_id}`);
// 获取留言列表
export const getMessageList = () => http.get('/message/getlist');
// 回复留言
export const reqReplyInfo = (data) => http({
    url: '/message/reply',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
})
// 根据id删除留言
export const deleteMessage = (_id) => http.get(`/message/delete?_id=${_id}`);
// 获取首页概览信息
export const getHomeTRInfo = () => http.get('/homeinfo');
// 获取首页文章统计信息
export const getHomeArtCount = () => http.get('/home/artcount');
// 获取管理员信息
export const reqUserInfo = (userid) => http({ url: '/user', method: 'get', params: { userid } });
// 修改用户头像
export const updateAvatar = (_id, avatar, newurl) => http({ url: '/user/avatar', method: 'post', params: { _id, avatar, newurl } })
// 修改用户昵称和性别
export const updateUserInfo = (data) => http({ url: '/user/upinfo', method: 'post', data });
// 获取访问者分布
export const getVisitorList = () => http.get('/visitor');