$(function() {
    $('#register-btn').on('click', function(){
        $.ajax({
            type:'post',
            url:'/register',
            data:{
                email:$('#inputEmail').val(),
                password:$('#inputPassword').val(),
                nickname:$('#inputname').val(),
                eCode:$('#inputCode').val(),
                time: getNowTime()
            },
            success: function(data){
                if(data.code !== 0) {
                    alert(data.msg);
                    return;
                }
                alert('注册成功');
                location.href = '/login.html';
            }
        })
    });

    $('#code-btn').click(function(){
        $.ajax({
            type:'post',
            url:'/emailCode',
            data:{
                email:$('#inputEmail').val(),
                time: getNowTime()
            },
            success: function(data){
                if(data.code !== 0) {
                    alert(data.msg);
                    return;
                }
        
            }
        })
    })
});