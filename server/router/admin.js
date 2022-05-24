const express = require('express');
// 创建路由对象
const router = express.Router();
const User = require('../models/User'); // 用户
const Artcate = require('../models/Artcate'); // 文章分类
const Article = require('../models/Article'); // 文章
const Links = require('../models/Links'); // 链接
const Message = require('../models/Message'); // 留言
const Picture = require('../models/Picture'); // 照片
const Visitor = require('../models/Visitor'); // 访问者
// 引入发送邮件
const sendMails = require('../plugins/email');
// 引入格式化时间
let moment = require('moment');


// 导入操作文件的模块
const fs = require('fs');
// 导入解析 formdata 格式表单数据的包
const multer = require('multer');
// 导入处理路径的核心模块
const path = require('path');
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// 定义验证是否超级管理员的局部中间件
const isAdmin = async (req, res, next) => {
    if (req.headers.isadmin == 'superAdmin') {
        next();
    } else { // 无权限
        res.cc('收手吧阿祖！外面全是成龙！')
    }
}

// 更新资源
router.post('/file/upload', upload.single('image'), async (req, res) => {
    const url = `http://127.0.0.1:3007/uploads/${req.file.filename}`
    res.send(url)
})
// 删除资源
router.post('/file/delete', isAdmin, async (req, res) => {
    let filename = path.basename(req.query.url);
    let filepath = path.join(__dirname, '../uploads/', filename);
    fs.unlink(filepath, (err) => {
        if (!err) res.cc('删除图片成功！', 0);
    })
})

// 获取链接列表
router.get('/getlinks', async (req, res) => {
    let linkcates = await Links.distinct("cate");
    let data = [];
    for (let i = 0; i < linkcates.length; i++) {
        let docs = await Links.find({ cate: linkcates[i] });
        data = data.concat(docs)
    }
    res.send(data)
})
// 新增或更新链接
router.post('/updatelink', isAdmin, async (req, res) => {
    let { title, url, cate, _id } = JSON.parse(req.query.linkdoc);
    if (!_id) {
        let result = await Links.create({ title, url, cate });
        result ? res.cc('添加链接成功！', 0) : res.cc('添加失败！');
    } else {
        let result = await Links.updateOne({ _id }, { $set: { title, url, cate } });
        result.modifiedCount == 1 ? res.cc('更新链接成功！', 0) : res.cc('更新失败！');
    }
})
// 删除链接
router.post('/deletelink', isAdmin, async (req, res) => {
    let result = await Links.deleteOne({ _id: req.query._id });
    result.deletedCount == 1 ? res.cc('删除链接成功！', 0) : res.cc('删除失败！');
})
// 获取文章分类
router.get('/artcate/getlist', async (req, res) => {
    let cate = await Artcate.find({});
    let newcate = [];
    for (let i = 0; i < cate.length; i++) {
        let { _id, catename, ctype } = cate[i];
        let count = await Article.find({ tags: { $all: [catename] } }).count()
        newcate.push({ _id, catename, ctype, count })
    }
    res.send(newcate)

})
// 更新文章分类
router.post('/artcate/update', isAdmin, async (req, res) => {
    let { catename, ctype, _id } = JSON.parse(req.query.catedoc);
    let iscate = await Artcate.find({ catename }).count();
    if (!_id) {
        if (iscate == 0) {
            Artcate.create({ catename, ctype }, (err, result) => {
                err && res.cc('操作失败！');
                result && res.cc('添加分类成功！', 0);
            });
        } else {
            res.cc('该分类已存在！');
        }
    } else {
        let tag = await Artcate.findById(_id);
        let artcount = await Article.find({ tags: { $all: [tag.catename] } }).count();
        if (artcount == 0 || catename == tag.catename) {
            let result = await Artcate.updateOne({ _id }, { $set: { catename, ctype } });
            result.modifiedCount == 1 ? res.cc('更新分类成功！', 0) : res.cc('更新分类失败！');
        } else {
            res.cc('该标签下有所属文章，暂无法改动！')
        }

    }
})
// 删除文章分类
router.post('/artcate/delete', isAdmin, async (req, res) => {
    let result = await Artcate.deleteOne({ _id: req.query._id });
    result.deletedCount == 1 ? res.cc('删除分类成功！', 0) : res.cc('操作失败！');
})
// 获取文章列表
router.get('/article/getList', async (req, res) => {
    let data = await Article.find({});
    res.send(data);
})
// 根据ID获取文章
router.get('/article/artbyid', async (req, res) => {
    let data = await Article.findById(req.query._id);
    res.send(data);
})
// 更新文章
router.post('/article/update', isAdmin, upload.single('data'), async (req, res) => {
    let { _id, ...data } = req.body;
    let date = moment().format('YYYY-MM-DD');
    data.tags = data.tags.split('@');
    let istitle = await Article.find({ title: data.title }).count();
    if (!_id) { // 没有id，添加文章
        if (istitle == 0) {
            Article.create({ date, timecate: date.slice(0, 7), ...data }, (err, result) => {
                err ? res.cc('添加文章失败！') : res.cc('添加文章成功！', 0);
            });
        } else {
            res.cc('文章标题重复！')
        }
    } else { // 有id，更新文章
        let mached = await Article.find({ _id: _id, title: data.title }).count();
        if (mached == 1 || istitle == 0) {
            Article.updateOne({ _id }, { $set: { ...data } }, (err, result) => {
                if (err) return res.cc('更新失败！');
                result.modifiedCount == 0 && res.cc('文章无改动！');
                result.modifiedCount == 1 && res.cc('更新文章成功！', 0);
            });
        } else {
            res.cc('修改后的标题重复！');
        }
    }
})
// 删除文章
router.post('/article/delete', isAdmin, async (req, res) => {
    let result = await Article.deleteOne({ _id: req.query._id });
    if (result.deletedCount == 1) {
        return res.cc('删除成功！', 0);
    } else {
        return res.cc('操作失败！');
    }

})
// 获取照片墙
router.get('/picture/getlist', async (req, res) => {
    let pagenum = parseInt(req.query.pagenum) || 1;
    let confine = 24;
    let total = await Picture.find({}).count();
    let totalPages = Math.ceil(total / confine);
    let data = await Picture.find({}).limit(confine).skip((pagenum - 1) * confine);
    res.send({ total, data, pageNo: pagenum, totalPages });
})
// 更新照片墙
router.post('/picture/updateinfo', isAdmin, upload.single('data'), async (req, res) => {
    let { _id, ...data } = req.body;
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    if (_id) {
        let result = await Picture.updateOne({ _id }, { $set: { date, ...data } });
        result.modifiedCount > 0 ? res.cc('更新成功！', 0) : res.cc('信息无修改！');
    } else {
        let result = await Picture.create(data);
        result && res.cc('添加成功！', 0)
    }
})
// 根据id删除照片信息
router.post('/picture/deleteByid', isAdmin, async (req, res) => {
    let result = await Picture.deleteOne({ _id: req.query._id });
    result.deletedCount == 1 ? res.cc('删除成功！', 0) : res.cc('删除失败！');
})
// 获取留言列表
router.get('/message/getlist', async (req, res) => {
    let data = await Message.find({}, 'name email message date status reply replydate _id').sort({ date: -1 });
    if (req.headers.isadmin != 'superAdmin') {
        for (let i = 0; i < data.length; i++) {
            data[i].email = '暂无权限查看！'
        }
    }
    res.send(data);
})
// 回复留言
router.post('/message/reply', isAdmin, upload.single('data'), (req, res) => {
    let { _id, name, email, message, date, reply } = req.body;
    let replydate = moment().format('YYYY-MM-DD HH:mm:ss');
    let subject = '回复留言'
    let html = `<div style="width: 600px;margin: 0 auto">
    <h2>${name},你好！很高兴能收到你的留言！</h2>
    <h3>关于你${date}在AyauLee博客的留言：</h3>
    <p style:"text-indent: 30px">${message}</p>
    <hr/>
    <h3>现回复如下：</h3>
    <p style:"text-indent: 30px">${reply}</p>

    <p style="text-align: right">AyauLee</p>
    <p style="text-align: right">${replydate}</p></div>`
    sendMails(email, '', subject, html).then(() => {
        Message.updateOne({ _id }, { $set: { status: '已回复', reply, replydate } }, (err) => {
            if (!err) res.cc('回复成功！', 0);
        });
    }).catch(() => { })
})
// 删除留言
router.get('/message/delete', isAdmin, async (req, res) => {
    let result = await Message.deleteOne({ _id: req.query._id });
    result.deletedCount == 1 ? res.cc('删除留言成功！', 0) : res.cc('删除留言失败！');
})
// 获取首页概览信息
router.get('/homeinfo', async (req, res) => {
    let now = moment().format('YYYY-MM-DD');
    let regmonth = new RegExp('^' + now.slice(0, 7));
    let regtoday = new RegExp('^' + now);
    let totalVisit = await Visitor.find({}).count(); // 总访问量
    let monthVisit = await Visitor.find({ date: regmonth }).count(); // 本月访问量
    let todayVisit = await Visitor.find({ date: regtoday }).count(); // 今日访问量
    let monthArticle = await Article.find({ date: regmonth }).count(); // 本月新增文章
    let monthPicture = await Picture.find({ date: regmonth }).count(); // 本月新增照片
    let noReply = await Message.find({ status: '待回复' }).count(); // 待回复留言数
    res.send([
        { title: '总访问量', count: totalVisit },
        { title: '本月访问量', count: monthVisit },
        { title: '今日访问量', count: todayVisit },
        { title: '本月新增文章', count: monthArticle },
        { title: '本月新增照片', count: monthPicture },
        { title: '待回复留言数', count: noReply },
    ])
})
// 获取文章字数统计信息
router.get('/home/artcount', async (req, res) => {
    let timecates = await Article.distinct("timecate");
    let data = [];
    for (let i = 0; i < timecates.length; i++) {
        let docs = await Article.find({ timecate: timecates[i] }, 'body -_id');
        let count = 0;
        for (let j = 0; j < docs.length; j++) {
            count += docs[j].body.length;
        }
        data.push({ timecate: timecates[i], count });
    }
    res.send(data);
})
// 获取用户信息
router.get('/user', (req, res) => {
    let userid = req.query.userid;
    User.findById(userid, (err, data) => {
        if (err) return res.cc('获取信息失败')
        res.send(data);
    });
})
// 修改用户头像
router.post('/user/avatar', (req, res) => {
    let { _id, avatar, newurl } = req.query;
    if (avatar) {
        let filename = path.basename(avatar);
        let filepath = path.join(__dirname, '../uploads/', filename);
        fs.unlink(filepath, () => { })
    }
    User.updateOne({ _id }, { $set: { avatar: newurl } }, (err, result) => {
        if (result.modifiedCount == 1) {
            return res.cc('更新成功！', 0)
        } else {
            res.cc('更新失败！');
        }
    })
})
// 修改用户昵称和性别
router.post('/user/upinfo', async (req, res) => {
    let { _id, nickname, gender } = req.body
    if (_id) {
        let result = await User.updateOne({ _id }, { $set: { nickname, gender } })
        result.modifiedCount > 0 ? res.cc('更新成功！', 0) : res.cc('信息无修改！');
    } else {
        res.cc('操作失败！')
    }
})
// 获取访问者地区分布
router.get('/visitor', async (req, res) => {
    let areas = await Visitor.distinct("area");
    let initData = [
        { name: "河北", value: 0 },
        { name: "山西", value: 0 },
        { name: "辽宁", value: 0 },
        { name: "吉林", value: 0 },
        { name: "黑龙江", value: 0 },
        { name: "江苏", value: 0 },
        { name: "浙江", value: 0 },
        { name: "安徽", value: 0 },
        { name: "福建", value: 0 },
        { name: "江西", value: 0 },
        { name: "山东", value: 0 },
        { name: "河南", value: 0 },
        { name: "湖北", value: 0 },
        { name: "湖南", value: 0 },
        { name: "广东", value: 0 },
        { name: "海南", value: 0 },
        { name: "四川", value: 0 },
        { name: "贵州", value: 0 },
        { name: "云南", value: 0 },
        { name: "陕西", value: 0 },
        { name: "甘肃", value: 0 },
        { name: "青海", value: 0 },
        { name: "台湾", value: 0 },
        { name: "内蒙古", value: 0 },
        { name: "广西", value: 0 },
        { name: "西藏", value: 0 },
        { name: "宁夏", value: 0 },
        { name: "新疆", value: 0 },
        { name: "北京", value: 0 },
        { name: "天津", value: 0 },
        { name: "上海", value: 0 },
        { name: "重庆", value: 0 },
        { name: "香港", value: 0 },
        { name: "澳门", value: 0 },
    ];
    for (let i = 0; i < areas.length; i++) {
        if (areas[i] == 'CHINA' || areas[i] == '') {
            continue;
        }
        let value = await Visitor.find({ area: areas[i] }).count();
        for (let j = 0; j < initData.length; j++) {
            if (areas[i].indexOf(initData[j].name, 0) != -1) {
                initData[j].value += value;
                break;
            }
        }
    }
    res.send(initData);
})




module.exports = router;