const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    ip: String, // 用户名
    area: String, // 地区
    brower: String, // 浏览器
    os: String,// 操作系统
    date: { type: String } // 访问时间
})

module.exports = mongoose.model('Visitor', schema)