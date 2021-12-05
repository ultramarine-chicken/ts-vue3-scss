<template>
    <span class='hello'> {{ helloText }} </span>
</template>

<style scoped>
    .hello{
        color: blue;
        font-size: 40px;
    }
</style>

<script lang='ts'>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'App',
        setup(){
            return{
                helloText: 'Hello, World!'
            }
        }
    });
</script>