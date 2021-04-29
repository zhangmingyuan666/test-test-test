let lgArea = document.getElementById('login-area');
let reArea = document.getElementById('register-area');
let lgShow = document.querySelector('.login-box');
let reShow = document.querySelector('.register-box');



//切换到登录页面
lgArea.onclick = function() {
    lgShow.style.display = 'block';
    reShow.style.display = 'none';
}


//切换到注册页面
reArea.onclick = function() {
    reShow.style.display = 'block';
    lgShow.style.display = 'none';
}