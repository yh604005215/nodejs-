const UserModel = require('../models/userModel');
const path = require('path');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');

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
    const data = await UserModel.findOne({email});
     //校验密码是否正确 bcryptjs
    if(!data || !data.comparePassword(password)) {
        res.send({code: -1, msg:"用户邮箱或密码不正确"});
        return;
    }
    
    //生成token
    const token =jsonwebtoken.sign({
        //将一些用户角色信息 用户id、和一些不敏感的信息传入,不要写太多
        userId:data._id,
        nickname:data.nickname
    },"hao",{
        expiresIn: "2h"
    });
    res.send({code: 0, msg: "登录成功", token});
}

exports.getInfo = async (req,res) => {
    //获取用户id，通过req.auth
    const {userId} = req.auth;
    //查询数据库
    const data  = await UserModel.findOne({_id:userId},{password:0});

    //响应
    res.send({code:0,msg:"成功",data});
}

exports.update = async  (req,res) => {
    //获取用户id
    const {userId} = req.auth;
    //定义一个后续修改的对象
    let updateData = {};
    //判断是否有传递头像过来
    if(req.file.path)  {
        //获取头像
        //定义newFilename  与 newFilePath
        const newFilename = `${req.file.filename}-${req.file.originalname}`;
        const newFilepath = path.resolve(__dirname, "../public",newFilename);

        //读文件
        const fileData = fs.readFileSync(req.file.path);

        //写文件
        fs.writeFileSync(newFilepath,fileData);

        //给updateData  中设置  avatar
        updateData.avatar = `http://localhost:3000/${newFilename}`;
    }
    //修改数据库
    const data = await UserModel.updateOne({_id: userId}, updateData);
    //响应
    res.send({code:0,msg:"成功",data});
}