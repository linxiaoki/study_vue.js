Vue.directive('clickoutside',{
    //bind 是钩子(hook)
    bind:function(el,binding,vnode){
        //作为句柄(handler) 绑定在document的click事件上
        function documentHandler(e){
            if(!el.contains(e.target) || (e.keyCode===27)){
                if(binding.expression){
                    console.log('binding.value:  ' + binding.value);
                    binding.value();    //
                }
            }else{
                return false;
            }

            /*
            console.log('判断:'+el.contains(e.target) || (e.keyCode && e.keyCode !== 27));
            if(el.contains(e.target) ){
                //el 在main范围里面点击，就返回false
                //也就是说，只在外面点击才触发
                //console.log('el.contains: '+el.contains(e.target));
                return false
            }
            //判断当前指令 v-clickoutside 有没有写表达式
            if(binding.expression){
                //console.log('binding.value---e:  ' + e);
                binding.value();    //
            }*/
        }
        el.__vueClickOutside__= documentHandler;
        document.addEventListener('click',documentHandler);
        if(binding.modifiers.esc) document.addEventListener('keyup',documentHandler);
    },
    unbind:function(el,binding){
        //移除监听事件，删除钩子
        document.removeEventListener('click',el.__vueClickOutside__);
        if(binding.modifiers.esc) document.removeEventListener('keyup',el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
    componentUpdated:function(){
        console.log('-------componentUpdated');
    },
    update:function(){
        console.log('-------update');
    }
});