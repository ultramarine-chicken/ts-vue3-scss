<template>
    <div class='main-box'>
        {{ helloText }}
    </div>
</template>

<style lang='scss' scoped>
    .main-box{
        background-color: white;
        color: red;
    }
</style>

<script lang='ts'>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'App',
        setup(){
            return{
                helloText: 'Hell, World!'
            }
        }
    });
</script>