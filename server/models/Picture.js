const mongoose = require('mongoose')


// 照片墙
const schema = new mongoose.Schema({
    cate: { type: String, default: '风景' },
    title: String, // 提示信息
    url: String, // 链接地址
    date: { type: String, },
})

module.exports = mongoose.model('Picture', schema)