var text_submit = document.getElementById('doPost');
var add_typing = document.getElementById('add_typing');
var my_con = document.getElementById('my_con');
var all_con = document.getElementById('all_con');
var oMessageBoxA = document.getElementById('messageBox_all');
var oMessageBoxM = document.getElementById('messageBox_my');
var oMessageBoxS = document.getElementById('messageBox_search');
var search_logo = document.getElementById('search_item');
var add_logo = document.getElementById('add_logo');
var search_input = document.getElementById('search_input');
var search_way = document.getElementById('search_way');
var back_user = document.getElementById('back_user');
var dog = 0;

all_con.onclick = function() {
    oMessageBoxA.style.display = 'block';
    oMessageBoxM.style.display = 'none';
    oMessageBoxS.style.display = 'none';

    search_logo.style.pointerEvents = 'auto';
    my_con.style.pointerEvents = 'auto';
    all_con.style.pointerEvents = 'none';


    all_con.className = 'box_choice';
    my_con.className = '.con_choice div';

    let data_con = new FormData();

    let xhr_con = new XMLHttpRequest();
    xhr_con.open("GET", baseUrl + 'dynamicState/select/all', true);
    xhr_con.send(data_con);


    xhr_con.onreadystatechange = function() {
        if (xhr_con.readyState === 4 && xhr_con.status === 200) {
            let res = JSON.parse(xhr_con.responseText);

            if (res.code === 200) {
                console.log(res.msg)
                console.log(res);
                console.log(res.data.length);
                for (var i = 0; i < res.data.length; i++) {
                    var oCotainer = document.createElement('li');
                    oCotainer.className = "container";
                    oMessageBoxA.appendChild(oCotainer);

                    //写入发表留言的时间
                    var oDel = document.createElement("div");
                    oDel.className = "oDel";
                    oDel.innerHTML = '删除';
                    oCotainer.appendChild(oDel);

                    //写入发表留言的时间
                    var oTime = document.createElement("div");
                    oTime.className = "time";
                    var times = toTime(res.data[i].creationTime);
                    oTime.innerHTML = times;
                    oCotainer.appendChild(oTime);


                    //写入留言人的信息
                    var oMessageId = document.createElement("div");
                    oMessageId.className = "message_id";
                    oMessageId.innerHTML = '楼层ID:' + '<span class="center">' + res.data[i].id + '</span>' + '     userId:' + '<span>' + res.data[i].userId + '</span> ' + '     username: ' + ' <span> ' + res.data[i].username + ' </span>';
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
                var container = document.querySelectorAll('.container');
                var del = document.querySelectorAll('.oDel');
                for (var i = 0; i < container.length; i++) {
                    del[i].onclick = function() {
                        console.log(this.parentNode.children[2].children[0].innerHTML);

                        let data = new FormData();

                        data.append('id', this.parentNode.children[2].children[0].innerHTML);
                        let xhr_lg = new XMLHttpRequest();

                        xhr_lg.open("POST", baseUrl + 'dynamicState/delete', true);
                        xhr_lg.send(data);
                        xhr_lg.onreadystatechange = function() {
                            if (xhr_lg.readyState === 4 && xhr_lg.status === 200) {
                                let res = JSON.parse(xhr_lg.responseText);
                                console.log(res);
                                if (res.code === 200) {
                                    console.log(res.msg);
                                    dog = 1;
                                    window.history.go(0);

                                } else {
                                    console.log(res.msg);
                                }
                            }
                        }
                    }
                    for (var i = 0; i < container.length; i++) {
                        container[i].onclick = function() {
                            console.log(this.children[2].children[0].innerHTML);
                            localStorage.removeItem('id');
                            localStorage.setItem('id', this.children[2].children[0].innerHTML);
                            localStorage.setItem('beReplyerId', this.children[2].children[1].innerHTML);
                            console.log(dog);
                            if (dog == 0) {
                                window.location.href = 'specific.html';
                            }
                        }
                    }
                }


            } else {
                console.log(res.msg);
            }
        }
    }
}

my_con.onclick = function() {
    oMessageBoxM.style.display = 'block';
    oMessageBoxA.style.display = 'none';
    oMessageBoxS.style.display = 'none';

    search_logo.style.pointerEvents = 'auto';
    my_con.style.pointerEvents = 'none';
    all_con.style.pointerEvents = 'auto';

    all_con.className = '.con_choice div';
    my_con.className = 'box_choice';

    let data_con = new FormData();
    data_con.append('userId', localStorage.getItem('userId'));
    let xhr_con = new XMLHttpRequest();
    xhr_con.open("GET", baseUrl + 'dynamicState/select/' + localStorage.getItem('userId'), true);
    xhr_con.send(data_con);

    xhr_con.onreadystatechange = function() {
        if (xhr_con.readyState === 4 && xhr_con.status === 200) {
            let res = JSON.parse(xhr_con.responseText);

            if (res.code === 200) {
                console.log(res.msg)
                console.log(res);

                for (var i = 0; i < res.data.length; i++) {
                    var oCotainer = document.createElement('li');
                    oCotainer.className = "container";
                    //oCotainer.style.display = 'none';
                    oMessageBoxM.appendChild(oCotainer);

                    //用于删除
                    var oDel = document.createElement("div");
                    oDel.className = "oDel";
                    oDel.innerHTML = '删除';
                    oCotainer.appendChild(oDel);

                    //写入发表留言的时间
                    var oTime = document.createElement("div");
                    oTime.className = "time";
                    var times = toTime(res.data[i].creationTime);
                    oTime.innerHTML = times;
                    oCotainer.appendChild(oTime);


                    //写入留言人的信息
                    var oMessageId = document.createElement("div");
                    oMessageId.className = "message_id";
                    oMessageId.innerHTML = '楼层ID:' + '<span class="center">' + res.data[i].id + '</span>' + 'userId:' + '<span>' + res.data[i].userId + '</span > ' + 'username: ' + '<span>' + res.data[i].username + '</span>';
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

                var del = document.querySelectorAll('.oDel');
                var container = document.querySelectorAll('.container');

                for (var i = 0; i < del.length; i++) {
                    del[i].onclick = function() {
                        console.log(this.parentNode.children[2].children[0].innerHTML);

                        let data = new FormData();

                        data.append('id', this.parentNode.children[2].children[0].innerHTML);
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

                }


                for (var i = 0; i < container.length; i++) {
                    container[i].onclick = function() {
                        localStorage.removeItem('id');
                        localStorage.setItem('id', this.children[2].children[0].innerHTML);
                        localStorage.setItem('beReplyerId', this.children[2].children[1].innerHTML);

                        window.location.href = 'specific.html';
                    }
                }

            } else {
                console.log(res.msg);
            }

        }
    }
}


search_logo.onclick = function() { //动态查询
    oMessageBoxM.style.display = 'none';
    oMessageBoxA.style.display = 'none';
    oMessageBoxS.style.display = 'block';

    search_logo.style.pointerEvents = 'auto';
    my_con.style.pointerEvents = 'auto';
    all_con.style.pointerEvents = 'auto';

    all_con.className = '.con_choice div';
    my_con.className = '.con_choice div';
    if (search_way.checked == false) { //动态查询
        var li = document.querySelectorAll('messageBox_search>li');
        if (oMessageBoxS.children[0] != null) {
            for (var i = 0; i < li.length; ++i) {
                oMessageBoxS.removeChild(li[i]);
            }
        }

        let data_con = new FormData();
        data_con.append('key', search_input.value);
        let xhr_con = new XMLHttpRequest();
        xhr_con.open("GET", baseUrl + 'dynamicState/search/' + search_input.value, true);
        xhr_con.send(data_con);

        xhr_con.onreadystatechange = function() {
            if (xhr_con.readyState === 4 && xhr_con.status === 200) {
                let res = JSON.parse(xhr_con.responseText);

                if (res.code === 200) {
                    console.log(res.msg)
                    console.log(res);

                    for (var i = 0; i < res.data.length; i++) {
                        var oCotainer = document.createElement('li');
                        oCotainer.className = "container";
                        //oCotainer.style.display = 'none';
                        oMessageBoxS.appendChild(oCotainer);

                        //用于删除
                        var oDel = document.createElement("div");
                        oDel.className = "oDel";
                        oDel.innerHTML = '删除';
                        oCotainer.appendChild(oDel);

                        //写入发表留言的时间
                        var oTime = document.createElement("div");
                        oTime.className = "time";
                        var times = toTime(res.data[i].creationTime);
                        oTime.innerHTML = times;
                        oCotainer.appendChild(oTime);


                        //写入留言人的信息
                        var oMessageId = document.createElement("div");
                        oMessageId.className = "message_id";
                        oMessageId.innerHTML = '楼层ID:' + '<span class="center">' + res.data[i].id + '</span>' + 'userId:' + '<span>' + res.data[i].userId + '</span > ' + 'username: ' + '<span>' + res.data[i].username + '</span>';
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

                    var container = document.querySelectorAll('.container');
                    var del = document.querySelectorAll('.oDel');
                    for (var i = 0; i < container.length; i++) {
                        del[i].onclick = function() {
                            console.log(this.parentNode.children[2].children[0].innerHTML);

                            let data = new FormData();

                            data.append('id', this.parentNode.children[2].children[0].innerHTML);
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
                    }
                    for (var i = 0; i < container.length; i++) {
                        container[i].onclick = function() {
                            localStorage.removeItem('id');
                            localStorage.setItem('id', this.children[2].children[0].innerHTML);
                            localStorage.setItem('beReplyerId', this.children[2].children[1].innerHTML);

                            window.location.href = 'specific.html';
                        }
                    }
                } else {
                    console.log(res.msg);
                }
            }
        }
    } else { //根据用户的ID查询
        var li = document.querySelectorAll('messageBox_search>li');
        if (oMessageBoxS.children[0] != null) {
            for (var i = 0; i < li.length; ++i) {
                oMessageBoxS.removeChild(li[i]);
            }
        }

        all_con.className = '.con_choice div';
        my_con.className = '.con_choice div';

        let data_con = new FormData();
        data_con.append('userId', search_input.value);
        let xhr_con = new XMLHttpRequest();
        xhr_con.open("GET", baseUrl + 'dynamicState/select/' + search_input.value, true);
        xhr_con.send(data_con);

        xhr_con.onreadystatechange = function() {
            if (xhr_con.readyState === 4 && xhr_con.status === 200) {
                let res = JSON.parse(xhr_con.responseText);

                if (res.code === 200) {
                    console.log(res.msg)
                    console.log(res);

                    for (var i = 0; i < res.data.length; i++) {
                        var oCotainer = document.createElement('li');
                        oCotainer.className = "container";
                        //oCotainer.style.display = 'none';
                        oMessageBoxS.appendChild(oCotainer);

                        //用于删除
                        var oDel = document.createElement("div");
                        oDel.className = "oDel";
                        oDel.innerHTML = '删除';
                        oCotainer.appendChild(oDel);

                        //写入发表留言的时间
                        var oTime = document.createElement("div");
                        oTime.className = "time";
                        var times = toTime(res.data[i].creationTime);
                        oTime.innerHTML = times;
                        oCotainer.appendChild(oTime);


                        //写入留言人的信息
                        var oMessageId = document.createElement("div");
                        oMessageId.className = "message_id";
                        oMessageId.innerHTML = '楼层ID:' + '<span class="center">' + res.data[i].id + '</span>' + 'userId:' + '<span>' + res.data[i].userId + '</span > ' + 'username: ' + '<span>' + res.data[i].username + '</span>';
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

                    var del = document.querySelectorAll('.oDel');
                    var container = document.querySelectorAll('.container');
                    for (var i = 0; i < container.length; i++) {
                        del[i].onclick = function() {
                            console.log(this.parentNode.children[2].children[0].innerHTML);

                            let data = new FormData();

                            data.append('id', this.parentNode.children[2].children[0].innerHTML);
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
                    }
                    for (var i = 0; i < container.length; i++) {
                        container[i].onclick = function() {
                            console.log(this.children[1].children[0].innerHTML);
                            localStorage.removeItem('id');
                            localStorage.setItem('id', this.children[2].children[0].innerHTML);
                            localStorage.setItem('beReplyerId', this.children[2].children[1].innerHTML);

                            window.location.href = 'specific.html';
                        }
                    }




                } else {
                    console.log(res.msg);
                }

            }
        }
    }
}