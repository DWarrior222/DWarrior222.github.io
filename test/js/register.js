var oUsername = document.getElementById('username');
var oPassword = document.querySelector('input[type=password]');
var oBtn = document.querySelector('button[type=button]');
var oForm = document.getElementsByClassName("form");
var oForm = false;
var oPass = false;
var oUser = false;
oBtn.disabled = true;
oBtn.addEventListener('touchstart',function(){
	console.log(oUsername.value);
	myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
	{
		status: 'register',
		username: oUsername.value,
		password: oPassword.value
	},function(error,responseText){
		var json = JSON.parse(responseText);
		console.log(json);
		if (json.message === '注册成功') {
			modal('注册成功,3秒后跳转到登录页面');
			// alert('注册成功，3秒后跳转到登录页面');
			setTimeout(function(){
				location.href='login.html';
			},3000);
		}
		if (json.message == "用户名不合法，请填写3-20位的英文数字下划线") {
            modal("用户名格式不正确，请填写3-20位的英文数字组成的用户名格式")
        }
        if (json.message === "用户名已存在") {
          	modal("用户已存在，请重新注册")
        }
        if (json.message === "少传参数username") {
            modal("请输入用户名")
        }
        if (json.message === "密码最小长度为6位") {
            modal("请输入密码，且密码最小长度为6位")
        }
	});
});
oPassword.onkeyup = function() {
    if (oPassword.value === "") {
        oPass = false;
    } else {
        oPass = true;
    }
    chec()

}
oUsername.onkeyup = function() {
    if (oUsername.value === "") {
        oUser = false;
    } else {
        oUser = true;
    }
    chec()

}

function chec() {
    oForm = oPass && oUser;
    oBtn.disabled = !oForm;
    console.log(!oForm)
    if (oUsername.value !== "" && oPassword.value !== "") {
        oBtn.style.color = "#fff";
    } else {
        oBtn.style.color = "#ccc";
    }
}


window.onkeyup = function(event) {
    if (event.keyCode === 13) {
        oBtn.click();

    }
}
function modal(text) {
	$('#model-comfirm h1').html(text);
  $('#model-comfirm #wrap').addClass('wrap-prompt');
  $('#model-comfirm').fadeIn(400);
  $('#model-comfirm').delay(400).fadeOut(500);
}