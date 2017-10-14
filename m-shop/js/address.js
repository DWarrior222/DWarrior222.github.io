localStorage.token = '99bfff02c56723f80edefe176c11ea1a';
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
                <div class="col-xs-10" id="toCheckout" data-address_id=${address_id} data-consignee=${consignee} data-province=${province} data-city=${city} data-district=${district} data-address=${address} data-mobile=${mobile} data-zip_code=${zip_code}>
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
                    localStorage.nowAddress_id = this.dataset.address_id
                    $('.modle').css({'display':'flex'});
                        var mobleInputs = document.querySelectorAll('.modle input');

                        mobleInputs[0].value = this.dataset.consignee;
                        mobleInputs[1].value = this.dataset.mobile;
                        mobleInputs[2].value = this.dataset.province;
                        mobleInputs[3].value = this.dataset.city;
                        mobleInputs[4].value = this.dataset.district;
                        mobleInputs[5].value = this.dataset.address;
                                               
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
        prevButton: '.save-use',
    })



    //click


    document.querySelector('.back-icon-wrapper').addEventListener('click', function(){
        location.href = 'checkout.html';
    })
    document.querySelector('.footer').addEventListener('click', function(){
        this.style.display = 'none';
        $('.manage').html('新建收货地址');
    })

    // document.querySelector('.modle').addEventListener('click',(function(){
    //     $('.modle').css({'display':'none'});
    // }));

    // document.querySelector('.modle .box').addEventListener('click',function(){
    //     $(this).css('display','table');
    // })

    document.querySelector('.save-use').addEventListener('click',function(){
        $('.footer').css({'display':'flex'});
        $('.manage').html('管理收货地址');
    })
    
    document.querySelector('.change').addEventListener('click', function(){
        $('.modle').css({'display':'none'});
        var modleInputs = document.querySelectorAll('.modle input');
        var changeConsinee = modleInputs[0].value;
        var changeMobile = modleInputs[1].value;
        var changeProvince = modleInputs[2].value;
        var changeCity = modleInputs[3].value;
        var changeDistrict = modleInputs[4].value;
        var changeAddress = modleInputs[5].value;
        console.log(modleInputs);
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
        console.log(newConsignee);
        var newMobile = $('.newMobile').val();
        console.log(newMobile);
        var newAddress = $('.newAddress').val();
        // if(!newConsignee && !newMobile && !newAddress){
        //     alert('请输入完整信息');
        //     return
        // }
        console.log(newAddress);
        $.ajax(`http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token=${localStorage.token}`, {
            'type':'post',
            'data':{
                // 'status':'add',
                // 'token':localStorage.token,
                'consignee': newConsignee,
                'mobile': newMobile,
                'address':newAddress,
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
        location.href = 'three-level-area.html'
    })
    
    
}
