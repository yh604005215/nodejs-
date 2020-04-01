const express = require('express');
const multer = require('multer');
const {register,login,getInfo,update} = require('../controllers/userController');
const router = express.Router();
const auth = require('../middlewaares/auth');
const upload = multer({
    dest:'./uploads'
})


/**  
 * @api {post} http://localhost:3000/register 注册
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



/**  
 * @api {post} http://localhost:3000/login 登录 
 * @apiGroup user
 *
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} password  用户密码
 *
 *
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
 * @apiSuccess {String} token token
*/
router.post('/login',login);


/**  
 * @api {get} http://localhost:3000/getInfo 获取当前登录用户的基本信息
 * @apiGroup user
 *
 *
 * @apiParam (Headers) {String} Authorization token
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
 * @apiSuccess {Object} data 当前用户的基本信息
*/

router.get('/getInfo', auth, getInfo);


/**  
 * @api {put} http://localhost:3000/users/update 修改当前用户信息
 * @apiGroup user
 *
 *
 * @apiParam (Headers) {String} Authorization token
 * @apiSuccess {Number} code  错误状态码
 * @apiSuccess {String} msg 错误消息
 * @apiSuccess {Object} data 当前用户的基本信息
*/

router.put('/users/update', auth, upload.single('avatar'), update);
module.exports = router;