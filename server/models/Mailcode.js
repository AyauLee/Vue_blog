// 存储邮箱验证码的集合

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: String,
    code: String,
})

module.exports = mongoose.model('Mailcode', schema)
