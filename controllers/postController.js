//帖子的控制器，暴露一系列的中间件方法给到帖子的路由去使用
//引入 PostModel
const PostModel = require('../models/postModel');
const jsonwebtoken = require('jsonwebtoken');
// 查询帖子列表
exports.index = async (req, res) => {
    // 获取前端传递过来分页的数据 pageNum、pageSize 
    const pageNum = parseInt(req.query.pageNum) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    //获取前端传递过来搜索的数据 title
    const title = req.query.title;
    //查询数据库 Model.find().skip((pageNum - 1) * pageSize). limit( pageSize );
    const data = await PostModel.find({title:new RegExp(title)})
        .skip((pageNum - 1) * pageSize)
        .limit( pageSize );

    //前端需要知道一共有多少页 totalPage = Math.ceil(总条数 / 每页显示条数) = Math.ceil(总条数 / paseSize)
    //先计算出总条数
    const total = await PostModel.find({title:new RegExp(title)}).countDocuments();
    const totalPage = Math.ceil(total / pageSize);
    //响应
    res.send({code: 0, msg: "成功", data:{list: data, totalPage}});

};

//创建帖子
exports.create = async (req, res) => {
    /*
        验证token是否存在并有效
        1. 获取传递过来的token query ? body ? param ? 都不行需要从请求头中获取。
        2. 判断token是否存在
    */
    const token = req.get('Authorization');
    if(token) {
        //存在,然后校验token
        jsonwebtoken.verify(token, 'hao', async (err,data) => {
            if(err) {   
                //校验失败
                res.status(401).send('身份校验失败');
            } else{
                //校验成功
                //获取前端传递过来的参数
                const {title, content} = req.body;
                await PostModel.create({title, content});
                res.send({code: 0, msg: "成功"});
            }
        });

    }else {
        //不存在
        res.status(401).send('需要token');
        return;
    }

   
   
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

//帖子详情
exports.show = async (req, res) => {
    //获取id
    const {id} = req.params;

    const data = await PostModel.findOne({_id: id});
    res.send({code: 0, msg: "成功",data});
}