var oCommentarea = document.getElementById('commentarea');
var oCommemt_input = document.getElementById('comment_input');
var oComment_btn = document.getElementById('comment_btn');


//评论区的展示


let data_com = new FormData();

data_com.append('dynamicStateId', localStorage.getItem('id'));

let xhr_com = new XMLHttpRequest();

xhr_com.open("GET", baseUrl + 'comment/allComment/?dynamicStateId=' + localStorage.getItem('id'), true);
//展示在这个id下的评论区
xhr_com.send(data_com);

xhr_com.onreadystatechange = function() {
    if (xhr_com.readyState === 4 && xhr_com.status === 200) {

        let res = JSON.parse(xhr_com.responseText);
        console.log(res);

        if (res.code === 200) {
            console.log(res.msg)
            console.log(res.data.length);
            for (var i = 0; i < res.data.length; i++) {
                var oComment = document.createElement('li');
                oComment.className = "comment_li";
                oCommentarea.appendChild(oComment);

                //用于删除
                var oDel = document.createElement("div");
                oDel.className = "oDel";
                oDel.innerHTML = '删除';
                oComment.appendChild(oDel);

                //用于回复
                var oReply = document.createElement("div");
                oReply.className = "oReply";
                oReply.innerHTML = '回复';
                oComment.appendChild(oReply);

                var oReply_con = document.createElement("div");
                oReply_con.className = "oReply_con";
                oComment.appendChild(oReply_con);

                var oReply_text = document.createElement("textarea");
                oReply_text.className = "oReply_text";
                oReply_con.appendChild(oReply_text);

                var oReply_btn = document.createElement("div");
                oReply_btn.className = "oReply_btn";
                oReply_btn.innerHTML = '回复';
                oReply_con.appendChild(oReply_btn);
                //写入留言人的信息
                var oMessageId = document.createElement("div");
                oMessageId.className = "comment_inf";
                oMessageId.innerHTML = '楼层ID:' + '<span class="center">' + res.data[i].id + '</span>' + '   userId:' + '<span>' + localStorage.getItem('userId') + '</span > ' + '评论了 userId:' + '<span>' + localStorage.getItem('beReplyerId') + '</span>' + '的主帖';
                oComment.appendChild(oMessageId);

                //写入留言内容
                var oInput_Content = document.createElement('div');
                oInput_Content.className = 'comment_content';
                oInput_Content.innerHTML = res.data[i].commentsContent;
                oComment.appendChild(oInput_Content);

            }

            var oDel = document.querySelectorAll('.oDel');
            for (var i = 0; i < oDel.length; i++) {
                oDel[i].onclick = function() {
                    console.log(this.parentNode.children[3].children[0]);
                    let data = new FormData();

                    data.append('id', this.parentNode.children[3].children[0].innerHTML);

                    let xhr_lg = new XMLHttpRequest();
                    xhr_lg.open("POST", baseUrl + 'comment/delete', true);

                    xhr_lg.send(data);

                    xhr_lg.onreadystatechange = function() {
                        if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {

                            let res = JSON.parse(xhr_lg.responseText);
                            console.log(res);
                            window.location.href = 'specific.html'
                            if (res.code === 200) {
                                console.log(res.msg)
                            }
                        }
                    }
                }
            }
        } else {
            console.log(res.msg);
        }
    }
}

oComment_btn.onclick = function() {
    let data = new FormData();

    data.append('replyerId', localStorage.getItem('userId'));
    data.append('dynamicStateId', localStorage.getItem('id'));
    data.append('beReplyerId', localStorage.getItem('beReplyerId'));
    data.append('commentsContent', oCommemt_input.value);

    let xhr = new XMLHttpRequest();

    xhr.open("POST", baseUrl + 'comment/insert', true);

    xhr.send(data);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            let res = JSON.parse(xhr.responseText);
            console.log(res);

            if (res.code === 200) {
                console.log(res.msg);
                window.location.href = 'specific.html'
            } else {
                console.log(res.meg);
            }
        }
    }
}