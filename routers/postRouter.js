//post路由文件

//引入 express
const express = require('express');

//生成 express.Router 的实例
const router = express.Router();
//引入 postController
const {index,create,update,remove} = require('../controllers/postController');

//GET/  posots
router.get('/', index);


//POST / posts
router.post('/', create);

// PUT / posts/:id
router.put('/:id', update);

//DELETE /posts/:id
router.delete('/:id', remove);



//暴露 router的实例

module.exports = router;