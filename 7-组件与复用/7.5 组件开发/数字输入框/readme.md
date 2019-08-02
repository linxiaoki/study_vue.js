使用语法糖 
    父组件：v-model="initValue"
    子组件：:value="value"  @input="handleUpdateValue"
        handleUpdateValue(event)
            this.currentValue=event.target.value
            this.$emit('input',this.currentValue)

        handleIncrease   $emit
        handleReduce     $emit
        mounted          $emit

区别：
pdf: 子组件 ：  :value="currentValue"  @change="handleChange"
                this.currentValue=''
                this.$emit('on-change',val) ?on-change


注意：update时，先改currentValue的值，再判断 是否符合要求，再更新currentValue。否则不会触发watch方法。


input组件里面： :value=value1   ，:value是在父组件暴露的变量（messageTe-->message-te  一个是子组件变量,和在父组件对应的变量名）; value1是显示value1的值，当改变value1的值后，会触发@input或@change。
    