var app=new Vue({
    el:'#app',
    data:{
        list:[
            {
                id:1,
                name:'iPhone7',
                price:6188,
                count:27,
                checked:true
            },
            {
                id:2,
                name:'iPad Pro',
                price:5888,
                count:21,
                checked:true
            },
            {
                id:3,
                name:'MacBook Pro',
                price:21488,
                count:36,
                checked:true
            }
        ]
    },
    computed:{
        totalPrice:function(){
            var total=0;
            var item;
            for(var i=0;i<this.list.length;i++){
                item=this.list[i];
                if(item.checked==true){
                    console.log(i);
                    console.log(item.checked);
                    total += (item.price*item.count);
                }
            }
            //带千位分隔符
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        },
        isSelectAll:function(){
            for(var i=0;i<this.list.length;i++){
                if(this.list[i].checked==false){
                    return false;
                }
            }
            return true;
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
        },
        handleChoiceAll:function(){
            for(var i=0;i<this.list.length;i++){
                this.list[i].checked=true;
            }
        },
        handleCancelChoice:function(){
            for(var i=0;i<this.list.length;i++){
                this.list[i].checked=false;
            }
        }
    }
});