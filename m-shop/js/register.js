var oUsername = document.getElementById('username');
var oPassword = document.querySelector('input[type=password]');
var oBtn = document.querySelector('button[type=button]');
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
			modal('注册成功');
			// alert('注册成功，3秒后跳转到登录页面');
			setTimeout(function(){
				location.href='login.html';
			},3000);
		}
	});
});

function modal(text) {
	$('#model-comfirm h1').html(text);
  $('#model-comfirm #wrap').addClass('wrap-prompt');
  $('#model-comfirm').fadeIn(400);
  $('#model-comfirm').delay(400).fadeOut(500);
}