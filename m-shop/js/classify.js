oMshop.changeNavClass = function() {
  var cat_id = parseInt(oMshop.getQueryString('cat_id'));
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
      oMshop.InitSlide(0,'.L-header','#unit');
      $('.nav-box .unit ul li span.'+ cat_id).addClass('cur');
    }
  })
}
var cat_id = parseInt(oMshop.getQueryString('cat_id'));
var minprice = 0;
var maxprice = 1000000000;
var page = 1;
var maxpage = 5;
var addPageLock = true;
window.addEventListener('scroll' , addGoods)
function addGoods(event,callback) {
  var scrollTop = document.body.scrollTop;
  console.log(scrollTop)
  console.log($('.L-body').css('height'))
  var bodyHeight = parseInt($('.L-body').css('height'));
  console.log(scrollTop / bodyHeight)
  if(scrollTop / bodyHeight > 0.3) {
    requestAjax();
  }
}
function requestAjax(callback) {
  if(!addPageLock) return;
  addPageLock = false;
  setTimeout(function() {
    addPageLock = true;
  },200);
  page++;
  console.log('page:'+page);
  $.ajax({
    url: 'http://h6.duchengjiu.top/shop/api_goods.php?format=jsonp&callback=againfun'+page,
    dataType: 'jsonp',
    data: {cat_id:cat_id,page:page},
    jsonpCallback: 'againfun'+page,
    success: function(json) {
      newjson.data = [];
      var json = json;
      var data = json.data;
      for(var i = 0; i < data.length; i++) {
        if((data[i].price >= minprice) && (data[i].price <= maxprice)) {
          newjson.data.push(data[i]);
        }
      }
      if(json.code === 1) {
        callback && callback();
      }
      console.log(json);
      var html = ejs.render(templateString, newjson)
      $('.ts-body ul')[0].innerHTML += html;
      $('.ts-body .style1 li').css('height', parseInt($('.ts-body li').css('width')) + 72 + 'px')
      // $('body').css('background', 'red');
    }
  })
}

// 首页的商品
var newjson = {}
newjson.data = [];
var templateString = $('#tem').html();
console.log(templateString);
goodsInit();
function goodsInit() {
  $('.ts-body ul')[0].innerHTML = '';
  for(page = 1; page < maxpage; page++ ) {
    $.ajax({
      type: 'GET',
      url: 'http://h6.duchengjiu.top/shop/api_goods.php?format=jsonp&callback=initfun'+page,
      dataType: 'jsonp',
      jsonpCallback: 'initfun'+page,
      data: {cat_id:cat_id,page:page},
      success: function(json) {
        newjson.data = [];
        var json = json;
        console.log(json);
        var data = json.data
        for(var i = 0; i < data.length; i++) {
          if((data[i].price >= minprice) && (data[i].price <= maxprice)) {
            newjson.data.push(data[i]);
          }
        }
        var html = ejs.render(templateString, newjson)
        $('.ts-body ul')[0].innerHTML += html;
        $('.ts-body .style1 li').css('height', parseInt($('.ts-body li').css('width')) + 72 + 'px')
      }
    })
  }
}
$('.again-load')[0].addEventListener('touchstart', function() {
  page++;
  requestAjax(overCallback);
})
function overCallback() {
  $('#model-comfirm').fadeIn(400);
  $('#model-comfirm').delay(400).fadeOut(500);
}
oMshop.goSearch()
oMshop.lesser();
oMshop.backToTop();
oMshop.changeStyle();
oMshop.prestrain()
oMshop.backHistory();
oMshop.priceRange();
oMshop.changeNavClass();
oMshop.footerNav();
oMshop.afterLoginSkip();