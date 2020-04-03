

$(function(){
    $('#sub-btn').click(async function(){
        let res = await getUserInfo();
        

        $.ajax({
            url:'/users/uppassword',
            type:"post",
            data: {
                userId:res.data._id,
                password: $('#password').val(),
                newPassword: $('#newPassword').val()
            },
            headers:{
                Authorization: Cookies.get('token')
            },
            success: function(res){
                if(res.code === 0){
                    alert('修改成功');
                    Cookies.remove('token');
                    location.href = '/login.html';
                    return;
                }
                alert(res.msg);
                
            }
        })
    })
    
})