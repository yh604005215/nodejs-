
const nodemailer = require("nodemailer");
  // 创建邮件发送的对象
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '1136821368@qq.com', // 发送方的邮箱地址
      pass: 'oghgdbzkkqhggidc' // mtp验证码
    }
  });

//   // send mail with defined transport object
//   let mailobj = {
//     from: '"Fred Foo 👻" 1136821368@qq.com', // sender address
//     to: "1136821368@qq.com", // list of receivers
//     subject: "帖子列表注册", // Subject line
//     text: `您的验证码是hao, 有效期5分钟` // plain text body
//   };


send = async (email,code) =>{
    let mailobj = {
        from: '"Fred Foo 👻" 1136821368@qq.com', // sender address
        to: email, // list of receivers
        subject: "帖子列表注册", // Subject line
        text: `您的验证码是${code},有效期5分钟` // plain text body
    };
    
    //发送邮件
    
    await transporter.sendMail(mailobj);

}

module.exports = {send};
