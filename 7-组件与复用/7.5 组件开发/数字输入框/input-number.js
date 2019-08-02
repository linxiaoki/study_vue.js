function isValueNumber(value){
    //value + ''  数值可以转字符串
    //return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
    return (/(^-?((0{1})|([1-9][0-9]*))(\.{1}\d+)?$)/).test(value+'');
}
//  匹配正负、小数    如果  03.5 也通过
//  匹配正负、整数    如果   05   不通过
//  匹配    0     -0   也通过

Vue.component('input-number',{
    props:{
        max:{
            type:Number,
            default:Infinity
        },
        min:{
            type:Number,
            default:-Infinity
        },
        value:{
            type:Number,
            default:0
        },
        step:{
            type:Number,
            default:1
        }
    },
    data:function(){
        
        //为什么不直接改变 this.value 的值，而是使用临时变量 val？
        // this.value  不是也需要改？
        //  >>>>>>>>>>>>>>>>>
        //依赖？  父组件 value 改变 ->  this.value 改变
        //this.value 传初值 ->  this.currentValue 
        //  用户操作 改变值   ->  this.currentValue
        //  this.currentValue 改变  ->   父组件value
        // 只限定：  this.currentValue  有最大和最小的值
        return {
            currentValue:this.value,
        }
    },
    template:` 
        <div>
            <input type="text" :value="currentValue" @change="handleUpdateValue" @keyup.up="handleIncrease" @keyup.down="handleReduce"/>
            <button @click="handleReduce" :disabled="currentValue<=min">-</button>
            <button @click="handleIncrease" :disabled="currentValue>=max">+</button>
            <p>组件内：{{currentValue}}</p>
            <p>prop:{{value}}</p>
        </div> `,
    watch:{
        currentValue:function(val){
            console.log('watch currentValue:'+val);
            this.$emit('input',val);
            //this.$emit('change',val);
        },
        value:function(val){
            console.log("watch value:"+val);
            //updateValue(val);  pdf 里面
        }
    },
    methods:{
        handleUpdateValue:function(event){
            var val=event.target.value.trim();
            var max=this.max;
            var min=this.min;
            if(isValueNumber(val)){
                val=Number(val);
                this.currentValue=val;
                if(val>max){
                    val=max;
                    this.currentValue=max;
                }else if(val < min){
                    val=min;
                    this.currentValue=min;
                }
                //watch 只有在currentValue 变化时才触发更新到输入框，你一直是最大值
                //所以就没有更新。
                this.currentValue=val;
                event.target.value=this.currentValue;
            }else{
                event.target.value=this.currentValue;
            }
            //console.log(event.target.value);
            //this.currentValue=event.target.value;
            //this.$emit('input',this.currentValue);

            this.$nextTick(function(){
                console.log("+++++++++++"+  this.value+"   "+this.currentValue);
            })
        },
        handleReduce:function(){
            if(this.currentValue<=this.min)  return;
            this.currentValue -= this.step;
            //this.$emit('input',this.currentValue);
        },
        handleIncrease:function(){
            if(this.currentValue>=this.max) return;
            this.currentValue += this.step;
            //this.$emit('input',this.currentValue);
        },

        //pdf 里面的方法
        updateValue223:function(){
            var val = this.value;
            if(val>this.max){
                val=this.max;
            }
            if(val<this.min){
                val=this.min;
            }
            this.currentValue=val;
        }

    },
    mounted:function(){
        var val = this.value;
        if(val>this.max){
            val=this.max;
        }
        if(val<this.min){
            val=this.min;
        }
        this.currentValue=val;
    }
});