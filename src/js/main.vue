<template>
    <div class='main-box'>
        a
    </div>
</template>

<style lang='scss' scoped>
    .main-box{
        background-color: white;
        
        $width-pc: 700px;
        $width-tablet: 95vw;
        $height-ratio-to-width: 5;
        

        @mixin set-size($width, $ratio){
            width: $width;
            height: $width * $ratio;
        }

        @include mq-pc{
            @include set-size($width-pc, $height-ratio-to-width);
        }
        @include mq-not-pc{
            @include set-size($width-tablet, $height-ratio-to-width);
            margin-left: auto;
            margin-right: auto;
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