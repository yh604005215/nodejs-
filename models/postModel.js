//帖子模型文件

//引入已经连接到MongoDB 的 mongoose
const mongoose = require('../confug/db');

// 定义 schema
const postSchema = new mongoose.Schema({
    //type：类型  required：true 必填项
    title:{type:String, required: true},
    content:{type:String, required: true},
    //用户id，关联的是user 集合 但在mongoose中，不说集合说模型
    //type固定用ObjectID， type: mongoose.SchemaTypes.ObjectId || type: mongoose.Schema.Types.ObjectId
    userId: {type: mongoose.SchemaTypes.ObjectId, ref:"user",required: true}

},{
    //timestamps: true ,会多出两个字段 createdAt updatedAt
    timestamps: true
});

//创建模型
const PostModel = mongoose.model('post', postSchema);

//暴露PostModel
module.exports = PostModel;