var text_submit = document.getElementById('doPost');
var oInput_title = document.getElementById('myInput');
var oInput_content = document.getElementById('myInput_content');
var oInput_picture = document.getElementById('sendpicture');
var oDelete = document.getElementById('delete_id');
var oDelete_btn = document.getElementById('delete_btn');
var jump = document.querySelectorAll('li');
var hasPicture = 0;
var input_div = document.getElementById('input_div');
let data = new FormData();

data.append('username', localStorage.getItem('username'));
data.append('password', localStorage.getItem('password'));

oInput_picture.onchange = function() {
    for (var i = 0; i < oInput_picture.files.length; i++) {
        var oImg = document.createElement('img');
        oImg.className = 'oImg';
        console.log(oInput_picture.files[i]);
        oImg.src = window.URL.createObjectURL(oInput_picture.files[i]);
        oImg.onload = function() {
            window.URL.revokeObjectURL(this.src);
        }
        input_div.appendChild(oImg);
    }
}



let xhr_lg = new XMLHttpRequest();
xhr_lg.open("POST", baseUrl + 'login', true);

xhr_lg.send(data);

xhr_lg.onreadystatechange = function() {
    if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
        let res = JSON.parse(xhr_lg.responseText);
        console.log(res);
        if (res.code === 200) {
            console.log(res.msg)


            //用于上传日记
            text_submit.onclick = function() {
                let data = new FormData();

                data.append('userId', res.data.id);
                console.log(res.data.id);
                data.append('title', oInput_title.value);
                console.log(oInput_title);
                data.append('content', oInput_content.value);
                console.log(oInput_content);
                if (oInput_picture.files[0] != '') {
                    hasPicture = 1;
                    console.log(oInput_picture.files);

                    console.log(oInput_picture.files[0]);
                    for (var i = 0; i < oInput_picture.files.length; i++) {
                        data.append('files', oInput_picture.files[i])

                    }


                }

                data.append('hasPicture', hasPicture);
                console.log(hasPicture);

                let xhr_lg = new XMLHttpRequest();

                xhr_lg.open("POST", baseUrl + 'dynamicState/insert', true);
                xhr_lg.send(data);
                xhr_lg.onreadystatechange = function() {
                    if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
                        let res = JSON.parse(xhr_lg.responseText);
                        console.log(res);
                        if (res.code === 200) {
                            console.log(res.msg);
                            window.location.href = 'contents.html';
                        } else {
                            console.log(res.msg);
                        }
                    }

                }
            }

            //用于删除
            oDelete_btn.onclick = function() {
                let data = new FormData();

                data.append('id', oDelete.value);
                let xhr_lg = new XMLHttpRequest();

                xhr_lg.open("POST", baseUrl + 'dynamicState/delete', true);
                xhr_lg.send(data);
                xhr_lg.onreadystatechange = function() {
                    if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
                        let res = JSON.parse(xhr_lg.responseText);
                        console.log(res);
                        if (res.code === 200) {
                            console.log(res.msg);
                            window.location.href = 'contents.html';
                        } else {
                            console.log(res.msg);
                        }
                    }
                }

            }
        } else {
            console.log(res.msg);
        }
    }
}

//用于显示
add_logo.onclick = function() {
    add_typing.style.display = 'block';
}

back_user.onclick = function() {
    window.location.href = 'user.html';
}