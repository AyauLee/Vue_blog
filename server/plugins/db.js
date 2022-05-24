// 引入 mongoose 模块
const mongoose = require('mongoose');

// 连接 MongoDB 数据库
// 格式：mongoose.connect('mongodb://数据库的ip地址:端口号/数据库名)
// 如果端口号是默认端口号（27017），则可以省略不写
// 如果通过账号密码连接：mongoose.connect('mongodb://username:password@数据库的ip地址:端口号/数据库名)
mongoose.connect('mongodb://localhost/blog');

// 监听 MongoDB 数据库的连接状态
let db = mongoose.connection;
db.once('open', function () {
    console.log('数据库连接成功！')
})
db.once('close', function () {
    console.log('数据库断开连接！')
})