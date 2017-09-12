 
  function toast(cont,time,callback) {
    var callback
    if(callback) {
      callback = callback;
    } else {
      callback = null;
    }
    var time = time || 3000;
    var oDiv = document.createElement('div');
    oDiv.className = 'toast';
    oDiv.innerText = cont;
    document.body.appendChild(oDiv);
    oDiv.style.height = getStyle(oDiv,'height')
    oDiv.style.width = getStyle(oDiv,'width')
     ////HTML加载完成
    oDiv.style.marginTop = -parseInt(getStyle(oDiv,'height')) / 2 + 'px';
    oDiv.style.marginLeft = -parseInt(getStyle(oDiv,'width')) / 2 + 'px';
    var timer = setInterval(function(){
        document.body.removeChild(oDiv);
        callback;
        clearInterval(timer);
      }, time);
  }
  function getStyle(obj,property) {
    if(window.getComputedStyle){
      property = property.replace(/([A-Z])/,function(match,value){
        return '-'+value.toLowerCase();
      })
      return (window.getComputedStyle(obj)[property]);
    }else {
      property = property.replace(/-([a-z])/, function(match,value) {
        return value.toUpperCase();
      })
      return (obj.currentStyle[property])
    }
  }

  
