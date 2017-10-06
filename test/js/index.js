(function() {
  window.Slide = Slide;

  function Slide(sideWidth,selector,mUnit) {

    this.selector = selector || 'body';

    this.sideWidth = sideWidth;

    this.$unit = $(mUnit);

    this.$ul = $(mUnit +' ul');

    this.$lis = $(mUnit + ' ul li');

    this.oLisLength = 0;
    // console.log(maxTransform);
    this.deltaX = 0;

    this.windowWidth = document.querySelector(selector).clientWidth;

    this.nowX = 0;

    this.movearr = [];

    this.handleData()

    this.bindEvent();
  }
  Slide.prototype.handleData = function() {
    var self = this;

    this.$lis.each(function(index,value) {

      self.oLisLength += parseInt(this.offsetWidth);
    })

    console.log(this.windowWidth)

    this.maxTransform = this.windowWidth - this.oLisLength - this.sideWidth;
  }
  Slide.prototype.bindEvent = function() {
    var self = this;

    this.$unit[0].addEventListener('touchstart',function(event) {

      event.preventDefault();

      self.movearr = [];

      self.$ul.css('transition', "none");

      // console.log(1);
      console.log(event)

      // $('body').css({'background-color': 'blue'})

      self.deltaX = event.touches[0].clientX - self.nowX;


      console.log(self.deltaX)
    },false)

    this.$unit[0].addEventListener('touchend', function(event) {

      if(self.maxTransform > 0) return;

      event.preventDefault();

      self.s = self.movearr[self.movearr.length - 1] - self.movearr[self.movearr.length - 2];

      self.targetx = self.nowX + self.s;
      //console.log(nowX,s,targetx);
      if(self.targetx < self.maxTransform){

        self.targetx = self.maxTransform;

        //贝塞尔曲线有折返
        self.$ul.css('transition', "all 0.6s cubic-bezier(0.21, -0.57, 0.18, 1.35) 0s");

      }else if(self.targetx > 0){

        self.targetx = 0;

        self.$ul.css('transition', "all 0.6s cubic-bezier(0.21, -0.57, 0.18, 1.35) 0s");

      }else{

        self.$ul.css('transition', "all 0.6s cubic-bezier(0.21, -0.57, 0.18, 1.35) 0s");
      }
      //用过渡来实现
      self.$ul.css('transform', "translateX(" +  self.targetx + "px)");

      self.$ul.css('webkitTransform', "translateX(" +  self.targetx + "px)");

      //信号量的值就是目标x的值
      self.nowX = self.targetx;
    },false)

    this.$unit[0].addEventListener('touchmove', function(event) {

      if(self.maxTransform > 0) return;

      event.preventDefault();

      

      self.nowX = event.touches[0].clientX - self.deltaX;

      // console.log(nowX);

      // $ul.css('transform', "translateX(" + nowX + "px)");

      if(self.nowX > 0) {
        // console.log(nowX / 3)
        self.$ul.css('transform', "translateX(" + (self.nowX / 3) + "px)");

        self.$ul.css('webkitTransform', "translateX(" + (self.nowX / 3) + "px)");

      } if(self.nowX < self.maxTransform) {

        self.slowX = self.nowX - self.maxTransform;
        console.log(self.maxTransform);
        self.$ul.css('transform', "translateX(" + (self.maxTransform + self.slowX / 2)+ "px)");

        self.$ul.css('webkitTransform', "translateX(" +  (self.maxTransform + self.slowX / 2) + "px)");
      } else if(self.nowX < 0 && self.nowX > self.maxTransform) {

        self.$ul.css('transform', "translateX(" + (self.nowX) + "px)");

        self.$ul.css('webkitTransform', "translateX(" + (self.nowX) + "px)");
      }

      self.movearr.push(event.touches[0].clientX);
    },false)
  }
})()



//轮播
//动态设置轮播的宽高
liHeight();
function liHeight() {
  var liWidth = parseInt($('#carousel-box li').css('width'));
  console.log(liWidth);
  var liHeights = liWidth * 0.483
  $('#carousel-box li').each(function() {
    console.log($(this))
    $(this)[0].style.height = liHeights + 'px';
  })
}


//轮播业务
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

//搜索框
// 两个锁，分别控制获取焦点和离开顶部时，元素的状态
var focusLock = false;
var scrollLock = false;
$('.search-input input').focus(function() {
  focusLock = true;
  $('#logo').hide();
  $('#header-area').hide();
  $('#user').hide();
  $('#go-search').show(300);
  $('#go-back').show(300);
  $('.search-bc').fadeIn(300);
  $('.search-prompt').show(100);
})

$('.search-input input').blur(function() {
  focusLock = false;
  changeStyle();
})
$(document).click(function(event) {
  var target = event.target;
  if(target.className === 'search-bc' || target.id === 'go-back') {
    $('#go-search').hide(200);
    $('#go-back').hide(200);
    $('.search-bc').fadeOut(300);
    $('.search-prompt').hide(100);
    $('#user').show(300);
    if(scrollLock) return;
    $('#logo').show(300);
    $('#header-area').show(300);
  }
})

// document.addEventListener('touchmove', changeStyle)
window.onscroll = changeStyle;
var rgba = [0,0,0,0.6];
// rgba(229, 105, 125, 1);
function changeStyle() {
  var scrollTop = document.body.scrollTop;
  console.log(scrollTop)
  if(scrollTop > 0 && scrollTop <= 100) {
    rgba[0] = parseInt(scrollTop * 2.29);
    rgba[1] = parseInt(scrollTop * 1.05);
    rgba[2] = parseInt(scrollTop * 1.25);
    rgba[3] = 0.6 + scrollTop * 0.004;
  } else if(scrollTop === 0) {
    rgba = [0,0,0,0.6];
  } else {
    rgba = [229, 105, 125, 1];
  }
  // console.log(rgba);
  var strRgba = rgba.toString();
  $('.L-header').css({'background': 'rgba(' + strRgba +')'})
  if(scrollTop != 0) {
    scrollLock = true;
    $('#logo').hide();
    $('#header-area').hide();
    $('.L-header').addClass('L-leave-header');
  } else {
    scrollLock = false;
    if(focusLock) return;
    $('#logo').show(300);
    $('#header-area').show(300);
    $('.L-header').removeClass('L-leave-header');
  }
}


// 不知道为什么手机百度打不开。
/*(function() {
    //用模态框
    if(confirm('是否同意获取地址信息')) {
      $('#header-area')[0].innerText = returnCitySN['cname'];
      $('.area-position-cont li').html(returnCitySN['cname']);
    // }
})()*/

// 解决上面的问题就是用时间委托。
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

// 是否同意获取地址信息
console.log(returnCitySN);
$('#model-comfirm').show();
$('#model-comfirm').click(function(event) {
  var target = event.target;
  if(target.id === 'yes') {
    // getAddress = returnCitySN['cname'];
    $('#header-area').html(returnCitySN['cname']);
    $('.area-position-cont li').html(returnCitySN['cname']);
    toast('当前定位城市:' + returnCitySN['cname'] ,2000);
    $(this).hide();
  }
  if(target.id === 'no') {
    $(this).hide();
  }
})




var page = 1;
var templateString = $('#tem').html();
console.log(templateString);
$.ajax({
      url: 'http://h6.duchengjiu.top/shop/api_goods.php?format=jsonp&callback=fun',
      dataType: 'jsonp',
      jsonpCallback: 'fun',
      success: function(json) {
        $('body').css('background', 'red');
      }
    })
// $.ajax('http://h6.duchengjiu.top/shop/api_goods.php',
//   {page:page},
//   function(json) {
//     var json = json;
//     $('.ts-body ul').html(ejs.render(templateString, json));
//     $('.ts-body .style1 li').css('height', parseInt($('.ts-body li').css('width')) + 72 + 'px')
      

//   })
var addPageLock = true;
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
    if(page > 5) return;
    $.get('http://h6.duchengjiu.top/shop/api_goods.php',
    {page},
    function(json) {
      var json = json;
      console.log(json);
      var html = ejs.render(templateString, json)
      $('.ts-body ul')[0].innerHTML += html;
      $('.ts-body .style1 li').css('height', parseInt($('.ts-body li').css('width')) + 72 + 'px')
    })
  }
})
// 首页的商品





// console.log(parseInt($('.ts-body li').css('width')));

// footer-nav
/*$('.footer-nav')[0].addEventListener('touchstart', function(event) {
  var target = event.target;
  if(target.className === 'iconhome') {
    $(target).attr('src', )
  }
})*/