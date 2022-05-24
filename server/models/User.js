const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    username: { type: String }, // 用户名
    password: { // 密码
        type: String,
        select: false, // 是否可以被选择
        set(val) {
            return bcrypt.hashSync(val, 10)
        }
    },
    nickname: { type: String }, // 昵称
    avatar: { type: String }, // 头像
    gender: {
        type: String,
        default: '男'
    },
    isSuperAdmin: { type: Boolean, default: false } // 是否超级管理员
})

module.exports = mongoose.model('User', schema)