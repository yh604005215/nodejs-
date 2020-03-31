const mongoose = require('../confug/db');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type:String, 
        required:true,
        validate:{
            //效验的函数，接受的v是传递的值
            validator: function (v){
                //返回的是布尔值
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
            },
            //校验失败
            message:"请输入正确的邮箱"
        }
    },
    password:{ 
        type:String,
        required:true
    },
    //用户昵称设置默认没空
    nickname:{ type:String,
        default:""
    }
},{
    timestamps: true
});

//可以提供一些钩子函数，（在一些特定的操作的时候会自动执行的函数）
//下面这和代码会在Model.create()也就是新创建一个UserModel实例的时候会执行callback
//callback注意不要写成箭头函数，不然this指向会出问题
userSchema.pre('save', function (next){
    //对this.password加密之后，再赋值
    this.password = bcryptjs.hashSync(this.password,10);
    next();
});
//给 UserModel 的实例 （document）用户添加一个实例方法
userSchema.methods.comparePassword = function (password){
    //bcryptjs.compareSync(原密码,加密后的密码);
    return bcryptjs.compareSync(password,this.password);
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;