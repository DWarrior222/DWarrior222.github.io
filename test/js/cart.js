//if(!localStorage.token) location.href = 'login.html';

$.ajax({
      url: 'http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token,
      type: 'GET',
      success: function(json) {
        console.log(json);
        if(json.code != 0) {
          location.href = 'login.html';
        } 
      }
   });



$.get({
	url: 'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
	type: 'get',
	dataType: 'json',
	data: {},
	success: function(json) {
		console.log(json);
		var data = json.data;
		var sum = 0;
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			sum += (obj.goods_price * obj.goods_number);
			$('.cart-goods-all')[0].innerHTML += `
																	<div class="cart-goods">
																		<div class="cart-goods-content">
																			<ul>
																				<li class="check" data-id="${obj.goods_id}"></li>
																				<li><img src="${obj.goods_thumb}" alt=""/></li>
																				<li>
																					<p>${obj.goods_name}</p>
																					<div class="goods-price-number">
																						<div class="goods-price">￥<i>${obj.goods_price}</i></div>
																						<div class="goods-number">
																							<a href="javascript:;" class="minus" name="minus">-</a>
																							<span class="number" name="number">${obj.goods_number}</span>
																							<a href="javascript:;" class="plus" name="plus">+</a>
																						</div>
																					</div>
																				</li>
																			</ul>
																		</div>
																	</div>	
																		`;
		}
		$('.settlement span.totall-price')[0].innerText = sum; //结算

		//调用单选、添加类名
		check();
		
		//调用全选
		allCheck();
		
		$('.delete-goods').on('touchstart', function() {
			$('#model-comfirm').show();
			$('#model-comfirm').on('touchstart', function(event){
				var target = event.target;
				if (target.id === 'yes') {
					$(this).hide();
//							console.log($('.checked')[1].dataset.id);
					var length = $('.checked').length;
					var arr = [];
					var number = 0;
					for (var i = 0; i < length; i++) {
						arr[i] = $('.checked')[i].dataset.id;
						var goods_id =arr[i];
					
        	$.post({
        		url: 'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
        		type: 'post',
						dataType: 'json',
						data: {goods_id,number},
						success: function(json) {
							console.log(json);
							if (json.code === 0){
								$('.checked').parent().parent().parent().remove();//删除
								$('.all-check').removeClass('all-checked');//取消全选
							}
						}
        	});
        }
				}	else if(target.id === 'no'){
						$(this).hide();
					}
			});
			
		});
		
		//先点选择再删除
//				$('.check').on('touchstart', function(event) {
//					var $target = $(event.target);
//					if ($target.attr('class') === 'check') {
//						$(this).addClass('checked');
//					}else if($target.attr('class') === 'check checked') {
//						$(this).removeClass('checked');
//						$('.all-check').removeClass('all-checked');
//					}
//					
//					//开始
//					$('.delete-goods').on('touchstart', function() {
//						$('#model-comfirm').show();
//						$('#model-comfirm').on('touchstart', function(event){
//							var target = event.target;
//							if (target.id === 'yes') {
//								$(this).hide();
//	//							console.log($('.checked').data('id'));
//								var goods_id = $('.checked').data('id');
//	            	var number = 0;
//	            	$.post({
//	            		url: 'http://h6.duchengjiu.top/shop/api_cart.php?token=8568f93f4e9141deee577b7881af5f96',
//	            		type: 'post',
//									dataType: 'json',
//									data: {goods_id,number},
//									success: function(json) {
//										console.log(json);
//										if (json.code === 0){
//											$('.checked').parent().parent().parent().remove();//删除
//										}
//									}
//	            	});
//							}else if(target.id === 'no'){
//								$(this).hide();
//							}
//							
//						});
//						
//					});				
//					//结束
//					
//				});
		
		editor();//调用编辑
		
	}//callback
});//$.get结束
		
//编辑
function editor(lock) {
	$('#editor').on('touchstart', function() {
		if (!lock) {
			$(this).html('完成');
			$('#delete').css('display','block');
			lock = true;
		}else {
			$(this).html('编辑');
			$('#delete').css('display','none');
			lock = false;
		}
	});
}

//单选
function check() {
	$('.check').on('touchstart', function(event) {
		var $target = $(event.target);
		if ($target.attr('class') === 'check') {
			$(this).addClass('checked');
		}else if($target.attr('class') === 'check checked') {
			$(this).removeClass('checked');
			$('.all-check').removeClass('all-checked');
		}
	});
}

//全选
function allCheck() {
	$('.all-check').on('touchstart', function() {
		var $target = $(event.target);
		if ($target.attr('class') === 'all-check') {
			$(this).addClass('all-checked');
			$('.check').addClass('checked');
		}else if ($target.attr('class') === 'all-check all-checked') {
			$(this).removeClass('all-checked');
			$('.check').removeClass('checked');
		}
	});
}
		
		

//个数变化、总价
$('.cart-goods-all')[0].addEventListener('touchstart', function(event) {
	event = event || window.event;
	var target = event.target || event.srcElement;
	var priceFirst = parseInt($('.settlement span.totall-price')[0].innerText);
	if (target.name === "minus") {
		var numbers = target.parentNode.childNodes[3].innerText;
		var price = parseInt(target.parentNode.parentNode.childNodes[1].childNodes[1].innerText);
		target.parentNode.childNodes[3].innerText = parseInt(numbers) - 1;
		var newNumbers = parseInt(target.parentNode.childNodes[3].innerText);
		if (target.parentNode.childNodes[3].innerText <= 1) {
			target.parentNode.childNodes[3].innerText = 1;
			newNumbers = 1;
		}
		var totallPrice = priceFirst - price * numbers + price * newNumbers;
		$('.settlement span.totall-price')[0].innerText = totallPrice;
	}else if (target.name === "plus") {
		var numbers = target.parentNode.childNodes[3].innerText;
		var price = parseInt(target.parentNode.parentNode.childNodes[1].childNodes[1].innerText);
		target.parentNode.childNodes[3].innerText = parseInt(numbers) + 1;
		var newNumbers = parseInt(target.parentNode.childNodes[3].innerText);
		var totallPrice = priceFirst - price * numbers + price * newNumbers;
		$('.settlement span.totall-price')[0].innerText = totallPrice;
	}
});
		
//返回上一页
$('.back').on('touchstart', function() {
			window.history.back();
		});