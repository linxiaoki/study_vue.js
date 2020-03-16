<template>
    <div>
        <div>Hello{{name}}</div>
        <div>
            <v-title title="Vue组件化"></v-title>
            <v-button @click="handleClick">点击按钮</v-button>
        </div>
    </div>
</template>
<script>
    import vTitle from './title.vue';
    import vButton from './button.vue';

    export default {
        data() {
            return {
                a: "Vue.js"
            }
        },
        components: {
            vTitle: vTitle,
            vButton: vButton
        },
        methods: {
            handleClick(e) {
                console.log(e);
            }
        }
    }

</script>
<style scoped>
    div {
        color: #f60;
        font-size: 24px;
    }
</style>