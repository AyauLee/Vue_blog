const mongoose = require('mongoose')

// 文章分类
const schema = new mongoose.Schema({
    title: String, // 链接标题
    cate: { type: String, default: '工具' },// 链接分类
    url: String // 链接地址
})

module.exports = mongoose.model('Links', schema)