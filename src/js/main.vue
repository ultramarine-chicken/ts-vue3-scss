<template>
    <div class='main-box'>
    </div>
</template>

<style lang='scss' scoped>
    .main-box{
        background-color: white;
        

        @include mq-pc{
            width: 1000px;
        }
        @include mq-tablet{
            width: 98vw; 
        }
    }
</style>

<script lang='ts'>
    import { defineComponent } from 'vue';

    import Game from './game/game';

    export default defineComponent({
        name: 'App',
        data(){
            return {
                
            }
        },
        created(){
            
            const game: any = new Game();
        }
    });
</script>