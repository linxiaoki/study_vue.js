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
        }
    },
    data:function(){
        return {
            getValue:this.value
        }
    },
    template:` 
    <div>
        <input type="text" :value="value" @input="handleUpdateValue" />
        <button @click="handleReduce">-</button>
        <button @click="handleIncrease">+</button>
        <p>组件内：{{getValue}}</p>
    </div> `,
    methods:{
        handleUpdateValue:function(){
            this.$emit('input',this.getValue);
        },
        handleReduce:function(){
            this.getValue--;
            this.$emit('input',this.getValue);
        },
        handleIncrease:function(){
            this.getValue++;
            this.$emit('input',this.getValue);
        }
    }
});