$(function(){

    getUserInfo().then(res => {
        $('#my-email').val(res.data.email);
        $('#myavatar').attr('src',res.data.avatar);
    
    });
    
    

   

    $('#sub-btn').click(function (){
        let formData  = new FormData();
        formData.append('avatar',$('#myfile')[0].files[0]);
        $.ajax({
            url: 'http://localhost:3000/users/update',
            type:'put',
            data:formData,
            headers:{
                Authorization: Cookies.get('token')
            },
            processData:false,//jquery的ajax要设置
            contentType:false, //jquery的ajax要设置
            success: function(res){
                if(res.code === 0){
                    alert('修改成功');
                    location.reload();
                }
                
            }
        });
    })
});


function changepic() {
     
    let formData = new FileReader();
    let data = ($('#myfile')[0].files[0]);
    formData.readAsDataURL(data);
    formData.onload = function() {
        $('#myavatar').attr('src',this.result);
    };

}
