var oCreate_album = document.getElementById('create_album');
var oCon_album = document.getElementById('container_album');
var oClick_album = document.getElementById('click_album');
var oSet_album = document.getElementById('setname_album');
var my_album = document.getElementById('my_album');
var all_album = document.getElementById('all_album');
var oContainer_album = document.getElementById('container_album');






oClick_album.onclick = function() {
    let data_com = new FormData();

    data_com.append('userId', localStorage.getItem('userId'));
    data_com.append('title', oSet_album.value);

    let xhr_com = new XMLHttpRequest();

    xhr_com.open("POST", baseUrl + 'createAlbum', true);
    //展示在这个id下的评论区
    xhr_com.send(data_com);

    xhr_com.onreadystatechange = function() {
        if (xhr_com.readyState === 4 && xhr_com.status === 200) {

            let res = JSON.parse(xhr_com.responseText);
            console.log(res);

            if (res.code === 4000) {
                console.log(res.msg)
            } else {
                console.log(res.meg);
            }
        }
    }
}

my_album.onclick = function() {
    let data = new FormData();

    data.append('userId', localStorage.getItem('userId'));

    let xhr = new XMLHttpRequest();

    xhr.open("GET", baseUrl + 'album/oneAlbum' + '?userId=' + localStorage.getItem('userId'), true);
    //展示在这个id下的评论区
    xhr.send(data);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            let res = JSON.parse(xhr.responseText);
            console.log(res);

            if (res.code === 40003) {
                console.log(res.msg);
                for (var i = 0; i < res.data.length; i++) {
                    var oCotainer = document.createElement('div');
                    oCotainer.className = "container_a";
                    oContainer_album.appendChild(oCotainer);

                    //写入图标
                    var ologo = document.createElement("div");
                    ologo.className = 'ologo';
                    oCotainer.appendChild(ologo);

                    var oFace = document.createElement("img");
                    oFace.className = 'oFace';
                    if (res.data[i].pictureList != null) {
                        oFace.src = basicUrl + res.data[i].pictureList[0].url;
                    } else {
                        oFace.src = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2392373518,4205495143&fm=26&gp=0.jpg';
                    }
                    ologo.appendChild(oFace);

                    //写入标题
                    var oTitle = document.createElement("div");
                    oTitle.className = "oTitle";
                    oTitle.innerHTML = res.data[i].title;
                    oCotainer.appendChild(oTitle);
                }
            } else {
                console.log(res.msg);
            }
        }
    }
}