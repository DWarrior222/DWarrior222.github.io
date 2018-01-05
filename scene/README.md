# 毕业了场景

## HTML / CSS / JS / Jquery / Swiper / Animate

## 最需要说明的滑动和动画
也就是Swiper和Swiper Animate

Swiper是一个滑动的插件，他在移动端有良好的体验，而且它内部拥有一个关于css3动画的小插件，可以快速的实现元素的动画效果

### 滑动 Swiper
项目是通过在移动端上下滑动来访问的
```
这就基于它最基本的功能，通过标签的class名称，初始化一个滑动的功能

<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slider1</div>
    <div class="swiper-slide">slider2</div>
    <div class="swiper-slide">slider3</div>
  </div>
</div>
<script>
var mySwiper = new Swiper('.swiper-container', {
	autoplay: 5000,//可选选项，自动滑动
})
</script>
```
在它的api文档中，有更多关于基础滑动功能的扩展，比如分页滚动条，滚动方向等等选项

### 动画 Swiper Animate
动画也比较重要，它和Swiper配合使这个场景更加有趣

Swiper Animate是Swiper中文网提供的用于在Swiper内快速制作CSS3动画效果的小插件
http://www.swiper.com.cn/usage/animate/

他有一个类似生命周期函数的Swiper参数选项

初始化时隐藏元素并在需要的时刻开始动画。
```
onInit
onSlideChangeEnd
```

在需要运动的元素上面增加类名  ani   ，和其他的类似插件相同，Swiper Animate需要指定几个参数：
指定动画的方式 时间等
```
swiper-animate-effect：切换效果，例如 fadeInUp
swiper-animate-duration：可选，动画持续时间（单位秒），例如 0.5s
swiper-animate-delay：可选，动画延迟时间（单位秒），例如 0.3s
```
> 如果通过Swiper Animate给一个元素加上动画效果，那么则会导致该元素定位时使用的transform失效或者混乱
