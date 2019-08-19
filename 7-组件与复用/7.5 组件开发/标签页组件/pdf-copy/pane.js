Vue.component('pane',{
    name:'pane',
    template:`
        <div class="pane" v-show="show">
            <slot></slot>
        </div>
    `,
    props:{
        name:{
            type:String //标识，用户可以不设置
        },
        label:{
            type:String,
            default:''  //标签页标题
        }
    },
    data:function(){
        return {
            show:true
        }
    },
    methods:{
        updateNav(){
            //通过 this.$parent 访问 tabs 组件的实例来调用它的方法更新标题。
            this.$parent.updateNav(); 
        }
    },
    watch:{
        label:function(){
            this.updateNav();
        }
    },
    mounted(){
        this.updateNav();
    }
})