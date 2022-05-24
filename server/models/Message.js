const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name: String, // 用户输入的名字
    email: String, // 邮箱
    message: String, // 评论的内容
    ip: String, // 用户名
    area: String, // 地区
    brower: String, // 浏览器
    os: String,// 操作系统
    date: { type: String }, // 留言时间
    status: { type: String, default: '待回复' },
    reply: String, // 回复内容
    replydate: String, // 回复时间

})

module.exports = mongoose.model('Message', schema)