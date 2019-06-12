#### 3.1 什么是计算属性
当表达式过长时，可以使用计算属性。
```
表达式 改 计算属性
---
div
    {{text.split(',').reverse().join(',')}
==> 使用 计算属性
div
    {{reversedText}}
script --> new Vue() 
    data:{
        text:'123.456'
    },
    computed:{
        reversedText:function(){
            //this 指向的是当前实例
            return this.text.split(',').reverse().join(',');
        }
    }
------------
1.需要在 模版写入计算属性的方法名 {{f_com}}，需要有返回值
2.computed 中 在相应的方法中处理并返回数据
```

#### 3.2 用法
依赖一个或 **多个** Vue实例的数据，经过复杂的处理(**运算，函数调用等**)，最终返回**一个结果**。只要任一数据发生**变化**，计算属性就会**重新执行**，视图也会**更新**。
```
代码文件：
    3.1：商品价格计算.html
        可更改橘子个数，价格也实时改变。
    3.2: getter与setter.html  
        computed:{fullname:{get:function(){return },set:function(){} }}
        默认是getter方法，setter很少用
```
还可以做：动态设置元素的样式名称```class```和内联样式```style```。

#### 3.3 计算属性缓存
```methods``` 与 ```computed``` 的区别：
  - ```methods```可以接受参数;```computed```不行
  - ```computed``` 是基于它的依赖缓存的(即只有当它所依赖的数据发生变化时，才会重新取值。) ; ```methods```是页面被重新渲染时才调用函数
  
#### 总结
- 怎么用：  {{方法名}}  computed:{} 
- 何时用（与```methods```的区别）：需要依赖缓存时
- 实例：计算商品价格，get与set(默认get)