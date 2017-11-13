### 注册组件
全局注册组件
```
Vue.component('my-component', {
  //options
})
```
局部注册组件

```
var Child = {
  template: '<div>A custom component</div>'
}

new Vue({
  el: "#app",
  components: {
    'my-component': Child
  }
})
```
组件命名
小写，并且包含一个短杠


DOM模板解析：
当时用DOM作为模板时，会受到一些限制，比如，像 <ul>、<ol>、<table>、<select> 这样的元素里中，对包含的元素有限制，而像 <option> 这样的元素只能出现在某些特定元素的内部。
```
//错误
<table>
  <my-row>...</my-row>
</table>
//正确
<table>
  <tr is="my-row"></tr>
</table>
```
在这些字符串模板中，则没有以上的限制。
1.<script type="text/x-template">
2.JavaScript 内联模板字符串
3.vue 组件

组件中的data必须是函数。
```
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  data() {
    return {counter: 0}
  }
})
```

props
```
父组件通过props：[]，将数据下发到子组件中

```

字符串模板 和 什么模板

动态props：