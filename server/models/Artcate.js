const mongoose = require('mongoose')

// 文章分类
const schema = new mongoose.Schema({
    catename: String, // 分类名称
    title: String, // 分类的简介
    imgurl: String,
    ctype: { type: String, default: 'danger' }// 分类按钮
})

module.exports = mongoose.model('Artcate', schema)