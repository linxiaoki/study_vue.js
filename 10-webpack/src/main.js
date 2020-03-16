//main.js
import Vue from "vue";
import app from './vue/app.vue';

new Vue({
    el: "#app",
    render: h=>h(app)
});

/* render: funciton(createElement){
    createElement(
        {

        }
    )
}
*/