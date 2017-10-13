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
							if (json.message === '用户名不合法，请填写3-10位字母、数字及下划线') {
								alert('用户名格式不正确，请填写3-10位字母、数字及下划线');
							}
							if (json.message === '少传参数name') {
								alert('请重新输入');
							}
							if (json.message === '密码不合法，请填写6-10位字母及数字') {
								alert('密码不合法，请重新输入');
							}
							if (json.message === '注册成功') {
								alert('注册成功，3秒后跳转到登录页面');
								setTimeout(function(){
									location.href='login.html';
								},3000);
							}
						});
					});