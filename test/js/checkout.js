
var sum = 0;
var num=0;
$.ajax({
    'url':'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
    'type':'GET',
    'datatype':'json',
    'success':function(responseText){
        var data = responseText.data;
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            sum+= obj.goods_price * obj.goods_number;
            num+=parseInt(obj.goods_number);
            console.log(num)
            $('.num')[0].innerHTML= num;


            $('.order-message')[0].innerHTML += `<div class="order-list">
    <div class="order-position">
        <div class="order-logo">
            <img src="images/logo1.png">
            <span class="order-delete">
                <!--<a class="i-complete"></a>-->
                <p style="color: #ff5000;line-height: 2.13rem;margin-right:0.75rem;font-size: 14px">乐购</p>
            </span>
        </div>
    </div>
    <div class="order-modules">
        <div class="order-goodsMessage" style="background-color: #f5f5f5">
            <div class="order-goodsMessage-img" >
                <img src="${obj.goods_thumb}" />
            </div>
            <div class="order-goodsMessage-title">
                <p class="title">${obj.goods_name}  </p>
            </div>
            <div class="order-goodsMessage-pay">
                <p class="order-price">￥:${obj.goods_price}</p>

            </div>
        </div>
    </div>
    <div class="checkout-quantity">
        <div class="checkout-quantity-row">
            <div class="checkout-quantity-row-title">
                <span class="checkout-quantity-row-nums">购买数量</span>
                   <span class="order-nums">x${obj.goods_number}</span>
            </div>
            <div class="checkout-quantity-row-content">

            </div>
        </div>
    </div>
</div>`;


        }
        $('.sum')[0].innerHTML+=sum;
        console.log(num)
        if(num===0){
            $('.order-message')[0].innerHTML=`<div style="text-align: center;margin-top: 100px;font-size: 18px">您还没有添加商品</div>`

        }
    }
})
$('.checkout-address')[0].addEventListener('touchstart',function(){
    location.href='address.html'
},false);
//滑动显示地址信息
window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
//        console.log(scrollTop);
    if(scrollTop>105){
        $('.checkout-address-hide')[0].style.display='block'
    }
    else {
        $('.checkout-address-hide')[0].style.display='none'
    }

}
$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_useraddress.php?token=' + localStorage.token,
    'type': 'GET',
    'datatype': 'json',
    'success': function (responseText) {
        var data = responseText.data;
        console.log(data)
        if(data.length===0){
            $('.checkout-address-center')[0].innerHTML='您还没有添加地址，点击添加'
        }
        if(localStorage.nowConsignee==undefined){
            $('.checkout-address-center')[0].innerHTML='您还没有添加地址，点击添加'
        }
        else{
            $('.checkout-address-center')[0].innerHTML=` <div style="line-height: 1.5;">
        <span >收货人：</span>
        <span>${localStorage.nowConsignee} </span>
        <span class="checkout-address-center-phone">电话:${localStorage.nowMobile}</span>
        </div>
        <div class="checkout-address-center-detail">
            <span>${localStorage.nowProvince} ${localStorage.nowCity} ${localStorage.nowDistrict} ${localStorage.nowAddress}</span>
        </div>`


            $('.checkout-address-hide-send')[0].innerHTML='送至:'+`${localStorage.nowProvince} ${localStorage.nowCity} ${localStorage.nowDistrict} ${localStorage.nowAddress}`


        }
    }

})
$('.checkout-fix-submit')[0].addEventListener('touchstart',function(){
    if(sum===0){
        return
    }
    $('.model-comfirm')[0].style.display='block'
},false);
$('.yes')[0].addEventListener('touchstart',function(){
//       location.href='order.html'
    $.ajax({
        'url': 'http://h6.duchengjiu.top/shop/api_order.php?token=' + localStorage.token+'&status=add',
        'type': 'post',
        'datatype': 'json',
        'data':{
            'address_id':localStorage.nowAddress_id,
            'total_prices':'sum'
        },
        'success': function (responseText) {

            location.href='order.html';
        }
    })
},false);
$('.no')[0].addEventListener('touchstart',function(){
    $('.model-comfirm')[0].style.display='none'
},false);
console.log(localStorage.Address_data)
console.log(localStorage.nowAddressAll);