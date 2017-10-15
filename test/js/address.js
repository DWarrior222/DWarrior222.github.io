// localStorage.token = 'f6978c4e243bedeb8d629d4cd60c9ac7';
document.onreadystatechange = function() {
    // console.log(document.readyState);
    if(document.readyState == 'interactive'){
        var gif = document.createElement('img');
        gif.setAttribute('src','images/address-loading.gif');
        gif.setAttribute('class','gif');
        document.querySelector('.header').appendChild(gif);
    }
}
window.onload = function() {
    var token = localStorage.token;
    var toTop = null;
    var allJson = null;
    //ajax 请求并生成地信息
    $.ajax('http://h6.duchengjiu.top/shop/api_useraddress.php',{
        'type':'get',
        'data':{
            'token':token,
        },
        'success': function(json){
            $('.gif').css('display','none')
            console.log('success');
            var bottom_space = document.createElement('div');
            bottom_space.setAttribute('class','bottom_space');
            document.querySelector('.container').appendChild(bottom_space);
    
            var data = json.data;   
            localStorage.Address_data = data;
            console.log(data);
            for(var i = 0; i < data.length; i++){
                // console.log(i);
                var address_id = data[i].address_id;
                var address_name = data[i].address_name;
                var consignee = data[i].consignee;//收件人
                var province = data[i].province;//省
                var city = data[i].city;
                var district = data[i].district;//行政区
                var address = data[i].address;//地址
                var zip_code = data[i].zip_code;   //邮编
                var mobile = data[i].mobile; //电话
    
    
                var address_item = document.createElement('div');
                address_item.setAttribute('class','row address-item');
                document.querySelector('.container').appendChild(address_item);      
                      
                address_item.innerHTML = 
                `
                <div class="col-xs-10" id="toCheckout" data-address_id=${address_id} data-consignee=${consignee} data-province=${province}  data-city=${city}  data-district=${district}  data-address=${address}  data-mobile=${mobile}  data-zip_code=${zip_code}>
                    <div class="row " data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}>
                        <div class="col-xs-6 name" data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}>收货人:${consignee}</div>
                        <div class="col-xs-6 phone" data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}>${mobile}</div>
                    </div>
                    <div class="row" data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}>
                        <div class="col-xs-12 detailed" data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}>${province}${city}${district}${address}</div>
                    </div>
                </div>
                <div class="col-xs-2 point" data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}><img src="images/address-write.png" class="write" data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}></div>
                `
                // console.log(bottom_space);
                document.querySelector('.container').insertBefore(address_item,bottom_space);
                var oWrite = document.querySelectorAll('.write')[i];
                oWrite.addEventListener('click',function(){
                    console.log(localStorage.nowAddress_id);                    
                    localStorage.nowAddress_id = this.dataset.address_id;
                    var timer = setTimeout(function() {
                        $('.modle').css({'display':'flex'});
                        var mobleInputs = document.querySelectorAll('.modle input');

                        mobleInputs[0].value = localStorage.nowConsignee;
                        mobleInputs[1].value = localStorage.nowMobile;
                        mobleInputs[2].value = localStorage.nowProvince;
                        mobleInputs[3].value = localStorage.nowCity;
                        mobleInputs[4].value = localStorage.nowDistrict;
                        mobleInputs[5].value = localStorage.nowAddress;
                    }, 300);
                    
                                               
                });
            }   
            document.querySelectorAll('.address-item')[0].setAttribute('class','row address-item default')
            
            $('.address-item').click(function(){
                $('.address-item').eq($(this).index()).addClass('default').siblings().removeClass('default');
            });


            var toCheckouts = document.querySelectorAll('#toCheckout');

            for(var i = 0; i < toCheckouts.length; i++) {
                (function(j){
                    toCheckouts[j].addEventListener('click',function(){
                        var timer = setTimeout(function(){
                            location.href = 'checkout.html';
                        },500);
                    })
                }(i))
            }

        },
        'error':function(){
            console.log('error')
            console.log(arguments);        
        }
    });

    //swiper

    var swiperV = new Swiper('.swiper-containerV',{
        direction:'vertical',
        nextButton:'.footer',
        prevButton: toTop,
    })
    swiperV.disableTouchControl();
    swiperV.disableMousewheelControl();

    //click


    document.querySelector('.back-icon-wrapper').addEventListener('click', function(){
        location.href = 'checkout.html';
    })
    document.querySelector('.footer').addEventListener('click', function(){
        this.style.display = 'none';
        $('.manage').html('新建收货地址');
        localStorage.removeItem('provinceSwiper_realIndex');
        localStorage.removeItem('districtSwiper_realIndex');
        localStorage.removeItem('citySwiper_realIndex');
    })

    // document.querySelector('.modle').addEventListener('click',(function(){
    //     $('.modle').css({'display':'none'});
    // }));

    // document.querySelector('.modle .box').addEventListener('click',function(){
    //     $(this).css('display','table');
    // })

    
    document.querySelector('.change').addEventListener('click', function(){
        $('.modle').css({'display':'none'});
        var modleInputs = document.querySelectorAll('.modle input');
        var changeConsinee = localStorage.nowConsignee = modleInputs[0].value;
        var changeMobile = localStorage.nowMobile = modleInputs[1].value;
        var changeProvince = localStorage.nowProvince = modleInputs[2].value;
        var changeCity = localStorage.nowCity =modleInputs[3].value;
        var changeDistrict = localStorage.nowDistrict = modleInputs[4].value;
        var changeAddress = localStorage.nowAddress = modleInputs[5].value;
        $.ajax(`http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token=${localStorage.token}`,{
            'type':'post',
            'data':{
                'consignee': changeConsinee,
                'mobile': changeMobile,
                'province':changeProvince,
                'city':changeCity,
                'district':changeDistrict,
                'address':changeAddress,
            },
            'success':function(){
                $.ajax('http://h6.duchengjiu.top/shop/api_useraddress.php',{
                    'type': 'get',
                    'data':{
                        'status': 'delete',                        
                        'address_id' : localStorage.nowAddress_id,
                        'token' : localStorage.token,
                    },
                    'success':function(){
                        alert('更改成功!');
                        location.reload();
                    }
                })
            }
        })
        
    })
    document.querySelector('.delete').addEventListener('click',function(){
        $.ajax('http://h6.duchengjiu.top/shop/api_useraddress.php',{
            'type': 'get',
            'data':{
                'status': 'delete',                        
                'address_id' : localStorage.nowAddress_id,
                'token' : localStorage.token,
            },
            'success':function(){
                console.log(arguments);
            }
        })
        $('.modle').css({'display':'none'});
        location.reload();        
    })
    $('.save-use').click(function(){
        console.log($('form').serialize());
        
        
        var newConsignee = document.querySelector('.newConsignee').value;
        // console.log('newConsignee'+newConsignee);
        var newMobile = $('.newMobile').val();
        // console.log(newMobile);
        var newAddress = $('.newAddress').val();

        // var wheelAddress = $('.wheelAddress').html();
        // console.log(newAddress);
        console.log(localStorage.json);
        if(!newConsignee || !newMobile || !newAddress || !localStorage.provinceSwiper_realIndex){
            alert('请输入完整信息');
            return
        }
        else{
            toTop = '.save-use';
            // localStorage.nowProvince = localStorage.json[localStorage.provinceSwiper_realIndex].name;
            // localStorage.nowCity = localStorage.json[localStorage.provinceSwiper_realIndex].city[]
        }
        $('.footer').css({'display':'flex'});
        $('.manage').html('管理收货地址');
        console.log(newAddress);
        $.ajax(`http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token=${localStorage.token}`, {
            'type':'post',
            'data':{
                'consignee': newConsignee,
                'mobile': newMobile,
                'address':newAddress,
                'province' : allJson[localStorage.provinceSwiper_realIndex].name,
                'city' : allJson[localStorage.provinceSwiper_realIndex].city[localStorage.citySwiper_realIndex].name,
                'district' : allJson[localStorage.provinceSwiper_realIndex].city[localStorage.citySwiper_realIndex].area[localStorage.districtSwiper_realIndex],
            },
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            'success':function(){
                console.log(arguments);
                location.reload();
            },
            'error':function(){
                console.log(arguments);
            }
        })
    })

   
    document.querySelector('.address').onclick=function(event){
        var event = event || window.event;
        var target = event.target || event.srcElement;
        localStorage.nowAddress_id = target.dataset.address_id || localStorage.nowAddress_id;
        localStorage.nowConsignee = target.dataset.consignee || localStorage.nowConsignee;
        localStorage.nowProvince = target.dataset.province || localStorage.nowProvince;
        localStorage.nowCity = target.dataset.city || localStorage.nowCity;
        localStorage.nowDistrict = target.dataset.district || localStorage.nowDistrict;
        localStorage.nowAddress = target.dataset.address || localStorage.nowAddress;
        localStorage.nowMobile = target.dataset.mobile || localStorage.nowMobile;
        localStorage.nowZip_code = target.dataset.zip_code || localStorage.nowZip_code;
        // console.log(target.className)
    }
    document.querySelector('.chooseEare').addEventListener('click',function(){
        console.log('jump');
        $('.modle-eare').css({'display':'flex'});
        $.ajax({
            url:'json/json.txt?format=jsonp&callback=fun',
            dataType:'json',
            jsonpCallback:'fun',
            success:function(json) {
                console.log(json);
                provinceObj = json;
                // localStorage.json = json;
                allJson = json;
                province_wheel();
                city_wheel();
                district_wheel();
                function province_wheel(){
                    for(var i = 0; i < json.length; i++) {
                        document.querySelector('.province-wrapper').innerHTML += `<div class="swiper-slide">${json[i].name}</div>`
                    }
                    var provinceSwiper = new Swiper('.province-swiper',{
                        direction:'vertical',
                        loop:'loop',
                        // autoplayDisableOnInteraction : false,
                        initialSlide: 3,
                        mousewheelControl : true,
                        onTransitionEnd:function(provinceSwiper){
                        localStorage.provinceSwiper_realIndex = provinceSwiper.realIndex;
              
                            
                            city_wheel();
                            district_wheel();
                    
                            
                        }
                    })
                    localStorage.provinceSwiper_realIndex = provinceSwiper.realIndex;
                   
                    // provinceSwiper.wrapper.transtionEnd(function(){
                    //     console.log(provinceSwiper.realIndex);
                    // })
                    // var provinceTimer = window.setInterval(function(){
                    //     if(provinceSwiper.animating){
                    //         localStorage.provinceSwiper_realIndex = provinceSwiper.realIndex;
                    //         console.log('省懂了')
                    //         city_wheel();
                    //         district_wheel();
                    //     }
                    // },100)
                    
                }
                function city_wheel(){
                    document.querySelector('.city-wrapper').innerHTML = '';
                    for(var j = 0 ; j < json[localStorage.provinceSwiper_realIndex].city.length; j++){
                        document.querySelector('.city-wrapper').innerHTML +=  `<div class="swiper-slide">${json[localStorage.provinceSwiper_realIndex].city[j].name}</div>`;
                    }
    
                    var citySwiper = new Swiper('.city-swiper',{
                        direction:'vertical',
                        loop:'loop',
                        // autoplayDisableOnInteraction : false,
                        initialSlide: 0,
                        mousewheelControl : true,
                        onTransitionEnd:function(citySwiper){
                            localStorage.citySwiper_realIndex = citySwiper.realIndex;
                            // document.querySelector('.district-wrapper').innerHTML = '';                
                            district_wheel();
                    
                        }
                    })

                    localStorage.citySwiper_realIndex = citySwiper.realIndex;
                    
                    // clearInterval(cityTimer);
                    // var cityTimer = window.setInterval(function(){
                    //     if(citySwiper.animating){
                    //         localStorage.citySwiper_realIndex = citySwiper.realIndex;
                    //         console.log('市动了')
                    //         district_wheel();
                    //     }
                    // },500)
                }
                
                function district_wheel(){
                    document.querySelector('.district-wrapper').innerHTML = '';
                    for(var k = 0; k < json[localStorage.provinceSwiper_realIndex].city[localStorage.citySwiper_realIndex].area.length; k++) {
                        // console.log(json[provinceSwiper.realIndex].city[citySwiper.realIndex].area[k]);
                        document.querySelector('.district-wrapper').innerHTML += `<div class="swiper-slide">${json[localStorage.provinceSwiper_realIndex].city[localStorage.citySwiper_realIndex].area[k]}</div>`
                    }
    
                    var districtSwiper = new Swiper('.district-swiper',{
                        direction:'vertical',
                        loop:'loop',
                        autoplayDisableOnInteraction : false,
                        initialSlide: 0,
                        mousewheelControl : true,
                        onTransitionEnd:function(districtSwiper){
                            localStorage.districtSwiper_realIndex = districtSwiper.realIndex;
                    
                        }
                    })

                    localStorage.districtSwiper_realIndex = districtSwiper.realIndex;

                    
                    // var districtTimer= window.setInterval(function(){
                    //     if(district_wheel.animating){
                    //         console.log('县动了')
                    //         localStorage.districtSwiper_realIndex = districtSwiper.realIndex;
                    
                    //     }
                    // },500);
                }
                    

                $('.cancel').click(function(){
                    // console.log('cancel')
                    $('.modle-eare').css({'display':'none'});
                });
                $('.confirm').click(function(){
                    $('.modle-eare').css({'display':'none'});
                    // console.log('confirm');
                    $('.wheelAddress').html(json[localStorage.provinceSwiper_realIndex].name + ',' + json[localStorage.provinceSwiper_realIndex].city[localStorage.citySwiper_realIndex].name + ',' + json[localStorage.provinceSwiper_realIndex].city[localStorage.citySwiper_realIndex].area[localStorage.districtSwiper_realIndex]);                    
                })

                
            }
        })


    })
    
    
}
