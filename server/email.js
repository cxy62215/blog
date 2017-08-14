const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: '126',
    auth: {
        user: 'cxy_136793214@126.com',
        pass: 'tian136793214'
    }
})

exports.send = function(to, subject, html, res) {
    const mailOptions = {
        from: '"站长臭咸鱼" <cxy_136793214@126.com>',
        to : to,
        subject : subject,
        html : html
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
            res.status(504).end("通知邮件发送失败")
        } else {
            console.log("Message sent: " + info.response)
        }
    })
}
