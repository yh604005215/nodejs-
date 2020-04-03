$(function() {
    $('#login-btn').on('click', function(){

        $.ajax({
            type:'post',
            url:'/login',
            data:{
                email:$('#inputEmail').val(),
                password:$('#inputPassword').val()
            },
            success: function(data){
                if(data.code !== 0) {
                    alert(data.msg);
                    return;
                }
                //登录成功
                Cookies.set('token', data.token);

                location.href = '/post/index.html';
            }
        })
    });
});