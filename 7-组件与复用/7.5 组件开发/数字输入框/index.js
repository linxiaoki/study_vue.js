var app = new Vue({
    el:'#app',
    data:{
        initValue:5
    },
    watch:{
        initValue:function(val){
            console.log("watch initValue:"+val);
        }
    }
});