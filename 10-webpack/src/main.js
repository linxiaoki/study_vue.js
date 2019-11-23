//main.js
import Vue from "vue";
import app from './app.vue';

import './style.css';

new Vue({
    el: "#app",
    render: h=>h(app)
});

document.getElementById("app").innerHTML="hello";