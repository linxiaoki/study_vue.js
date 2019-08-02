Vue.component('tabs',{
    template:`
        <div class="tabs">
            <div class="tabs-bar">
                <div 
                    :class="tabCls(item)" 
                    v-for="(item,index) in navList" 
                    @click="handleChange(index)">
                    {{item.label}}
                </div>
            </div>
            <div class="tabs-content">
                <p>tabs-content</p>
                <slot></slot>
            </div>
        </div>
    `,
    props:{
        value:{
            type:[String,Number]
        }
    },
    data:function(){
        return {
            navList:[],
            //因为不能修改value,所以复制一份自己维护
            currentValue:this.value
        }
    },
    methods:{
        //style: class绑定 tabs-tab,tabs-tab-active:true/false
        tabCls(item){
            return [
                'tabs-tab',
                {
                    'tabs-tab-active':item.name===this.currentValue
                }
            ]
        },
        // 更新currentValue 的值 -> watch :currentValue 触发 updateStatus
        handleChange:function(index){
            var nav=this.navList[index];
            var name=nav.name;
            //改变当前选中的tab，并触发watch
            this.currentValue=name;
            //更新父组件的 activeKey   ,,,,,input 和 on-click 事件
            this.$emit('input',name);  //这个有效
            this.$emit('on-click',name);  //这个看似无效？
        },
        //辅助：返回所有 pane 组件
        getTabs(){
            //通过遍历子组件，得到所有pane组件
            return this.$children.filter(function(item){
                return item.$options.name==="pane";
            })
        },

        //根据 name与currentValue 控制内容的显示与隐藏
        updateStatus(){
            var tabs=this.getTabs();
            var _this=this;
            //显示与隐藏
            tabs.forEach(function(tab){
                // tab.show 现在是true ,判断后变为false
                if(tab.show && !(tab.name===_this.currentValue)){
                    console.log(">>>>>"+tab.label);
                    
                }
                return tab.show = tab.name===_this.currentValue;
            });
        },

        // 获取 子组件的标题和索引，并且更新currentValue
        //一些异常情况，例如没有 name，没有activeKey，这时候需要 index 来 
        updateNav(){
            this.navList=[];
            var _this=this;
            this.getTabs().forEach(function(pane,index){
                console.log("name:"+pane.name+", index:"+index);
                //从pane的props中获取标题和索引
                _this.navList.push({
                    label:pane.label,
                    name:pane.name || index
                });
                //如果没有给pane设置name，默认设置它的索引 
                if(!pane.name) pane.name = index;
                // 没有传入 activeKey，就默认第一个
                if( !_this.currentValue && index===0){
                    console.log("index===0?-->"+index);
                    // 问题：上一行不是判断了吗,s为什么不直接 _this.currentValue=pane.name
                    _this.currentValue = pane.name || index
                }
            });
            this.updateStatus();    //初始化，根据currentValue 隐藏部分内容(渲染页面？)
        }
    },
    watch:{
        value:function(val){
            this.currentValue=val;
        },
        currentValue:function(){
            //当前选中的tab发生变化时，更新pane的显示状态
            this.updateStatus();
        }
    }

})

/*
name: pane.name||index
    如果 都没有name ，会展示不出来？
    如果  name =2 没有 ， 哪个 index=>name ==1  与 那么与 name=1 冲突  ,但是还是没有展示出来？

*/