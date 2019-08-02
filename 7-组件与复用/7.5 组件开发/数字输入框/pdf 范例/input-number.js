function isValueNumber(value){
    return (/^-?((0{1})|([1-9][0-9]*))(\.{1}\d+)?$/).test(value+'');
}


Vue.component('input-number',{
    template:`
        <div>
            <input type="text" :value="currentValue" @change="handleChange" />
            <button @click="handleDown" :disabled="currentValue<=min">-</button>
            <button @click="handleUp" :disabled="currentValue>=max">+</button>
            <p>组件内：{{currentValue}}</p>
            <p>prop:{{value}}</p>
        </div>  `,
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
        }
    },
    data:function(){
        return {
            currentValue:this.value
        }
    },
    watch:{
        currentValue:function(val){
            this.$emit('input',val);
            this.$emit('on-change',val);  //???  on-change
        },
        value:function(val){        // 除了初始值时，触发，后面一般操作不会触发
            console.log('输入框');
            //this.updateValue(val);     // initValue -> value -> currentValue -> initValue -> value
        }
    },
    methods:{
        handleDown:function(){
            if(this.currentValue<=this.min) return ;
            this.currentValue--;
        },
        handleUp:function(){
            if(this.currentValue>=this.max) return;
            this.currentValue++;
        },
        //value -> currentValue
        updateValue:function(val){
            if(val>this.max) val=this.max;
            if(val<this.min) val=this.min;
            this.currentValue=val;
        },
        handleChange:function(event){
            var val=event.target.value.trim();
            var max=this.max;
            var min=this.min;
            if(isValueNumber(val)){
                val=Number(val);
                //this.currentValue=val;
                if(val>max) val=max;
                if(val<min) val=min;
            }
            this.currentValue=val;
            event.target.value=this.currentValue;
        }

    },
    mounted:function(){
        this.updateValue(this.value);
    }
});