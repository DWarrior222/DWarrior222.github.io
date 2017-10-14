// 轮播图
oMshop.setCarousel = function() {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 5000,
    loop: true,
    pagination : '.swiper-pagination'
  })
  var liWidth = parseInt($('#carousel-box li').css('width'));
  console.log(liWidth);
  var liHeights = liWidth * 0.483
  $('#carousel-box li').each(function() {
    console.log($(this))
    $(this)[0].style.height = liHeights + 'px';
  })
  $('#carousel-box')[0].addEventListener('touchstart', function() {
    $(this).css('transition','none');
  })
  $('#carousel-box')[0].addEventListener('touchend', showbcimg)
  $('#carousel-box')[0].addEventListener('touchmove', slideDirection)
  var movearr = [];
  function slideDirection(event) {
    // var nowX = [0,0];
    // nowX[0] = event.touches[]
    console.log(event);
    movearr.push(event.touches[0].clientX);
  }
  function showbcimg() {
    $('#carousel-box').css({'transition-property': "all"});
    var url;
    if(movearr[movearr.length-1] - movearr[movearr.length-2] < 0) {
      url = $('#carousel-box .swiper-slide-next img').attr('src');
    } else {
      url = $('#carousel-box .swiper-slide-prev img').attr('src');
    }
    $('#bcimg')[0].src = url;
  }
}

// 头部的地区选择
oMshop.setHeaderArea = function() {
  if(localStorage.nowAddressIndex != returnCitySN['cname']) {
    $('#model-comfirm #wrap #box h1').html('地址发生变化，是否重新获取地址');
    $('#model-comfirm').show();
  } else {
    $('#header-area').html(localStorage.nowAddressIndex);
    $('.area-position-cont li').html(localStorage.nowAddressIndex);
  }
  if(!localStorage.nowAddressIndex) {
    $('#model-comfirm #wrap #box h1').html('受否同意获取地址');
    $('#model-comfirm').show();
  } else {
    $('#header-area').html(localStorage.nowAddressIndex);
    $('.area-position-cont li').html(localStorage.nowAddressIndex);
  }
  // $('#model-comfirm').show();
  $('#model-comfirm').click(function(event) {
    var target = event.target;
    if(target.id === 'yes') {
      // getAddress = returnCitySN['cname'];
      localStorage.nowAddressIndex = returnCitySN['cname']
      $('#header-area').html(returnCitySN['cname']);
      $('.area-position-cont li').html(returnCitySN['cname']);
      toast('当前定位城市:' + returnCitySN['cname'] ,2000);
      $(this).hide();
    }
    if(target.id === 'no') {
      $(this).hide();
    }
  })

  $('#header-area')[0].addEventListener('click', function() {
    $('.L-area').show(200);
    $('.area-bc').show(200);
  })

  $('.L-area')[0].addEventListener('click', function(event) {
    var target = event.target;
    if(target.id === 'area-close') {
      $('.L-area').hide();
      $('.area-bc').hide();
    }
    if(target.nodeName === 'LI') {
      var area = $(target).html();
      $('#header-area').html(area);
      $('.L-area').hide();
      $('.area-bc').hide();
    }
  })
}

// 抢购
oMshop.panicCountdown = function() {
  var nowDate = new Date();
  var nowDay = nowDate.getDay();
  var nowMon = nowDate.getMonth();
  var panicStart = true;
  var panicEnd = true;
  // var panicDate = new Date(2017,nowMon,nowDay,19,0,0);
  console.log(getOverTime(2017,nowDay,nowDay,19,0,0));
  function getOverTime(Year,Mon,Day,Hou,Min,Sec) {
    var panicOver = new Date(Year,Mon,Day,Hou,Min,Sec);
    panicDateTime = panicOver.getTime();
    console.log(panicDateTime)
    var panictimer = setInterval(function() {
      var date = new Date();
      var dateTime = date.getTime();
      var allTime = (panicDateTime - dateTime) / 1000 / 60 / 60 / 24;
      var Days = Math.floor(allTime);
      var Hours = Math.floor((allTime - Days) * 24);
      var Minutes = Math.floor(((allTime - Days) *24 - Hours) * 60);
      // console.log(Minutes);
      var Seconds = Math.floor(((((allTime - Days) * 24 - Hours) * 60 - Minutes) * 60))
      // console.log(Seconds);
      // $('#panic-buying .pd-header em').eq(0).html('0' + Days);
      Days = Days < 10 ? '0' + Days : Days;
      Hours = Hours < 10 ? '0' + Hours : Hours;
      Minutes = Minutes < 10 ? '0' + Minutes : Minutes;
      Seconds = Seconds < 10 ? '0' + Seconds : Seconds;
      if(Hours <= 3 && panicStart) {
        panicEnd = true;
        panicStart = false;
        $('#panic-buying .pd-header i').html('16点快抢 · 距结束还有');
      } else if(Hours > 3) {
        Hours -= 3;
        Hours = Hours < 10 ? '0' + Hours : Hours;
        panicStart = true;
        if(panicEnd) {
          panicEnd = false;
          $('#panic-buying .pd-header i').html('16点快抢 · 距开抢还有');
        }
      }
      $('#panic-buying .pd-header em').eq(0).html(Hours);
      $('#panic-buying .pd-header em').eq(1).html(Minutes);
      $('#panic-buying .pd-header em').eq(2).html(Seconds);
    },1000)
  }
  var panicTem = $('#tem-panic').html();
  $.ajax({
    url: 'http://h6.duchengjiu.top/shop/api_goods.php?format=jsonp&callback=funpanic',
    dataType: 'jsonp',
    jsonpCallback: 'funpanic',
    data: {page:11},
    success: function(json) {
      var json = json;
      console.log(json);
      var html = ejs.render(panicTem, json)
      $('#panic-buying .swiper-wrapper').html(html);
      oMshop.InitSlide(0,'#L-body','#pd-m-unit');
    }
  })

}

// 首页的商品
oMshop.requestAjax = function() {
  var page = 1;
  var addPageLock = true;
  var templateString = $('#tem').html();
  console.log(templateString);
  recommendGoods();
  function recommendGoods() {
    $.ajax({
      url: 'http://h6.duchengjiu.top/shop/api_goods.php?format=jsonp&callback=fun',
      dataType: 'jsonp',
      jsonpCallback: 'fun',
      data: {page:page},
      success: function(json) {
        var json = json;
        console.log(json);
        var html = ejs.render(templateString, json)
        $('.ts-body ul')[0].innerHTML += html;
        $('.ts-body .style1 li').css('height', parseInt($('.ts-body li').css('width')) + 72 + 'px')
      }
    })
  }
  $('.again-load')[0].addEventListener('touchstart', function() {
    page++;
    recommendGoods();
  })
  window.addEventListener('scroll' , function(event) {
    var scrollTop = document.body.scrollTop;
    console.log(scrollTop)
    console.log($('.L-body').css('height'))
    var bodyHeight = parseInt($('.L-body').css('height'));
    console.log(scrollTop / bodyHeight)
    if(scrollTop / bodyHeight > 0.76) {
      if(!addPageLock) return;
      addPageLock = false;
      setTimeout(function() {
        addPageLock = true;
      },200);
      page++;
      console.log('page:'+page)
      if(page > 5) return;
      $.ajax({
        url: 'http://h6.duchengjiu.top/shop/api_goods.php?format=jsonp&callback=fun',
        dataType: 'jsonp',
        data: {page:page},
        jsonpCallback: 'fun',
        success: function(json) {
          var json = json;
          console.log(json);
          var html = ejs.render(templateString, json)
          $('.ts-body ul')[0].innerHTML += html;
          $('.ts-body .style1 li').css('height', parseInt($('.ts-body li').css('width')) + 72 + 'px')
          // $('body').css('background', 'red');
        }
      })
    }
  })
}

// 导航条内容
oMshop.navBar = function() {
  var templatenav = $('#temnav').html();
  $.ajax({
    url: 'http://h6.duchengjiu.top/shop/api_cat.php?format=jsonp&callback=navfun',
    dataType: 'jsonp',
    jsonpCallback: 'navfun',
    success: function(json) {
      var json = json;
      console.log(json);
      var html = ejs.render(templatenav, json);
      $('.nav-box .unit ul')[0].innerHTML += html;
      oMshop.InitSlide(0,'#L-body','#unit');
    }
  })
}

