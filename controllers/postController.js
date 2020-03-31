//帖子的控制器，暴露一系列的中间件方法给到帖子的路由去使用
//引入 PostModel
const PostModel = require('../models/postModel');

// 查询帖子列表
exports.index = async (req, res) => {
    // 获取前端传递过来分页的数据 pageNum、pageSize 
    const pageNum = parseInt(req.query.pageNum) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    //获取前端传递过来搜索的数据 title
    const title = req.query.title;
    //查询数据库 Model.find().skip((pageNum - 1) * pageSize). limit( pageSize );
    //populate中文意思叫填充，接受的userId 是 PostModel 的 schema 中定义的一个字段名字
    //并且这个userId字段关联的是user模型 所以这块会将userId填充为对应的用户信息
    const data = await PostModel.find({title:new RegExp(title)})
        .populate('userId', 'nickname')
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
    //取出req.auth中的userId 
    const {userId} = req.auth;
    
    req.body.userId = userId;
    
    await PostModel.create(req.body);
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

//帖子详情
exports.show = async (req, res) => {
    //获取id
    const {id} = req.params;

    const data = await PostModel.findOne({_id: id})
    .populate('userId',['nickname','email']);
    res.send({code: 0, msg: "成功",data});
}