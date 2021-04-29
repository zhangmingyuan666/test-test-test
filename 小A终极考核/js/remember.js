 if (localStorage.getItem('username1')) {
     usernames.value = localStorage.getItem('username1');
     oRemember.checked = true;
 }
 if (localStorage.getItem('password1')) {
     passwords.value = localStorage.getItem('password1');
     oRemember.checked = true;
 }


 //实现记住密码操作
 oRemember.addEventListener('change', function() {
     if (this.checked) {
         localStorage.setItem('username1', usernames.value);
         localStorage.setItem('password1', passwords.value);
     } else {
         localStorage.removeItem('username1');
         localStorage.removeItem('password1');
     }
 });

 if (oRemember.checked == false) {

 }