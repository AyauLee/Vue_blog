const express = require('express');
// 创建路由对象
const router = express.Router();
const Artcate = require('../models/Artcate'); // 文章分类
const Article = require('../models/Article'); // 文章
const Links = require('../models/Links'); // 链接
const Message = require('../models/Message'); // 建议
const Picture = require('../models/Picture'); // 照片
const Visitor = require('../models/Visitor'); // 访问者
const Mailcode = require('../models/Mailcode'); // 邮箱验证码
// 导入解析 formdata 格式表单数据的包
const multer = require('multer');
// 导入处理路径的核心模块
const path = require('path');
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') });
// 引入发送邮件
const sendMails = require('../plugins/email');
const moment = require('moment')

// 获取文章分类
router.get('/artcate', async (req, res) => {
    let data = await Artcate.find({});
    res.send(data);
})
// 获取最新文章（前五条）
router.get('/article/new', async (req, res) => {
    let data = await Article.find({}, 'title introduction cover tags date author').sort({ _id: -1 }).limit(5);
    res.send(data);
})
// 获取所有文章归档
router.get('/article/archive', async (req, res) => {
    let timecates = await Article.distinct("timecate");
    let data = [];
    for (let i = 0; i < timecates.length; i++) {
        let docs = await Article.find({ timecate: timecates[i] }, 'title introduction cover tags date author').sort({ date: -1 });
        data.unshift({ timecate: timecates[i], docs });
    }
    res.send(data);
})
// 根据标签名获取文章列表
router.get('/article/artbytag', async (req, res) => {
    let data = await Article.find({ tags: { $all: [req.query.tag] } }, 'title introduction cover tags date author').sort({ date: -1 })
    res.send(data)
})
// 根据_id获取文章内容
router.get('/article/artbyid', async (req, res) => {
    let data = await Article.findById(req.query.id);
    res.send(data);
})

// 获取链接
router.get('/getlinks', async (req, res) => {
    let linkcates = await Links.distinct("cate");
    let data = [];
    for (let i = 0; i < linkcates.length; i++) {
        let docs = await Links.find({ cate: linkcates[i] });
        data.unshift({ cate: linkcates[i], docs });
    }
    res.send(data);
})
// 获取图片一级分页信息
router.get('/picture', async (req, res) => {
    let pagenum = req.query.pagenum - 0 || 1;
    let confine = 5;
    let total = await Picture.find({}).count();
    let totalPages = Math.ceil(total / confine);
    let data = await Picture.find({}).sort({ _id: -1 }).limit(confine).skip((pagenum - 1) * confine);
    res.send({ total, data, pageNo: pagenum, totalPages });
})
// 存储访问者信息
router.post('/visitor/submitinfo', upload.single('data'), (req, res) => {
    let data = { ...req.body };
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    Visitor.create({ date, ...data }, (err, result) => {
        if (result) {
            return res.send({ status: 0, message: 'ok' })
        } else {
            res.send({ status: 1, message: 'No' });
        }
    })
})
// 发送邮箱验证码
let mailTimes = {};
router.get('/authcode', (req, res) => {
    let email = req.query.email;
    if (mailTimes[email]) { // 清除定时器
        clearTimeout(mailTimes[email]);
        mailTimes[email] = null;
    }
    let code = parseInt(Math.random() * 1000000) // 随机验证码
    let text = `  验证码：${code}，该验证码5分钟内有效。为了保障您的账户安全，请勿向他人泄漏验证码信息。`
    sendMails(req.query.email, text).then(async () => {
        let result = await Mailcode.find({ email });
        let modifiedCount = 0;
        if (result.length >= 1) {
            let data = await Mailcode.updateOne({ email }, { $set: { code } });
            modifiedCount = data.modifiedCount;
        } else {
            let data = await Mailcode.create({ email, code });
            data ? modifiedCount = 1 : '';
        }
        if (modifiedCount) { // 开启定时器，验证码有效期5分钟
            mailTimes[email] = setTimeout(() => {
                Mailcode.updateOne({ email }, { $set: { code: '' } }, (err) => {
                    if (!err) {
                        clearTimeout(mailTimes[email]);
                        mailTimes[email] = null;
                    }
                });
            }, 300000)
        }
        res.send({ status: 0, message: '验证码已发送！' })
    }).catch((err) => {
        res.send({ status: 1, message: '验证码发送失败！' });
    })
})
// 提交留言
router.post('/message', upload.single('data'), async (req, res) => {
    let { code, ...data } = req.body;
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    if (code) {
        let codeDoc = await Mailcode.find({ email: data.email, code });
        if (codeDoc.length < 1) {
            return res.send({ status: 1, message: '无效的验证码！' })
        } else {
            Message.create({ date, ...data }, (err, result) => {
                if (result) return res.send({ status: 0, message: '留言成功！' })
            })
        }
    } else {
        res.send({ status: 1, message: '提交失败！' });
    }
})



module.exports = router;