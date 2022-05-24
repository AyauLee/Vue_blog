const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    //标题
    title: { type: String },
    //简介
    introduction: { type: String },
    //封面
    cover: { type: String },
    //内容(markdown)
    body: { type: String },
    //所含标签
    tags: { type: Array },
    //更新日期
    date: { type: String },
    timecate: { type: String },
    //作者
    author: { type: String, default: 'AyauLee' }
})

module.exports = mongoose.model('Article', schema)