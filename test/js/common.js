window.oMshop = {};
window.shopAjax = {
  config: {
    API_PREFIX: "http://h6.duchengjiu.top/shop/",
    PAGESIZE: 10,
    USER_TOKEN: 'token',
    CART_PREFIX: 'cart_',//在本地存储商品ID和对应数量的时候使用
  },
  api: {
    fetchGoodsCategory: function(callback){
      // $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
      $.ajax({
        url: shop.config.API_PREFIX + 'api_cat.php?format=jsonp',
        dataType: 'jsonp',
        jsonpCallback: "getCategory",
        success: callback
      });
    },
    fetchGoodsListByCatId: function(cat_id, page, pagesize, callback){
      var data = {
        "cat_id": cat_id,
        "page": page,
        "pagesize": pagesize
      };
      $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
    },
    fetchGoodsDetail: function(goods_id, callback) {
      $.get(shop.config.API_PREFIX + 'api_goods.php', "goods_id="+goods_id, callback, 'json');
    },
    fetchHotGoods: function(page, pagesize, callback){
      $.get(shop.config.API_PREFIX + 'api_goods.php?page='+page+'&pagesize='+pagesize, callback, 'json');
    },
    searchGoods: function(opts){
      var data = {};
      data.search_text = opts.search_text;
      data.page = opts.page || 1;
      data.pagesize = opts.pagesize || shop.config.PAGESIZE;
      var callback = opts.callback;

      $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
    }
  }
};
// 滑动构造函数
oMshop.InitSlide = function(sideWidth,selector,mUnit) {
  return new Slide(sideWidth,selector,mUnit)
}
//分类页和搜索页的搜索框js动画效果
oMshop.lesser = function() {
  var focusLock = false;
  var scrollLock = false;
  $('.search-input input').focus(function() {
    focusLock = true;
    $('#logo').hide();
    $('#header-area').hide();
    $('#user').hide();
    $('.go-back-home').hide();
    $('#go-search').show(300);
    $('#go-back').show(300);
    $('.search-bc').fadeIn(300);
    $('.search-prompt').show(100);
  })
  $(document).click(function(event) {
    var target = event.target;
    if(target.className === 'search-bc' || target.id === 'go-back') {
      $('#go-search').hide(200);
      $('#go-back').hide(200);
      $('.search-bc').fadeOut(300);
      $('.search-prompt').hide(100);
      $('.go-back-home').show(300);
      $('#user').show(300);
      if(scrollLock) return;
      $('#logo').show(300);
      $('#header-area').show(300);
    }
  })

  window.onscroll = changeStyle;
  var rgba = [0,0,0,0.6];
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
}
// 价格区间
oMshop.priceRange = function() {
  $('#price-dropdown')[0].plag = true;
  $('#price-dropdown')[0].addEventListener('touchstart', function(event) {
    this.plag ? $('.price-container').fadeIn(400) : $('.price-container').hide()
    this.plag = this.plag ? false : true;

    // $('.price-container').show();
  })

  $('.price-container')[0].addEventListener('touchstart', function(event) {
    var target = event.target;
    console.log(target)
    if( target.id === 'list-style') {

    }
    if(target.nodeName === 'LI') {
      console.log('li')
      var data = target.innerText;
      console.log(data)
      var minObj = data.match(/(\d+)-/);
      var maxObj = data.match(/-(\d+)/);
      minprice = parseInt(minObj[1]);
      maxprice = parseInt(maxObj[1]);
      if(maxprice < 300) {
        maxpage = 20;
      } else {
        maxpage = 20;
      }
      // console.log(min,max)
      goodsInit();
    }
    if(target.className === 'confirm') {
      minprice = parseInt($('.self-custom .input-min input')[0].value);
      maxprice = parseInt($('.self-custom .input-max input')[0].value);
      if(isNaN(maxprice)) {
        maxprice = 10000000;
      }
      if(isNaN(minprice)) {
        minprice = 0
      }
      console.log(minprice);
      if(maxprice < 300) {
        maxpage = 50;
      } else {
        maxpage = 20;
      }
      // console.log(min,max);
      goodsInit();
    }
  })
  $('#alexa-rank')[0].addEventListener('touchstart', function() {
    minprice = 0;
    maxprice = 1000000000;
    goodsInit();
  })
}

//改变商品的布局
oMshop.changeStyle = function() {
  $('#list-style')[0].addEventListener('touchstart', function() {
    console.log($(this).attr('class'))
    var nowClass = $(this).attr('class');
    var nowStyle = $('.ts-body ul').attr('class');
    if(nowClass.match(/icon-box1$/g)) {
      $(this).removeClass(nowClass).addClass('iconfont icon-list');
      $('.ts-body ul').removeClass(nowStyle).addClass('style2');
      goodsInit();
    }
    if(nowClass.match(/icon-list$/g)) {
      $(this).removeClass(nowClass).addClass('iconfont icon-box')
      $('.ts-body ul').removeClass(nowStyle).addClass('style3')
      goodsInit();
    }
    if(nowClass.match(/icon-box$/g)) {
      $(this).removeClass(nowClass).addClass('iconfont icon-box1')
      $('.ts-body ul').removeClass(nowStyle).addClass('style1')
      goodsInit();
    }
  })
}
//接收页面传值的方法
oMshop.getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var result = search.match(reg);
  return result === null ? null : decodeURIComponent(result[2]);
}
// 搜索(功能)和搜索提示
oMshop.goSearch = function() {
  $('#search-input').keydown(function(event) {
    var event = event || window.event;
    if(event.keyCode === 13) {
      location.href = 'search.html?search_text=' + this.value;
      this.value = '';
    }
  })
  $('#go-search')[0].addEventListener('touchstart', function() {
    $('#search-input').focus();
    if($('#search-input')[0].value != ''){
      location.href = 'search.html?search_text=' + $('#search-input')[0].value;
      $('#search-input')[0].value = '';
    } else {
      location.href = 'search.html?search_text=' + $('#search-input').attr('placeholder');
      // $('#search-input')[0].value = '';
    }
  })
  searchPrompt();
  function searchPrompt() {
    if(!localStorage.searchObject) {
      var searchObject = {"data": ['杯子','蓝牙','相机','笔','零食','椅子']};
      var templateSearch = $('#temsearch').html();
      var html = ejs.render(templateSearch, searchObject)
      $('#search-prompt')[0].innerHTML = html;
      if(searchObject.data.indexOf($('#search-input').attr('placeholder')) === -1) {
        searchObject.data.shift();
        searchObject.data.push($('#search-input').attr('placeholder'));
      }
      localStorage.setItem('searchObject',  JSON.stringify(searchObject));
      return;
    }
    var searchObject = JSON.parse(localStorage.searchObject);
    // $('#search-input').attr('placeholder', 
    //   searchObject.data[parseInt(Math.random()*(searchObject.data.length))]);
    var templateSearch = $('#temsearch').html();
    var html = ejs.render(templateSearch, searchObject)
    $('#search-prompt')[0].innerHTML = html;
  }
}
// 搜索框的js动画效果
oMshop.searchContainer = function() {
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
}
oMshop.afterLoginSkip = function() {
  $('#user').on('touchstart',function() {
    if(localStorage.token) {
      checkCart();
    } else {
      location.href = 'login.html'
    }
  });
  function checkCart() {
    $.ajax({
      url: 'http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token,
      type: 'GET',
      success: function(json) {
        console.log(json);
        if(json.code === 0) {
          location.href = 'message.html';
        } else {
          location.href = 'login.html';
        }
      }
    })
  }
}


// DOM加载完成让prestrain这个盒子消失；
oMshop.prestrain = function() {
  document.addEventListener("DOMContentLoaded", function(event) {
    $('.prestrain').hide();
  })
}
//footer-nav
oMshop.footerNav = function() {
  $('#footer-nav').on('touchstart', function(event) {
    var target = event.target;
    if(target.id === 'L-home') {
      location.href = 'index.html';
    }
    if(target.id === 'L-cart') {
      location.href = 'cart.html';
    }
    if(target.id === 'L-order') {
      location.href = 'order.html';
    }
  })
}
//搜索页面返回主页
oMshop.backHome = function() {
  $('#go-back-home')[0].addEventListener('touchstart', function() {
    location.href = 'index.html'
  })
}
oMshop.modalPrompt = function(text) {
  $('#model-comfirm h1').html(text);
  $('#model-comfirm').fadeIn(400);
  $('#model-comfirm').delay(400).fadeOut(500);
}
// 回到顶部
oMshop.backToTop = function() {
  window.addEventListener('scroll', backToTop)
  function backToTop() {
    var scrollTop = document.body.scrollTop;
    if(scrollTop > 200) {
      $('.back-top').stop(true).fadeIn()
    } else {
      $('.back-top').stop(true).fadeOut(1000)
    }
  }

  $('.back-top')[0].addEventListener('touchend', function() {
    $('body')[0].scrollTop = 0;
  })
}


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

    // event.preventDefault();

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

    // event.preventDefault();

    self.s = self.movearr[self.movearr.length - 1] - self.movearr[self.movearr.length - 2];

    self.targetx = self.nowX + 2 *  self.s;
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

    self.$ul.css('transition', "none");

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
