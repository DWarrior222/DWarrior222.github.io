$("#loading").mouseenter(function(){
  $(document).mousewheel(function(event) {
    event.preventDefault();
  })
});




var index = 0;
var $container = $('#container');
var INARRAY = [];
var OUTARRAY = [];
OUTARRAY[0] = function() {
  $('.page0 h1').hide(500);  //fadeOut,,,都属于hide；
}
OUTARRAY[1] = function() {
  $('.page1 .first').hide(300,function() {
    $('.page1 .first').css('left',-600);
  })
}
OUTARRAY[4] = function() {
  $('.page4 .first').hide(300,function() {
    $('.page4 .first').css('left',-600);
  });
}
OUTARRAY[2] = function() {
  $('.page2 .first').hide(300,function() {
    $('.page2 .first').css('left',-600);
  })
}
OUTARRAY[3] = function() {
  $('.page3 .first').hide(300,function() {
    $('.page3 .first').css('left',-600);
  });
}



//隐藏的东西，要让它出现。
INARRAY[0] = function() {
  $('.page0 h1').show(300);
}
INARRAY[1] = function() {
  $('.page1 .first').show(300).animate({'left':104},600);
  $.each($('.page1 .storycont'),function(index,elem) {
    $('.page1 p').eq(index).delay(index * 1600).animate({'opacity':'1'},300);
    $('.page1 .storycont').eq(index).delay(index * 1600).animate({'width':'100%'},1600)
  })
  //delay延时方法；
}

INARRAY[2] = function() {
  $('.page2 .first').show(300).animate({'left':104},600);
  $.each($('.page2 .storycont'),function(index,elem) {
    console.log(index,elem)
    $('.page2 p').eq(index).delay(index * 1600).animate({'opacity':'1'},300);
    $('.page2 .storycont').eq(index).delay(index * 1600).animate({'width':'100%'},1600)
  })
}

INARRAY[3] = function() {
  $('.page3 .first').show(300).animate({'left':104},600);
  $.each($('.page3 .storycont'),function(index,elem) {
    console.log(index,elem)
    $('.page3 p').eq(index).delay(index * 1600).animate({'opacity':'1'},300);
    $('.page3 .storycont').eq(index).delay(index * 1600).animate({'width':'100%'},1600)
  })
}
INARRAY[4] = function() {
  $('.page4 .first').show(300).animate({'left':104},600);
}



var loadings = false;

//Jquery mousewheel事件，需要官方插件，兼容性已解决；
$(document).mousewheel(function(e) {
  //判断动画是否存在
  if($container.is(':animated')) return;
  if(!loadings) return;
  var oldIndex = index;
  index -= e.deltaY;
  if(index < 0) {
    index = 0;
  } else if(index > 4) {
    index = 4;
  }
  //滚轮事件中，当index改变时，才让内容隐藏；
  if(oldIndex !== index) {
    //判断一下当数组中存在这个隐藏函数时，才会执行，
    if(typeof OUTARRAY[oldIndex] === 'function'){
      OUTARRAY[oldIndex]();
    }
    $container.animate({'top':-100 * index + '%'},600,function() {
     if(typeof INARRAY[index] === 'function'){
        INARRAY[index]();
      }
    });
  }
});

$('.page0 .fictory-theme').each(function() {
  $(this).css({
    'top': $(this).index() * 84 + 20
  })
})

//用一下函数截流；
var themeBoxLock = true;
$('.theme-box').mousedown(function() {
  $(this).mousemove(rock);
})
rock.call($('.theme-box')[0]);
function rock() {
  if(!themeBoxLock) return;
  // console.log(111111);
  themeBoxLock = false;
  this.rotate = 0;
  this.rotateMax = 20;
  this.oldRotateMax = 20;
  this.flag = 1;
  this.timer = setInterval( () => {
    this.rotate += 0.5 * this.flag;
    if(this.rotateMax < 2) {
      clearInterval(this.timer);
      $(this).css({
        'transform': 'rotate(' + 0 + 'deg)'
      })
      $(this).unbind('mousemove');
      themeBoxLock = true;
      return;
    }
    if(this.rotate >= this.oldRotateMax) {
      this.rotateMax -= 3;
      this.flag = -this.flag;
    }
    if(this.rotate <= -this.rotateMax) {
      this.oldRotateMax -= 3;
      this.flag = -this.flag;
    }
    $(this).css({
      'transform': 'rotate(' + this.rotate + 'deg)'
    })
  },20)
}

var loadNumber = 0;

var images = [
  'images/fistory1.jpg',
  'images/fistory6.jpg',
  'images/fistory3.jpg',
  'images/fistory4.jpg',
  'images/fistory5.jpg',
  'images/fistory8.jpg',
  'images/moon1.png',
  'images/moon2.png',
  'images/fictory1.gif',
  'images/fictory2.gif',
  'images/tu2.gif',
  'images/moon1.png',
  'images/moon2.png',
  'images/moon3.png',
  'images/moon4.png',
  'images/moon5.png'
];
var $progress = $('.progress');
$.each(images, function(i,src) {
  var image = new Image();
  image.src = src;
  $(image).on('load',function() {
    loadNumber++;
    console.log(loadNumber)
  })
})
$progress[0].timer = setInterval(function() {
  $progress.html(Math.round(loadNumber / 17 *100) + '%');
  if (loadNumber >= 17) {
    $('.loading').hide();
    loadings = true;
    clearInterval($progress[0].timer);
  }
},50)






var templateString = `
  <span data-select="A"><%=A%></span>
  <span data-select="B"><%=B%></span>
  <span data-select="C"><%=C%></span>
  <span data-select="D"><%=D%></span>
  <input type="hidden" />
`;
var compileFunction = _.template(templateString);

var questionNumber;

var queIndex = 0;

var rightNumber = 0;

var personalSelect = [];

var rightSelect = [];

loadQuestion();

function loadQuestion() {

  var x = parseInt(Math.random() * 3) + 1;

  $.get('json/json' + x + '.txt?a=' + Math.random(),function(json) {

    var json = eval('(' + json +')');

    var data = json.data;

    console.log(data);

    for(var i = 0; i < data.length; i++ ) {
      //题目数量；
      if(i === data.length - 1) {
        loadNumber++;
      }
      questionNumber = i + 1;
      //正确的答案
      rightSelect.push(data[i].right)

      var $quecont = $('<div class="que_cont"></div>')

      $quecont.addClass('que_cont' + i);

      $quecont.appendTo($('.que_cont_box'));

      var $question = $('<div class="question"></div>')

      $question.html(data[i].question)

      $question.appendTo($('.que_cont' + i));

      var $answers = $('<div class="answers"></div>')

      $answers.html(compileFunction(data[i].answers));

      $answers.appendTo($('.que_cont' + i));

      // console.log(loadNumber++);
    }
  })
}

$('.page4 .wrap_box').click(function(e) {

  var e = e || window.event;

  var target = e.target || e.srcElement;

  if(target.nodeName === 'SPAN') {

    $(target).addClass('cur').siblings().removeClass('cur');

    $(target).siblings('input')[0].value = $(target).data('select');
      // console.log($(target).siblings('input')[0].value);
  }
})

$('.btn').click(function() {
  if($(this).data('type') === 'submit') {
    personalSelect = [];

    $('input').each(function() {
      if(this.value != '')
      personalSelect.push(this.value);
    })
    console.log(personalSelect);
    if(personalSelect.length != questionNumber) {
      $('.prompt').html('请完成所有题目')
      return;
    }
    for(var i = 0; i < rightSelect.length; i++ ) {
      if(personalSelect[i] === rightSelect[i]) {
        rightNumber++;
      }
    }
    // console.log(personalSelect)
    // console.log(rightNumber);

    if(rightNumber / questionNumber >= 0.6) {
      console.log(rightNumber);
      $('.page4 .wrap_box').html('恭喜您答对了' + rightNumber + '道题,获得一次抽奖机会');
      $('<a href="test.html">去抽奖</a>').appendTo('.page4 .wrap_box');
    } else {
      $('.page4 .wrap_box').html('您答对了' + rightNumber + '道题,很遗憾您没有获得抽奖机会');
    }
  }
  if($(this).data('type') === 'add') {
    $('.prompt').html('');
    queIndex = Math.min(questionNumber - 1, ++queIndex)
    $('.que_cont_box').stop(true).animate({'top': -300 * queIndex},300)
  }

  if($(this).data('type') === 'sub') {
    $('.prompt').html('');
    queIndex = Math.max(0, --queIndex)
    $('.que_cont_box').stop(true).animate({'top': -300 * queIndex},300)
  }
})
var opa = 1;
var plag = -1;
var timer = setInterval(function() {
  opa += 0.1 * plag;
  if(opa < 0 || opa > 1) {
    plag = -plag;
  }
  $('#btn_box .btn-control').css({'opacity': opa})
},200)
$('#btn_box').mouseenter(function() {
  $(this).stop(true).animate({'bottom': '0'},300);
})
$('#btn_box').mouseleave(function() {
  $(this).stop(true).animate({'bottom': '-50'},300);
})



$.fn.draggable = function(){
  for (var i = 0; i < this.length; i++) {
    this[i].onmousedown = function(event){
      event = event || window.event;
      var deltaX = event.clientX - this.offsetLeft;
      var deltaY = event.clientY - this.offsetTop;
      this.style.position = 'absolute';
      document.onmousemove = event => {
        event = event || window.event;
        this.style.top = event.clientY - deltaY + 'px';
        this.style.left = event.clientX - deltaX + 'px';
      }
    }
    document.onmouseup = function(event) {
      document.onmousemove = null;
    }
  }
}

var oScore = document.querySelectorAll('h1')[0];
var oTime  = document.querySelectorAll('h1')[1];
var oLevel = document.querySelectorAll('h1')[2];
var oLevelScores = document.querySelectorAll('h1')[3];
//气球的初始化，移动和消失；
function Ballon() {
  this.left = Math.random()*1100;
  this.top = -100;
  this.speed = 50;
  this.dom = null;
  this.score = parseInt(Math.random() * 10) + 1;
  this.init();
  this.fly();
  this.bindEvent();
  this.clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
}
Ballon.prototype.bindEvent = function() {
  var self = this;
  this.dom.onmouseenter = function() {
    clearInterval(this.timer);
  }
  this.dom.onmouseleave = function() {
    self.top = parseInt($(this).css('top'));
    self.fly();
  }
}
// Ballon.prototype = new Game();
Ballon.prototype.init = function() {
  this.dom = document.createElement('div');
  this.dom.className = 'ballon';
  this.$ballon = $(this.dom)
  this.$ballon.draggable();
  document.body.appendChild(this.dom);
  this.dom.style.left = this.left + 'px';
  this.dom.style.top = this.top + 'px';
  var x = parseInt(Math.random() * 5) + 1
  this.dom.style.backgroundImage = 'url(images/moon' + x + '.png)'
  var self = this;

  //初始化的方法中this.dom 表示创建的气球；
  /*this.dom.onclick = function() {
    self.destroy();
  }*/
}
Ballon.prototype.fly = function() {
  this.dom.timer = setInterval(function() {
    this.top += 3;
    if(this.top > this.clientHeight) {
      this.destroy();
    }
    this.dom.style.top = this.top + 'px';
  }.bind(this),this.speed)
}
Ballon.prototype.destroy = function() {
  clearInterval(this.dom.timer);
  this.dom.parentNode.removeChild(this.dom)
}


function Game() {
  this.time = 15;
  this.ballons = [];
  this.delay = 20300
  this.endelem = document.querySelector('#end');
  this.start();
  // this.level();
  // this.gameover();
  this.endelem.onclick = () => {
    clearInterval(this.timer);
  }
}
Game.prototype.start = function() {
  clearInterval(this.timer)
  self = this;
  this.timer = setInterval(function() {
    self.ballons.push(new Ballon());
  },self.delay)
}
var game = new Game();

 $('.first').draggable();
//倒计时：
var fictoryDate = new Date('2017,10,4');
fictoryDateTime = fictoryDate.getTime();
$('.time')[0].timer = setInterval(function() {
  var date = new Date();
  var dateTime = date.getTime();
  var allTime = (fictoryDateTime - dateTime) / 1000 / 60 / 60 / 24;
  var countDownDays = Math.floor(allTime);
  var countDownHours = Math.floor((allTime - countDownDays) * 24);
  var countDownMinutes = Math.floor(((allTime - countDownDays) *24 - countDownHours) * 60);
  // console.log(countDownMinutes);
  var countDownSeconds = Math.floor(((((allTime - countDownDays) * 24 - countDownHours) * 60 - countDownMinutes) * 60))
  console.log(countDownSeconds);
  $('.time span').eq(0).html('0' + countDownDays);
  $('.time span').eq(1).html(countDownHours);
  $('.time span').eq(2).html(countDownMinutes);
  $('.time span').eq(3).html(countDownSeconds);
},1000)