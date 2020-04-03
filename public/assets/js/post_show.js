$(function() {
    var result = getID();

 

  // 直接发送ajax请求获取详情数据
  var url = `/posts/${result.id}`;
  $.get(url, function(res) {
    if (res.code === 0) {
      var data = res.data;
      var html = `
        <h1 class="mb-5 font-weight-light">${data.title}</h1>
        <div class="py-4">${data.content}</div>
        <div class="mt-2 text-black-50">
        <small>${data.userId.nickname}</small>
        </div>
        <div class="border-top py-4 mt-4">
       
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a href="./edit.html?id=${result.id}" class="nav-link btn btn-link" id="edit">Edit</a>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-link btn btn-link delete">Delete</a>
            </li>
          </ul>
        </div>
      `;
      $(".container").html(html);
    }
  });

  $('#posts').on('click','.delete',function (){

    if(!isLogined()){
      alert('需要登录');
      return;
    }

    if(!confirm('确认删除吗')) return;

    let url = '/posts/' + result.id;
    $.ajax({
      type:"delete",
      url,
      //请求头加入token
      headers: {
        'Authorization': Cookies.get('token')
      },
      success: function (res){
        if(res.code === 0){
          alert('删除成功');
          location.href = '/post/index.html';
        }
      },
      error: function(msg){
          alert(msg);
          location.href = '/login.html';
      }
    })
  })

});
