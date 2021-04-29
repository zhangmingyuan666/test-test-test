let baseUrl = 'http://www.rushmc.top/api/';

localStorage.removeItem('username');
localStorage.removeItem('password');
let lg_btn = document.getElementById('login_button');
let re_btn = document.getElementById('register_button');
let submit_answer = document.getElementById('submit_answer'); //登陆失败时的正则表达
let resign_answer = document.getElementById('resign_answer'); //注册失败的正则表达
let x = document.querySelectorAll('input');
let login_check = document.getElementById('login_check');
let oRemember = document.getElementById('remember');
let usernames = document.getElementById('lg_username');
let passwords = document.getElementById('lg_password');
let register_check = document.getElementById('register_answer');
let re_username = document.getElementById('re_username');
let re_password = document.getElementById('re_password');
let re_phone = document.getElementById('re_phone');
let re_name = document.getElementById('re_name');
lg_btn.onclick = function() {
    let data = new FormData()

    data.append('username', document.getElementById('lg_username').value);
    data.append('password', document.getElementById('lg_password').value);

    let xhr_lg = new XMLHttpRequest();
    xhr_lg.open("POST", baseUrl + 'login', true);

    xhr_lg.send(data);

    xhr_lg.onreadystatechange = function() {
        if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
            let res = JSON.parse(xhr_lg.responseText);
            console.log(res);
            if (res.code === 200) {
                localStorage.setItem('username', document.getElementById('lg_username').value);
                localStorage.setItem('password', document.getElementById('lg_password').value);

                console.log(res.msg)
                console.log('password:' + res.data.password);

                login_check.style.color = 'green';
                login_check.innerHTML = '登录成功<img src="img/圆形选中-fill.png" alt="">';
                window.location.href = 'user.html';
            } else {
                console.log(res.msg);
                let usernames = document.getElementById('lg_username');
                let passwords = document.getElementById('lg_password');
                lg_btn.style.border = '#FF0000 2px solid';
                lg_btn.style.backgroundColor = 'rgba(225,0,0,0.3)';
                login_check.style.color = 'red';
                if (usernames.value == '' && passwords.value == '') {
                    login_check.innerHTML = '请输入账号密码，登陆失败<img src="img/关闭2-fill.png" alt="">';
                } else if (usernames.value == '') {
                    login_check.innerHTML = '请输入账号，登陆失败<img src="img/关闭2-fill.png" alt="">';
                } else if (passwords.value == '') {
                    login_check.innerHTML = '请输入密码，登陆失败<img src="img/关闭2-fill.png" alt="">';
                } else {
                    login_check.innerHTML = '账号或密码错误，登陆失败<img src="img/关闭2-fill.png" alt="">';
                }
            }
        }
    }
}


//当注册按钮被点击时 
re_btn.onclick = function() {
    let data = new FormData();

    data.append("username", document.getElementById('re_username').value);
    data.append("password", document.getElementById('re_password').value);
    data.append("phone", document.getElementById('re_phone').value);
    data.append("name", document.getElementById('re_name').value);


    let xhr_re = new XMLHttpRequest();

    xhr_re.open("POST", baseUrl + 'register', true);
    xhr_re.send(data);

    xhr_re.onreadystatechange = function() {
        if (xhr_re.readyState === 4 && xhr_re.status === 200) {

            let res = JSON.parse(xhr_re.responseText);


            if (res.code === 200) {
                console.log(res.msg);
                register_check.style.color = "green";
                register_check.innerText = '注册成功<img src="img/圆形选中-fill.png" alt="">';
                re_btn.style.color = 'whitesmoke';
                re_btn.style.border = '2px green solid';
                re_btn.style.background = 'rgba(0,255,0,0.3)';
                re_btn.disabled = 'disabled';
            } else {
                console.log(res.msg);
                re_btn.style.border = '#FF0000 2px solid';
                re_btn.style.backgroundColor = 'rgba(225,0,0,0.3)'
                register_check.style.color = 'red';
                if (re_name.value == '' || re_password.value == '' || re_phone.value == '' || re_username == '') {
                    register_check.innerHTML = '请将信息输入完全后再进行登录，登陆失败<img src="img/关闭2-fill.png" alt="">';
                } else {
                    register_check.innerHTML = '该账号已经被注册过了<img src="img/关闭2-fill.png" alt="">';
                }
            }
        }
    }
}