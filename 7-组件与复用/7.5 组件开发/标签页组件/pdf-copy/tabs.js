Vue.component('tabs',{
    name:'tabs',
    template:`
        <div class="tabs">
            <div class="tabs-bar">
                <!-- 标签页标题，需要用 v-for -->
                <div 
                    :calss="tabCls(item)" 
                    v-for="(item,index) in navList" 
                    @click="handleChange(index)">
                    {{item.label}}
                </div>
            </div>
            <div class="tabs-content">
                <!-- 这里的slot就是嵌套的pane -->
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
            currentValue:this.value,
            navList:[]
        }
    },
    methods:{
        tabCls:function(item){
            return [
                'tabs-tab',
                {'tabs-tab-active':item.name===this.currentValue}
            ]
        },
        getTabs(){
            return this.$children.filter(function(item){
                console.log(item.$options.name)
                return item.$options.name==='pane';
            })
        },
        updateNav(){
            this.navList=[];
            var _this=this;

            this.getTabs().forEach(function(pane,index){
                console.log("name:"+pane.name +"  index:"+index);
                _this.navList.push({
                    label:pane.label,
                    name:pane.name || index
                });
                console.log("push:  name:"+pane.name +"  index:"+index);
                if(!pane.name) pane.name = index;
                console.log("比较push:  name:"+pane.name +"  index:"+index);
                if(index===0){
                    if(!_this.currentValue){
                        _this.currentValue=pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus(){
            var tabs=this.getTabs();
            var _this=this;
            tabs.forEach(function(tab){
                return tab.show = tab.name===_this.currentValue;
            })
        },
        handleChange(index){
            var nav=this.navList[index];
            var name=nav.name;
            this.currentValue=name;
            this.$emit('input',name);
            this.$emit('on-click',name);
        }
    },
    watch:{
        value:function(val){
            this.currentValue=val;
        },
        currentValue:function(){
            this.updateStatus();
        }
    }
});