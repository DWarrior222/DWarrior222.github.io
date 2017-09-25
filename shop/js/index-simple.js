var oUsername = document.querySelector('#username');
var oSpan = document.querySelector('#user-hello');
var oExit = document.querySelector('#exit');
var oRegister = document.querySelector('#user-register');
var oLogin = document.querySelector('#user-login')
if(localStorage.username) {
  oSpan.style.display = 'inline-block'
  oUsername.style.display = 'inline-block';
  oLogin.style.display = 'none'
  oRegister.style.display = 'none'
  oUsername.innerText = localStorage.username;
  oExit.style.display = 'inline-block';
  oSpan.innerText = sayHello();
} else {
  oRegister.style.display = 'block';
  oUsername.style.display = 'none';
  oSpan.style.display = 'none';
  oLogin.style.display = 'inline-block'
  oExit.style.display = 'none'
}

oExit.onclick = () => {
  localStorage.clear();
  loaction.reload();
}

var oInput = document.querySelector('input[name=search-box]');
var oMylegou = document.querySelector('#mylegou');

var oSideBar = document.querySelector('#side-bar');
var oToUp = new BackToTop('#to-up');

var oWrap = document.querySelector('#search-outer');
var oToUpIntro = document.querySelector('#to-up-intro')
oInput.onfocus = function() {
  oMylegou.style.display = 'none';
  this.classList.add('focus')
  var width = parseInt(this.clientWidth);
  console.log(width)
  var self = this;
  var timer = setInterval(function() {
    width += 50
    if(width > 800) {
      clearInterval(timer);
      self.style.width = 800 + 'px';
    }
    self.style.width = width + 'px';
  },20)
}
oInput.onblur = function() {
  this.classList.remove('focus')
  var width = parseInt(this.clientWidth);
  console.log(width)
  var self = this;
  var timer = setInterval(function() {
    width -= 50
    if(width <= 300){
      clearInterval(timer);
      self.style.width = 300 + 'px';
      oMylegou.style.display = 'block';
    }
    self.style.width = width + 'px';
  },20)
}

oSideBar.onclick = function(e) {
  e = e || window.event;
  target = e.target || e.srcElement;
  if(target.id === 'to-up') {
    oToUp;
  }
}
oSideBar.onmouseover = function(e) {
  e = e || window.event;
  target = e.target || e.srcElement;
  if(target.id === 'to-up') {
    if(oToUpIntro.isAnimated)return;
    animate(oToUpIntro,{'width':100,'left':-100},120,'CubicEaseInOut');
  }
}
oSideBar.onmouseleave = function(e) {
  if(oToUpIntro.isAnimated) return;
  animate(oToUpIntro,{'width':0,'left':0},120,'CubicEaseInOut');
}



var oFooter = document.querySelector('#footer')
var oUl = document.querySelector('#commodity-list');
var index = 1;
window.addEventListener('scroll', function() {
  oInput.blur();
  // e = e || window.event;
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if(scrollTop > 190) {
    oWrap.style.position = 'fixed';
    oWrap.style.background = 'rgba(255,255,235,0.8)';
  } else {
    oWrap.style.position = 'relative'
    oWrap.style.background = 'rgba(255,255,235,0.5)';
  }
})
window.addEventListener('scroll', function() {
  // e = e || window.event;
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if(scrollTop > 100) {
    oSideBar.style.display = 'block';
  } else {
    oSideBar.style.display = 'none';
  }
})



function sayHello() {
  var date = new Date();
  var hour = date.getHours();
  console.log(hour)
  if(hour >= 6 && hour < 9) {
    console.log(1);
    return('早上好！')
  } else if(hour >= 9 && hour < 12) {
    document.body.style.background = 'url("images/Morning_BGImage_v2.jpg") no-repeat 100% fixed';
    return('上午好！')
  } else if(hour >= 12 && hour < 15) {
    return('中午好！')
  } else if(hour >= 15 && hour < 18) {
    return('下午好！')
  } else if(hour >= 18 && hour < 21) {
    night();
    return('傍晚好！')
  } else {
    night();
    return('晚上好！')
  }
}
oSpan.innerText = sayHello();
function night() {
  // var oLis = oBox.querySelectorAll('li');
  //   for(var i = 0; i < oLis.length; i++ ) {
  //     oLis[i].className = 'night'
  //   }
    document.body.style.background = 'url("images/Evening_BGImage_v2.jpg") no-repeat 100% fixed';
}


function fetchComputedStyle(obj, property) {
  if (window.getComputedStyle) {
    property = property.replace(/[A-Z]/g, function(match){
      return '-' + match.toLowerCase();
    });
    return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
  } else {
    property = property.replace(/-([a-z])/g, function(match, $1){
      return $1.toUpperCase();
    });
    return obj.currentStyle[property];
  }
}