var sum = 0;
var num=0;
$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_order.php?token=' + localStorage.token,
    'type': 'GET',
    'datatype': 'json',
    'success': function (responseText) {
        var data = responseText.data;
        console.log(data);
        var goodsHTML='';
        for(var i=0;i<data.length;i++){
            var obj = data[i];



            for(var j=0;j<obj.goods_list.length; j++) {
                var goods = obj.goods_list[j];
                num += parseInt(goods.goods_number);
                sum += goods.goods_price * goods.goods_number;
                goodsHTML += `
 <div class="order-modules">
        <div class="order-goodsMessage" style="background-color: #f5f5f5">
            <div class="order-goodsMessage-img" >
                <img src="${goods.goods_thumb}">
            </div>
            <div class="order-goodsMessage-title">
                <p class="title">${goods.goods_name}</p>
            </div>
            <div class="order-goodsMessage-pay">
                <p class="order-price">${goods.goods_price}</p>
                <p class="order-nums">x${goods.goods_number}</p>
            </div>
        </div>
    </div>`

            }
            $('.order-list')[0].innerHTML+=`<div class="order-position">
    <div class="order-logo">
        <img src="images/logo1.png">
        <span style="margin-top: 6.5px;position: absolute;margin-left: 35px">收货人:${obj.consignee}</span>
        <span class="order-delete">
                <p style="color: #ff5000;line-height: 2.13rem;margin-right:0.75rem;font-size: 14px">交易成功</p>
            </span>
    </div>
</div>
<div>${goodsHTML}</div>
<div class="order-modules-statistics">
        <div class="order-totalPrice">
            <div class="order-cont">
                <span>共<b>${num}</b>件商品</span>
                <span>合计：<b>￥${sum}</b></span>
                <span>（含运费 <b>￥0.00</b>）</span>
            </div>
        </div>
    </div>
    <div class="order-modules-statistics">
        <div class="order-totalPrice">
            <ul>
                <li class="order-cancel">删除订单</li>

            </ul>
        </div>
    </div>`
            goodsHTML=''
            num=0;
            sum=0;
            $('.order-cancel').on('click',function(){
                $('.model-comfirm')[0].style.display='block'
            });
            $('.no')[0].addEventListener('touchstart',function(){
                $('.model-comfirm')[0].style.display='none'
            },false);
            $('.yes')[0].addEventListener('touchstart',function(){
                $('.model-comfirm')[0].style.display='none'
            },false);
//                $('.order-cancel')[0].addEventListener('touchstart',function(){
//
//                    $('.model-comfirm')[0].style.display='block'
//                },false);
        }
    }
})