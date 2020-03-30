//post路由文件

//引入 express
const express = require('express');

//生成 express.Router 的实例
const router = express.Router();
//引入 postController
const {index,create,update,remove} = require('../controllers/postController');


/**
 * @api {get} http://localhost:3000/posts 获取帖子列表
 * @apiName index
 * @apiGroup Post
 *
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
 * @apiSuccess {Array} data 帖子数组信息
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
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
*/
//POST / posts
router.post('/', create);


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





//暴露 router的实例

module.exports = router;