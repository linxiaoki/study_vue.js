var Time={
    //获取当前时间戳
    getUnix:function(){
        var date=new Date();
        return date.getTime();
    },
    //获取今天0点0分0秒的时间戳
    getTodayUnix:function(){
        var date = new Date();
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setMilliseconds(0);
        //console.log('今天的时间：'+date);
        return date.getTime();
    },
    //获取今年1月1日0点0分0秒的时间戳
    getYearUnix:function(){
        var date=new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //返回 年月日格式
    getLastDate:function(time){
        var date=new Date(time);
        var month = date.getMonth()+1<10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDay()<10 ? '0'+date.getDay() : date.getDay();
        return date.getFullYear()+'-'+month+'-'+day;
    },
    //转换时间
    getFormatTime:function(timestamp){
        var now=this.getUnix();  //当前时间戳
        var today=this.getTodayUnix();  //今天0点时间戳
        var year = this.getYearUnix();  //今年0点时间戳
        var timer = (now-timestamp)/1000;  //转换为秒级时间戳
        var tip='';
        //if(timer<=0) tip='刚刚';
        if(Math.floor(timer/60)<=0 ){  //放一块会有问题吗？ 是为了提高效率？// timer<=60不一样吗
            tip='刚刚';
        }else if(timer<3600){
            tip=Math.floor(timer/60)+'分钟前';
            //console.log('?分钟'+tip)
        }else if(timer>=3600 && (timestamp-today>=0)){ //timer>=3600  应该可以去掉吧
            //timestamp > today?   timestamp是当前的时间
            //console.log('?小时');
            tip=Math.floor(timer/3600)+'小时前';
        }else if(timer/86400 <=31){    //24*3600
            //console.log('天');
            tip=Math.ceil(timer/86400)+'天前';
        }else{
            //console.log('getlastDate');
            tip=this.getLastDate(timestamp);
        }
        var date1=new Date(now);
        var date2 = new Date(today);
        var date3 = new Date(timestamp);
        //console.log('now:'+date1);
        //console.log('today:'+date2);
        //console.log('timestamp:'+date3);
        //console.log('now-timestamp:'+(now-timestamp));
        //console.log('timestamp-today:'+(timestamp-today));
        return tip;
    }
};

Vue.directive('time',{
    bind:function(el,binding){
        //第一次会延迟5秒
        el.innerHTML=Time.getFormatTime(binding.value),
        el.__timeout__=setInterval(function(){
            el.innerHTML=Time.getFormatTime(binding.value);
        },5000);
    },
    unbind:function(el){
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
})