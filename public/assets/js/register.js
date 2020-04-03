$(function() {
    let ms = 300;
    let timer;
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
        clearInterval(timer);
        countDown();
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
    });

    function countDown(){
        if(Cookies.get('time')){
            $('#code-btn').css(`background`,'#333');
            ms = Cookies.get('time');
            timer = setInterval(()=>{
                if(ms <= 0){
                    Cookies.remove('time');
                    $('#code-btn').text(`发送`);
                    $('#code-btn').css(`background`,'#007bff');
                    clearInterval(timer);
                    return;
                }
                
                ms--;
                Cookies.set('time',ms);
                $('#code-btn').text(ms);
            },1000)
        } else{
            Cookies.set('time',ms);
        }
    }
    countDown();
});