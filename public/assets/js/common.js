$(function() {
   
    renderNavbar();
}) 




function renderNavbar (){
     //判断是否在登录状态
    //登录成功之后将 token 信息写入cookie 中 从cookie中获取 token 来判断是否登录
    var html = '';
    if(Cookies.get('token')){
        html = `
        <li class="nav-item">
        <a href="/post/create.html" class="nav-link">
          <i class="fas fa-plus"></i>
        </a>
      </li>
      <li class="nav-item dropdown">
        <a href="javascript:;" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
          <img src="/assets/img/avatar.png" class="rounded" width="30" height="30" alt="" />
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="/user/settings/profile/edit.html">Profile</a>
          <a class="dropdown-item" href="/user/settings/password/edit.html">Settings</a>
          <div class="dropdown-divider"></div>
          <button id="logout-btn" class="dropdown-item" type="submit">Logout</button>
        </div>
      </li>
        `;
    } else{
        //不存在
        html = `
        <li class="nav-item">
        <a href="/post/create.html" class="nav-link">
          <i class="fas fa-plus"></i>
        </a>
      </li>
        <li class="nav-item">
        <a class="nav-link" href="/login.html">login</a>
      </li>
      
        `
    }

    $('#nav-right').html(html);

    $('#nav-right').on('click', '#logout-btn',function(){
        //删除cookie
        Cookies.remove('token');
        location.href = '/post/index.html';
    });
}

//判断是否登录
function isLogined (){
    return Cookies.get('token');
}

function needLogin(){
    if(!isLogined()){
        //没有登录
        alert(('需要登录'));
        location.href = '/login.html';
    }
}