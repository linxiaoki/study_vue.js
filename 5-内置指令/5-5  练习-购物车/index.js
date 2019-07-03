var app=new app({
    el:'app',
    data:{
        list:[
            {
                id:1,
                name:'iPhone7',
                price:6188,
                count:1
            },
            {
                id:2
                name:'iPad Pro',
                price:5888,
                count:1
            },
            {
                id:3,
                name:'MacBook Pro',
                price:21488,
                count:1
            }
        ]
    },
    computed:{
        totalPrice:function(){
            var total=0;
            var item;
            foreach(var i=0;i<this.list.length;i++){
                total += (this.list.price*this.list.count);
            }
            //带千位分隔符
            return total.toString();
        }
    },
    methods:{
        removeOne:function(index){

        }
    }
});