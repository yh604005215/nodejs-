//post路由文件

//引入 express
const express = require('express');

//生成 express.Router 的实例
const router = express.Router();
//引入 postController
const {index,create,update,remove,show} = require('../controllers/postController');
const auth = require('../middlewaares/auth');


/**
 * @api {get} http://localhost:3000/posts 获取帖子列表
 * @apiName index
 * @apiGroup Post
 *
 * @apiParam {String} pageNum=1 页码<可选>
 * @apiParam {String} pageSize=2 每页显示条数<可选>
 * @apiParam {String} title 搜索关键字<可选>
 * 
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
 * @apiSuccess {Object} data 数据
 * @apiSuccess {Array} data[list] 帖子数据
 * @apiSuccess {Number} data[totalPage] 总页数
*/
//GET/  posots
router.get('/', index);

/**
 * @api {post} http://localhost:3000/posts 创建一个帖子
 * @apiName create
 * @apiGroup Post
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content  帖子内容
 * @apiParam (Headers) {String} Authorization token
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
*/
//POST / posts
router.post('/', auth, create);


/**
 * @api {put} http://localhost:3000/posts/:id 更新帖子
 * @apiName update
 * @apiGroup Post
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content  帖子内容
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
*/

// PUT / posts/:id
router.put('/:id', update);


/**
 * @api {delete} http://localhost:3000/posts/:id 删除帖子
 * @apiName remove
 * @apiGroup Post
 *
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
*/

//DELETE /posts/:id
router.delete('/:id', remove);


/**
 * @api {get} http://localhost:3000/posts/:id 帖子详情页
 * @apiGroup Post
 *
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
*/

router.get('/:id', show);

//暴露 router的实例

module.exports = router;