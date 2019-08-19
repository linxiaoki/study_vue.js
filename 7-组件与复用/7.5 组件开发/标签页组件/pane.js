Vue.component('pane',{
    name:'pane',
    template:`
        <div class="pane" v-show="show">
            <slot></slot>
        </div>
    `,
    data:function(){
        return {
            show:true
        }
    },
    props:{
        name:{
            type:String
        },
        label:{
            type:String,
            default:''
        }
    },
    watch:{
        label(){
            this.$parent.updateNav();
        }
    },
    mounted(){
        this.$parent.updateNav();
    }
})

/*
name:'pane'    父组件筛选时用到 
    this.$children.filter(function(item){
        return item.$option.name==="pane"
    })

*/