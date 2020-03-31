const UserModel = require('../models/userModel');


exports.register = async (req,res) => {
    //获取email
    const {email} = req.body;
    //判断是否已经注册过，做一个查询操作
    const data = await UserModel.findOne({email});
    if(data) {
        //存在，不在允许注册
        res.send({code: -1, msg: "用户已注册"});
        return;
    }
    //不存在，运行注册
    await UserModel.create(req.body);
    res.send({code: 0, msg:"注册成功"});
}
exports.login = async (req,res) => {
    //获取前端传递过来的email与password
    const {email,password} = req.body;
    //查询数据库，email 与 password 能否与数据库中的数据匹配
    const data = await UserModel.findOne({email,password});
    if(!data) {
        res.send({code: -1, msg:"用户邮箱或密码不正确"});
        return;
    }
    res.send({code: 0, msg: "登录成功", data});
}