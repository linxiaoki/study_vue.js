数据驱动 DOM 是 Vue.js的核心理念。最好不要主动操作 DOM 。

el:'',data:{},methods:{}, computed:{}    还有钩子

生命周期的钩子： beforeCreate,created, beforeMount,mounted, beforeUpdate,updated, beforeDestroy,destroyed。
>> 实例创建前后，编译好的HTML挂载到页面前后（mounted常使用ajax获取初始化数据），更新数据前后，实例销毁前后。

插值 {{}} 

过滤器 | ，串联：{{ message | filterA } filterB }} 和 {{ message | filterA('argl','arg2')}} ,这里的 arg1 和 arg2 都是
  => filters: {函数名：函数}

指令：v-开头的，主要职责就是当其表达式的值改变时,相应地将某些「行为」应用到 DOM 上。
v-model:
v-bind: 基本用途是动态更新 HTML 元素上的属性, 语法糖 ':'
v-on: 绑定事件监听器，语法糖 '@'

计算属性，computed,可以放函数或对象，对象有 getter 和 setter，函数其实就是默认 getter。
    应用：文本插值；动态设置元素的样式名称class和内联样式style；使用组件时，用来动态传递props；多个组件的数据依赖。
```
computed: {
    prices: function(){
        // compute
    },
    fullName: {
        get: function(){
            // return something
        },
        set: function(newValue){
            // set this.****
        }
    }
}

// 当在外部执行 app.fullName='*** ***',会出发set事件，更新视图
```
和methods的区别:当使用方法时，同样可以实现相同功能。那为什么还需要computed?
- computed是响应式的，methods并非响应式
- 调用方式不一样，computed定义的成员像属性一样访问，methods定义的成员必须以函数形式调用
- computed是带缓存的，只有其引用的响应式属性发生改变时才会重新计算，而methods里的函数在每次调用时都要执行
- computed中的成员可以只定义一个函数作为只读属性，也可以定义get/set变成可读写属性，这点是methods中的成员做不到的
应用场景：时刻监控数据的变化

内置指令：v-if,v-else-if,v-else, v-show, v-html，v-for, v-pre, v-cloak, v-once
    v-show 和 v-if： 都是设置元素是否显示。v-show 通过设置 display 属性控制，v-if 则是直接销毁和创建元素。所以频繁切换时应该使用 v-show 。
    v-for: 
        数组和对象都可以迭代：`v-for="(value, index) in array"`，`v-for="(value,key,index) in dict"`

关于数组的更新：
    可以更新数组的方法：push(),pop(),shift(),unshift(),splice(),sort(),reverse()
    返回一个新数组的方法(所以需要替换原数组才可以更新)：filter(),concat(),slice()
    通过索引直接设置项不会触发视图更新: `app.books[2]={...}`
        1. 使用Vue内置的 set 方法
            Vue.set(app.books,2,{...});
        2. webpack 中使用组件话方式时，可以使用 $set
            this.$set(app.books,2,{...}); //this指向当前组件实例，即 app
        3. 使用 splice 方法
            app.books.splice(2,1,{...});
    修改数组长度不会触发视图更新: `app.books.length=1`
        也使用splice: app.books.splice(1)

方法和事件：
    调用methods时,如果没有参数，可以不写 ();  方法有参数，使用时没有传入参数，那么会默认传入原生事件对象 $event。
    Vue 提供特殊变量$event ,用于访问原生 DOM 事件。
   
修饰符： 在@绑定的事件后加'.',再跟一个后缀来使用修饰符。如： .prevent, .stop, .capture, .self, .once
 ```
    <!-- 阻止单击事件 冒泡 --> 
    <a @click.stop = "handle" ></a>
    <!-- 提交事件不再重载页面 --> 
    <form @submit.prevent= "handle" ></ form>
    <!--  取消链接单击后打开页面，修饰符可以串联, 相当于方法内部：event.preventDefault();  --> 
    <a @click.stop.prevent ="handle" ></ a>
    <!-- 只有修饰符--> 
    <form @submit.prevent></form>
    <!-- 添加事件侦听器时使用事件捕获模式--> 
    <div @click.capture ="handle" > ... </div>
    <!-- 只 当事件在该元素本身(而不是子元素) 触发时触发回调--> 
    <div @click.self ="handle" > ... </div>
    <!-- 只触发一次,组件同样适用 --> 
    <div @click.once ="handle" > ... </div>
    
    <!--  监听键盘事件，只有在 keyCode 是 13 时调用 vm.submit()--> 
    <input @keyup.13 ="submit">
    <!-- Vue 还提供很多键盘的快捷方式 -->
 ```

表单和v-model： Vue 提供 v-model 指令，用于在表单类元素（单选，多选，下拉选择，输入框）双向绑定数据。
    使用 v-model 后，表单控件显示的值只依赖所绑定的数据，不再关心初始化的value的值
    输入框输入汉字在拼音阶段不能实时更新，可以使用 @input 来替代 v-model。（v-model是双向绑定,绑定的值改变，「输入框」里的值也改变） 
    v-model 的修饰符：
        .lazy  在change事件中同步数据，也就是会在输入框失焦或者回车时更新。
        .number  输入转换为数字
        .trim  自动去除首位空格

组件：为了复用代码。
    全局注册（Vue.component('my-component',{})）和局部注册（在实例中使用components选项）
    限制：table标签内直接使用组件是无效，可以在 tbody 中使用 is 属性来挂载组件。常见的限制元素 <ol>, <ul>, <select>。（字符串模板和单文件vue的用法？）
    区别：data 必须是函数，将 数据对象 return 出去。注意：return 出的对象最好不要引用外部对象，复用组件时这个数据会共享。
    
组件的通信：
  父组件向子组件：
    props：父组件向子组件单向传递数据或参数（正向传递）。(html 不区分大小写，所以会将包含大写的 props 变量名要转为kebab-case形式.)
 ```
    // 传入固定的字符串
    <my-component warning-text="传入"></my-component>
    // 传入动态的数据（变量）：使用bind
    <my-component :warning-text="parentMessage"></my-component>
    // 传递数字、布尔值、数组、对象 (不使用 v-bind ，就是会获得字符串）
    <my-component message="[1,2,3]"></my-component>   // 字符串
    <my-component :message="[1,2,3]"></my-component>  // 数组
 ```
    
传入子组件的数据是对象或者数组，则子组件改变这些数据也会影响父组件（对象和数组是引用类型）
    
props 数据验证，设置数据的类型，示例：
    ```
    props: {
        propA: Number, // 后接类型，必须是数字类型
        propB: [String, Number],  // 后接数组，必须是字符或者数字
        propC: {
            type: Boolean,
            default: true,   // 可选，可以设置默认值
            required: true,   // 可选，设置是否为必须参数
            validator: function(value){
                return value>10  // 可选，自定义验证函数
            }
        },
        propD: {
            type: Array,
            default: function(){  
                return [];  //? 如果是数组或对象,默认值必须是一个函数来返回
            }
        }
    }
    ```
    
 子组件向父组件：
 用到自定义事件。子组件用 $emit() 触发事件，父组件用 $on() 监听子组件的事件。
    
 $parent, $children, $refs(通过特殊参数ref来设置)
    
    
 单个slot , 具名slot（定义时有name） 和 作用域插槽
    
    
    
 看了不用全都忘光光
