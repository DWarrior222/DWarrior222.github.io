(function() {
    window.navslide = slide;

    function slide(sideWidth,selector) {

      var selector = selector || 'body';

      var sideWidth = sideWidth;

      var $unit = $('#unit');

      $ul = $('#unit ul');

      $lis = $('#unit ul li');

      var oLisLength = 0;

      $lis.each(function(index,value) {

        oLisLength += parseInt($(this).css('width'));
      })


      var windowWidth = document.querySelector(selector).clientWidth;

      console.log(windowWidth)

      var maxTransform = windowWidth - oLisLength - sideWidth;
      // console.log(maxTransform);
      var deltaX;

      var nowX = 0;

      var movearr = [];

      $unit[0].addEventListener('touchstart',function(event) {

        event.preventDefault();

        movearr = [];

        $ul.css('transition', "none");

        // console.log(1);
        console.log(event)

        // $('body').css({'background-color': 'blue'})

        deltaX = event.touches[0].clientX - nowX;


        console.log(deltaX)
      },false)

      $unit[0].addEventListener('touchmove', function(event) {

        if(maxTransform > 0) return;

        event.preventDefault();

        

        nowX = event.touches[0].clientX - deltaX;

        // console.log(nowX);

        // $ul.css('transform', "translateX(" + nowX + "px)");

        if(nowX > 0) {
          // console.log(nowX / 3)
          $ul.css('transform', "translateX(" + (nowX / 3) + "px)");

          $ul.css('webkitTransform', "translateX(" + (nowX / 3) + "px)");

        } if(nowX < maxTransform) {

          var slowX = nowX - maxTransform;
          console.log(maxTransform);
          $ul.css('transform', "translateX(" + (maxTransform + slowX / 2)+ "px)");

          $ul.css('webkitTransform', "translateX(" +  (maxTransform + slowX / 2) + "px)");
        } else if(nowX < 0 && nowX > maxTransform) {

          $ul.css('transform', "translateX(" + nowX + "px)");

          $ul.css('webkitTransform', "translateX(" + (nowX) + "px)");
        }

        movearr.push(event.touches[0].clientX);
      },false)
      $unit[0].addEventListener('touchend', function(event) {

        if(maxTransform > 0) return;

        event.preventDefault();

        

        var s = movearr[movearr.length - 1] - movearr[movearr.length - 2];

        var targetx = nowX + s;
        //console.log(nowX,s,targetx);
        if(targetx < maxTransform){

          targetx = maxTransform;

          //贝塞尔曲线有折返
          $ul.css('transition', "all 0.6s cubic-bezier(0.21, -0.57, 0.18, 1.35) 0s");

        }else if(targetx > 0){

          targetx = 0;

          $ul.css('transition', "all 0.6s cubic-bezier(0.21, -0.57, 0.18, 1.35) 0s");

        }else{

          $ul.css('transition', "all 0.6s cubic-bezier(0.21, -0.57, 0.18, 1.35) 0s");
        }
        //用过渡来实现
        $ul.css('transform', "translateX(" +  targetx + "px)");

        $ul.css('webkitTransform', "translateX(" +  targetx + "px)");

        //信号量的值就是目标x的值
        nowX = targetx;
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
  console.log(rgba);
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



// (function() {
//     //用模态框
//     // if(confirm('是否同意获取地址信息')) {
//       $('#header-area')[0].innerText = returnCitySN['cname'];
//       $('.area-position-cont li').html(returnCitySN['cname']);
//     // }
// })()

$('#header-area')[0].addEventListener('touchstart', function() {
  $('.L-area').show();
  $('.area-bc').hide();
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