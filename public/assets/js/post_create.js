$(function() {
    //判断是否登录
    needLogin();

    $('#create-post').click(function(){
        $.ajax({
            url:'/posts',
            type:"post",
            data: {
                title:$('#title').val(),
                content:$('#content').val() 
            },
            //请求头加入token
            headers: {
                'Authorization': Cookies.get('token')
            },
            success:function (data){
                if(data.code !== 0){
                    alert('您的网络有问题亲');
                    console.log(data);
                    
                }else {
                    alert('创建成功');
                    location.href = './index.html';
                }
            }
            
        })
    })
});