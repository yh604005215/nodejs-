//帖子的控制器，暴露一系列的中间件方法给到帖子的路由去使用
//引入 PostModel
const PostModel = require('../models/postModel');

// 查询帖子列表
exports.index = async (req, res) => {
    //find
    const data = await PostModel.find();
    res.send({code: 0, msg: "成功", data});

};

//创建帖子
exports.create = async (req, res) => {
    //获取前端传递过来的参数
    const {title, content} = req.body;
    await PostModel.create({title, content});
    res.send({code: 0, msg: "成功"});
   
};

//更新帖子
exports.update = async (req, res) => {
     //要更新的帖子的id
     const {id} = req.params;
        //updateOne  
    await PostModel.updateOne({_id: id}, req.body);
    res.send({code: 0, msg: "成功"});
};

//删除帖子
exports.remove = async (req, res) => {
    //获取id
    const {id} = req.params;
    //deleteOne
    await PostModel.deleteOne({_id:id});
    res.send({code: 0, msg: "成功"});
    
};

