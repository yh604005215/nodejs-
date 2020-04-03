$(function(){
    needLogin();
    var result = getID();

    $.ajax({
        url:`/posts/${result.id}`,
        type:'get',
        success: function(data) {
            $('#title').val(data.data.title);
            $('#content').val(data.data.content);
        }
    })
   

    $('#edit-btn').click(function(){
        $.ajax({
            url:`/${result.id}`,
            type:'put',
            data: {
                title: $('#title').val(),
                content: $('#content').val()
            },
            headers: {
                'Authorization': Cookies.get('token')
            },
            success: function(res) {
               if(res.code === 0){
                   alert('修改成功');
                   location.href = `/post/show.html?id=${result.id}`;
                   return;
               }

               alert('失败');
            }
        })
    });
  


});