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
  location.reload();
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
var oNav = document.querySelector('#nav');
var oNavUl = document.querySelector('#goods-list');
window.addEventListener('load', function() {
  myajax.get('http://h6.duchengjiu.top/shop/api_cat.php',{},function(error,responseText) {
    var json = JSON.parse(responseText);
    var data = json.data;

    for(var i = 0; i < data.length + 1; i++) {
      if(i === data.length) {
        oNavUl.innerHTML += `<li><a href="">更多</a></li>`
      } else {
      oNavUl.innerHTML += `
        <li>
          <a href="list.html?cat_id=${data[i].cat_id}">${data[i].cat_name}</a>
        </li>`
      }
    }
  })
  // myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',{},function(error,responseText){loading(error,responseText)})
})


var oFooter = document.querySelector('#footer')
var oUl = document.querySelector('#commodity-list');
//加载商品；
var index = 1;
window.addEventListener('scroll', function() {
  oInput.blur();
  // e = e || window.event;
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if(scrollTop > 450) {
    oWrap.style.position = 'fixed';
    oSideBar.style.display = 'block';
    oWrap.style.background = 'rgba(255,255,235,0.8)';
  } else {
    oSideBar.style.display = 'none';
    oWrap.style.position = 'relative'
    oWrap.style.background = 'rgba(255,255,235,0.5)';
  }
})
window.addEventListener('scroll', function() {
  // e = e || window.event;
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if(scrollTop > 150) {
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
  document.body.style.background = 'url("images/Evening_BGImage_v2.jpg") no-repeat 100% fixed';
}


function loading(error,responseText) {
// oUl.innerHTML = '';
var json = JSON.parse(responseText);
var data = json.data;
console.log(data)
for(var i = 0; i < data.length; i++) {
  oUl.innerHTML += `<li>
    <a href="goods.html?goods_id=${data[i].goods_id}">
      <img src="${data[i].goods_thumb}"/>
      <p class="goods-name">${data[i].goods_name}</p>
      <p class="goods-desc">${data[i].goods_desc}</p>
      <p class="goods-price">&yen;${data[i].price}</p>
    </a>
  </li>`
}
}
//向下滚动时再次商品加载
function addcont(error,responseText) {
var json = JSON.parse(responseText);
var data = json.data;
for(var i = 0; i < data.length; i++) {
  oUl.innerHTML += `<li>
    <a href="goods.html?goods_id=${data[i].goods_id}">
      <img src="${data[i].goods_thumb}"/>
      <p class="goods-name">${data[i].goods_name}</p>
      <p class="goods-desc">${data[i].goods_desc}</p>
      <p class="goods-price">&yen;${data[i].price}</p>
    </a>
  </li>`
}
}