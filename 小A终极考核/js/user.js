var oInf = document.getElementById("All_inf")
var head = document.getElementById('head');
var oChangehead = document.getElementById('btn_mouseout');
var head = document.getElementById('head');

//此处用于登录并返回身份信息
window.onload = function() {
    let data = new FormData()

    data.append('username', localStorage.getItem('username'));
    data.append('password', localStorage.getItem('password'));

    let xhr_lg = new XMLHttpRequest();
    xhr_lg.open("POST", baseUrl + 'login', true);

    xhr_lg.send(data);

    xhr_lg.onreadystatechange = function() {
        if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
            let res = JSON.parse(xhr_lg.responseText);
            console.log(res);
            if (res.code === 200) {
                console.log(res.msg)
                console.log('password:' + res.data.password);
                oInf.innerHTML = 'id:' + res.data.id + "       username:" + res.data.username + '      phone: ' + res.data.phone;
                head.src = basicUrl + res.data.photo;
                localStorage.removeItem('userId');
                localStorage.setItem('userId', res.data.id);

            } else {
                console.log(res.msg);
            }
        }
    }
}


//此处用于更换头像
var changehead = document.getElementById('changehead');
console.log(changehead);
changehead.onchange = function() {
    var that = this;
    console.log(that.files[0].name);
    let data = new FormData();

    data.append('id', localStorage.getItem('userId'));
    data.append('avatar', that.files[0]);

    let xhr_lg = new XMLHttpRequest();
    xhr_lg.open("POST", baseUrl + 'updateAvatar', true);
    xhr_lg.send(data);

    xhr_lg.onreadystatechange = function() {
        if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
            let res = JSON.parse(xhr_lg.responseText);

            if (res.code === 200) {
                console.log(res.msg)
                console.log(res);
                window.location.href = 'user.html';
            } else {
                console.log(res.msg);
                console.log(res);
            }

        }
    }

}


//下方用于更改密码
var oCp = document.getElementById('cp');
var oCp_inf = document.getElementById('cp_psw');
var oCp_submit = document.getElementById("cp_submit");

oCp_submit.onclick = function() {
    let data = new FormData();

    data.append('id', localStorage.getItem('userId'));
    data.append('newPassword', oCp_inf.value);

    let xhr_lg = new XMLHttpRequest();
    xhr_lg.open("POST", baseUrl + 'passwordUpdate', true);
    xhr_lg.send(data);

    xhr_lg.onreadystatechange = function() {
        if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
            let res = JSON.parse(xhr_lg.responseText);

            if (res.code === 200) {
                console.log(res.msg)
                console.log(res);

            } else {
                console.log(res.msg);
                console.log(res);
            }

        }
    }

}


//此处用于注销
var exit = document.getElementById('exit');
exit.onclick = function() {
    window.location.href = 'login.html';
}

var cp_dis = document.getElementById('cp');
var cp_area = document.getElementById('cp_area');
var flag = 1;
cp_dis.onclick = function() {
    if (flag == 1) {
        cp_area.style.display = 'block';
        flag = 2;
    } else {
        cp_area.style.display = 'none';
        flag = 1;
    }
}

//用于跳到评论区
var context = document.getElementById('jump_to_con');
context.onclick = function() {
    window.location.href = 'contents.html';
}