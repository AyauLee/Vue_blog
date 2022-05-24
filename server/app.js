// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors());
// 配置解析json格式数据的中间件
app.use(express.json())
// 配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));
// 连接数据库
require('./plugins/db.js');

const jwtKey = require('./plugins/jwtKey');
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: jwtKey.jwtSecretKey }).unless({ path: [/^\/web\//, /^\/login/, /^\/uploads/] }));

app.use('/uploads', express.static(__dirname + '/uploads'))
// 在路由之前，定义一个响应数据的中间件，里面自己封装res.cc()函数便于向客户端响应处理结果
app.use((req, res, next) => {
    // status默认值为1，表示失败的情况
    res.cc = function (msg, status = 1) {
        res.send({
            status,
            // 状态描述，判断 msg 是 错误对象 还是 字符串
            message: msg instanceof Error ? msg.message : msg,
        })
    }
    next();
})
// 导入并注册 web 路由模块
const webRouter = require('./router/web.js');
app.use('/web', webRouter);

// 导入并注册 admin 路由模块
const adminRouter = require('./router/admin.js');
app.use('/admin', adminRouter);

// 导入并注册 后台登录 路由模块
const loginRouter = require('./router/login.js');
app.use('/login', loginRouter);

// 错误中间件
app.use(function (err, req, res, next) {
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({ status: 401, message: '身份认证失败！' });
    }
    // 未知错误
    res.send(err);
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})