function Carousel(selector) {
	this.idx = 0;
	this.timer = 0;
	this.dom = document.querySelector(selector);
	this.oRightBtn = this.dom.querySelector('#rightBtn');
	this.oLeftBtn = this.dom.querySelector('#leftBtn');
	this.oImagesLists = this.dom.querySelector('#imagesList').getElementsByTagName('li');
	this.oCirclesLists = this.dom.querySelector('#circles').getElementsByTagName('li');
	console.log(this.oCirclesLists);
	this.setMove();
	this.setover();
	this.setout();
	this.bindEvent();
	this.BindCircles();	
}
Carousel.prototype.bindEvent = function() {
	var self = this;
	this.oRightBtn.onclick = function(){
		if(self.oImagesLists[self.idx].isAnimated) return;
		animate(self.oImagesLists[self.idx],{"left":-900},700,"QuadEaseOut");
	  self.idx++;
	  if (self.idx > self.oImagesLists.length - 1) {
		self.idx = 0;
	  }
	  self.oImagesLists[self.idx].style.left = "900px";
	  animate(self.oImagesLists[self.idx],{"left":0},700,"QuadEaseOut");
	  self.changeCircles();
	}
	self.oLeftBtn.onclick = function(){
		if(self.oImagesLists[self.idx].isAnimated) return;
		animate(self.oImagesLists[self.idx],{"left":900},700,"QuadEaseOut");
	  self.idx--;
	  if (self.idx < 0) {
		  self.idx = self.oImagesLists.length - 1;
	  }
	  self.oImagesLists[self.idx].style.left = "-900px";
	  animate(self.oImagesLists[self.idx],{"left":0},700,"QuadEaseOut");
	  self.changeCircles();
	}
}
Carousel.prototype.BindCircles = function() {
	for (var i = 0;i < this.oCirclesLists.length;i++) {
		this.oCirclesLists[i].index = i;
		var self = this;
		this.oCirclesLists[i].onclick = function() {
			if(self.oImagesLists.isAanimated) return;
			if(this.index > self.idx) {
			  animate(self.oImagesLists[self.idx],{"left":-900},700,"QuadEaseOut");
			  self.idx = this.index;
			  self.oImagesLists[self.idx].style.left = "900px";
			  animate(self.oImagesLists[self.idx],{"left":0},700,"QuadEaseOut");
			}else if(this.index < self.idx){
			  animate(self.oImagesLists[self.idx],{"left":900},700,"QuadEaseOut");
			  self.idx = this.index;
			  self.oImagesLists[self.idx].style.left = "-900px";
			  animate(self.oImagesLists[self.idx],{"left":0},700,"QuadEaseOut");
			}
			self.changeCircles();
		}
	}
}
Carousel.prototype.changeCircles = function() {
	for (var i = 0; i < this.oCirclesLists.length;i++) {		
		this.oCirclesLists[i].className = '';
	}
	this.oCirclesLists[this.idx].className = 'cur';
}

Carousel.prototype.setMove = function() {
	var self = this;
	if(self.oImagesLists[self.idx].isAnimated) return;
//	clearInterval(self.timer);
	this.timer = setInterval(function() {
		animate(self.oImagesLists[self.idx],{"left":-900},700,"QuadEaseOut");
		self.idx++;
		if(self.idx > self.oImagesLists.length - 1){
			self.idx = 0;
		}
		self.oImagesLists[self.idx].style.left = "900px";
		animate(self.oImagesLists[self.idx],{"left":0},700,"QuadEaseOut");
		self.changeCircles();
	}, 3000);
}
Carousel.prototype.setover = function() {
	this.dom.onmouseover = () =>{
		clearInterval(this.timer);
	}
}
Carousel.prototype.setout = function() {
	this.dom.onmouseout = () =>{
		this.setMove();
	}
}

