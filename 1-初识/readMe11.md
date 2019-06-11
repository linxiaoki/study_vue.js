#### Vue 实例 与 数据绑定
```
input[type=text] v-model=name
标签内 {{name}}
new vue data :{name:''}
--------------------
三个地方  有name 
```
数据的绑定
```
var myData={ a: 1}
var app = new Vue({
    el:'#app',
    data:myData
})
---------------
app.a === mydata.a   都可以访问(get)和修改(set)  
app.$el
```

##### 生命周期
```
生命周期钩子hook   何时调用
created:示例创建完成后调用，用来初始化一些数据(el还不可用)
mounted：el挂载到实例上后调用，一般是第一个业务逻辑开始的地方
beforeDestroy：实例销毁前调用，用来解绑一些监听事件(addEventListener)
```
[-----博客：生命周期讲解-----](https://blog.csdn.net/gao_xu_520/article/details/80915400)
![img](https://ws1.sinaimg.cn/mw690/005zbIM7ly1g3bjpl8mwaj30xc2cfaip.jpg)



##### 插值与表达式
1.  {{}}  输出纯文本
###### 示例:
```
    el:'#app',
    data:{
        date:new Date()
    },
    mounted:function(){
        var _this=this;  //声明一个变量指向Vue实例this，保证作用域一致
        this.timer=setInterval(function(){
            _this.date=new Date(); //修改数据 date
        },1000);
    },
    beforeDestory:function(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
----------------
data -->  date=new Date()  最开始初始化一下时间
mounted:  el 挂载后调用
this.timer  与  _this.date  ?
setInterval(方法，时间间隔)  循环执行一个方法
beforeDestory:示例销毁前调用
clearInterval(this.timers)   清理定时器
```
2. v-html=""   输出html
###### 示例：
```
div#app
    <span v-html="link"></span>  //注意：v-html 在 <>里面
    script
        new Vue(){}
            data:{link:'<a href="#">这是一个链接</a>'}
---------
link 的内容将会渲染为一个具有点击功能的a标签，而不是纯文本。
** 如果将用户产生的内容使用 v-html 输出后，可能导致 XSS 攻击，所以要在服务端对用户提交的内容进行处理(可将<>  转义)
```

3. v-pre  不编译
```
<span v-pre>{{跳过这个元素和它的子元素的编译过程}}</span>

直接显示  '{{}}''
```
4. 直接使用JavaScript表达式
```
{{number/10}}   //100  -->  10
{{isOK ? '确定' : '取消'}}  // false -->  取消
{{text.split(',').reverse.join('')}}  //123,456  -->  456,123
--------
不支持:
    语句  {{var book='Vue.js实战'}}
    流控制  {{if (ik) return msg}}
    用户自定义的全局变量
```
##### 过滤器 {{}}插值的尾部添加 | 实现
```
{{date|formatDate}}

new Vue() -> filters:{ formatDate:function(value){...} }

----------
<!-- 过滤器 串联 -->
{{ message | filterA | filterB }}
<!-- 接收多个参数 (message 算一个参数)-->
{{message | filterA('arg2','arg3') }}

```

#### 指令与事件 
指令:当表达式的值改变时，相应地将某些行为应用到DOM上</br>
指令如：```v-for,v-html,v-pre,v-if(DOM是否显示)```
```
v-bind: 地址与数据绑定
----
div
    <a v-bind:href="url">链接</a>
    <img v-bind:src="imgUrl">
+
script -> Vue() -> data
    url:'https://www.github.com',
    imgUrl:'http://xxx.xxx.xx.img.png'
==>  渲染结果：
    <a href="https://www.github.com">链接</a>
    <img src='http://xxx.xxx.xx.img.png'>
---------------------------------
v-on:绑定事件监听器(click,dblclick,keyup,mousemove)
----
div
    <p v-if="show_">一段文本</p>
    <button v-on:click="handleToggle"></button>
script -> Vue()  
    data
        show_:true
    methods
        handleToggle:function(){
            this_=this;
            this.show_=!(this_.show_);
        }
==>  点击按钮，显示或隐藏段落
----------------------------------
在 初始化时调用方法，或在外部调用方法
script
    app=new Vue()
        methods:{//定义一个方法
            init:function(text){
                console.log(text);s
            }
        },
        mounted:function(){
            this.init('在初始化时调用');
        }
    
    app.init('通过外部调用实例app的方法');
```

#### 语法糖(简化代码)
```
v-bind 可以直接省略
    <a v-bind:href="url">链接</a>
=>  <a :href="url">链接</a>
------
v-on   "@"表示
    <button v-on:click="handleClose">点击隐藏</button>
=>  <button @:click="handleClose">点击隐藏</button>
```

#### 总结
声明周期:  created  mounted  beforeDestroy <br>
插值 === html 中的变量 ```{{var1}} ,
v-html="var2" , v-bind:href="url1" , v-on:click="f1"   ... ```  <br>
过滤器  ```date|formatDate  --> filters:{formatDate:function(){}  }``` <br>

表达式：简单的运算，三元运算等 <br>

其他 ```mounted >> setInterval```  <br>

指令与事件 ```v-xxx```

语法糖


