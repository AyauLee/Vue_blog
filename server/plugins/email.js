const nodemailer = require('nodemailer')

let sendMails = (mailAddress, text, subject = 'AyauLee博客留言验证码', html = '') => {
    // 创建发送邮件的对象
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com', // 发送方邮箱 qq 通过lib/wel-konw
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'xxx', // 发送方邮箱地址
            pass: 'xxx' // mtp 验证码 这个有了才可以发送邮件，可以qq邮箱去查看自己的码
        }
    });
    //设置收件人信息
    let mailOptions = {
        from: 'user<邮箱地址>', //谁发的
        to: mailAddress, //发给谁
        subject,  //主题是什么
        text, //文本内容
        html,//html模板
        // attachments: [  //附件信息,如果需要了再打开使用
        //     {
        //         filename: '',
        //         path: '',
        //     }
        // ]
    };
    return new Promise((resolve, reject) => {       //异步函数
        //发送邮件
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)       //错误
            } else {
                resolve(info)
                // console.log(`信息id   Message: ${info.messageId}`);  
                // console.log(`成功响应 sent: ${info.response}`); 
                // console.log(`邮件信息 mailOptions: ${JSON.stringify(mailOptions)}`); 
            }
        });
    })
}

// export default sendMails  暴露出去
module.exports = sendMails;
