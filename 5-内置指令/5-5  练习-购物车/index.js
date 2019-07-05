var app=new Vue({
    el:'#app',
    data:{
        list:[
            {
                id:1,
                name:'iPhone7',
                price:6188,
                count:27
            },
            {
                id:2,
                name:'iPad Pro',
                price:5888,
                count:21
            },
            {
                id:3,
                name:'MacBook Pro',
                price:21488,
                count:36
            }
        ]
    },
    computed:{
        totalPrice:function(){
            var total=0;
            var item;
            for(var i=0;i<this.list.length;i++){
                total += (this.list[i].price*this.list[i].count);
            }
            //带千位分隔符
            return total.toString().replace(/\B(?=(\d{3})+$)/,',');
        }
    },
    methods:{
        handleAdd:function(index){
            console.log(index);
            this.list[index].count++;
        },
        handleReduce:function(index){
            if(this.list[index].count===1) return;
            this.list[index].count--;
        },
        handleRemove:function(index){
            this.list.splice(index,1);
        }
    }
});