const express = require('express');
// 创建路由对象
const router = express.Router();
const User = require('../models/User'); // 用户
// 导入 bcryptjs 对用户密码进行加密解密
const bcrypt = require('bcryptjs');
// 导入 jsonwebtoken 这个包用来生成 Token 字符串
const jwt = require('jsonwebtoken');
// 导入配置文件 包含加密解密token的密钥字符串
const jwtKey = require('../plugins/jwtKey');

// 添加用户
router.post('/user', async (req, res) => {
    let { username, password } = req.body;
    let data = await User.findOne({ username }).select("+password");
    // 调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
    // 返回值是布尔值（true 一致、false 不一致）
    if (!data) return res.cc('用户名密码不正确！');
    const compareResult = bcrypt.compareSync(password, data.password);
    if (!compareResult) return res.cc('用户名密码不正确！')
    // 对用户的信息进行加密，生成JWT 的token字符串
    const tokenStr = jwt.sign({ id: data._id, uname: data.username }, jwtKey.jwtSecretKey, { expiresIn: jwtKey.expiresIn });
    // 将生成的 Token 字符串响应给客户端
    res.send({
        status: 0,
        message: '登录成功！',
        uid: data._id,
        // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
        token: 'Bearer ' + tokenStr,
    });
})

module.exports = router;