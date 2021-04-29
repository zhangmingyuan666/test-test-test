var oMessageBox = document.getElementById('messagebox');
var back_con = document.getElementById('back_con');
//登录
let data1 = new FormData();

data1.append('username', localStorage.getItem('username'));
data1.append('password', localStorage.getItem('password'));

let xhr_lg1 = new XMLHttpRequest();
xhr_lg1.open("POST", baseUrl + 'login', true);

xhr_lg1.send(data1);

xhr_lg1.onreadystatechange = function() {
    if (xhr_lg1.readyState === 4 && xhr_lg1.status === 200) {
        let res = JSON.parse(xhr_lg1.responseText);
        console.log(res);
        if (res.code === 200) {
            console.log(res.msg)
        } else {
            console.log(res.msg);
        }
    }
}



//页面详情的展示
let data = new FormData();

data.append('key', localStorage.getItem('id'));

let xhr_lg = new XMLHttpRequest();
xhr_lg.open("GET", baseUrl + 'dynamicState/search/' + localStorage.getItem('id'), true);

xhr_lg.send(data);

xhr_lg.onreadystatechange = function() {
    if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {

        let res = JSON.parse(xhr_lg.responseText);
        console.log(res);

        if (res.code === 200) {
            console.log(res.msg)
            for (var i = 0; i < 1; i++) {
                var oCotainer = document.createElement('li');
                oCotainer.className = "container";
                oMessageBox.appendChild(oCotainer);



                //写入发表留言的时间
                var oTime = document.createElement("div");
                oTime.className = "time";
                var times = toTime(res.data[i].creationTime);
                oTime.innerHTML = times;
                oCotainer.appendChild(oTime);


                //写入留言人的信息
                var oMessageId = document.createElement("div");
                oMessageId.className = "message_id";
                oMessageId.innerHTML = '<div>楼层:' + res.data[i].id + '</div>' + '<div>userId:' + '<span>' + res.data[i].userId + '</span>' + '</div>' + '<div>username:' + res.data[i].username + '</div>';
                oCotainer.appendChild(oMessageId);

                //写入留言标题
                var oInput_Title = document.createElement('div');
                oInput_Title.className = 'input_title';
                oInput_Title.innerHTML = res.data[i].title;
                oCotainer.appendChild(oInput_Title);

                //写入留言内容
                var oInput_Content = document.createElement('div');
                oInput_Content.className = 'input_content';
                oInput_Content.innerHTML = res.data[i].content;
                oCotainer.appendChild(oInput_Content);

                var oImg_box = document.createElement('div');
                oImg_box.className = 'img_box';
                oCotainer.appendChild(oImg_box);

                if (res.data[i].urls.length != 0) {
                    for (var j = 0; j < res.data[i].urls.length; j++) {
                        var oInput_img = document.createElement('img');
                        oInput_img.className = 'input_img';
                        oInput_img.src = basicUrl + res.data[i].urls[j];
                        oImg_box.appendChild(oInput_img);
                    }
                }
            }

            var oReply_btn = document.querySelectorAll('.oReply_btn')
            for (var i = 0; i < oReply_btn.length; i++) {
                oReply_btn[i].onclick = function() {
                    console.log(this.parentNode.parentNode.children[3].children[0]); //回复的id
                    console.log(this.parentNode.parentNode.children[3].children[2]); //被回复者
                    console.log(this.parentNode.parentNode.children[3].children[1]); //回复者（我现在要回复的人）
                    console.log(this.parentNode.children[0].value); //回复的内容
                    let data = new FormData();

                    data.append('dynamicStateId', localStorage.getItem('id'));
                    data.append('replyId', this.parentNode.parentNode.children[3].children[0].innerHTML);
                    data.append('replyerId', localStorage.getItem('userId'));
                    data.append('beReplyerId', this.parentNode.parentNode.children[3].children[1].innerHTML);
                    data.append('commentsContent', this.parentNode.children[0].value);


                    let xhr_lg = new XMLHttpRequest();
                    xhr_lg.open("POST", baseUrl + 'comment/reply', true);

                    xhr_lg.send(data);

                    xhr_lg.onreadystatechange = function() {
                        if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {

                            let res = JSON.parse(xhr_lg.responseText);
                            console.log(res);

                            if (res.code === 200) {
                                console.log(res.msg)
                            } else {
                                console.log(res.msg);

                            }
                        }
                    }
                }
            }

        } else {
            console.log(res.msg);
            window.location.href = 'contents.html';
        }
    }
}

var oDelete_area = document.getElementById('comment_del');
var oDelete_btn = document.getElementById('comment_del_btn');

oDelete_btn.onclick = function() {
    let data = new FormData();

    data.append('id', oDelete_area.value);

    let xhr_lg = new XMLHttpRequest();
    xhr_lg.open("POST", baseUrl + 'comment/delete', true);

    xhr_lg.send(data);

    xhr_lg.onreadystatechange = function() {
        if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {

            let res = JSON.parse(xhr_lg.responseText);
            console.log(res);

            if (res.code === 200) {
                console.log(res.msg)
            }
        }
    }
}

back_con.onclick = function() {
    window.location.href = 'contents.html'
}