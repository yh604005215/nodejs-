const express = require('express');
console.log(require('../controllers/postController'));

const {register,login} = require('../controllers/userController');
const router = express.Router();

/**  
 * @api {post} http://localhost:3000/register 注册
 * @apiName register
 * @apiGroup user
 *
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} password  用户密码
 * @apiParam {String} nickname  用户密码<可选>
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
*/

router.post('/register',register);

router.post('/login',login);

module.exports = router;