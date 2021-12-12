<template>
    <div class='main-box'>
        <canvas id="screen"></canvas>
        a
    </div>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue';

    import Game from './game/game';

    export default defineComponent({
        name: 'App',
        data(){
            return {
                
            }
        },
        mounted(){
            const screen = document.getElementById('screen')! as HTMLCanvasElement;
            const game: any = new Game(screen);

    
        }
    });
</script>

<style lang='scss' scoped>
    $width-pc: 700px;
    $width-tablet: 95vw;
    $height-ratio-to-width: 5;
    .main-box{
        background-color: white;
    
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
    canvas{
        
        position: absolute;
        left: 0;
        top: 0;
        @include mq-pc{
            width: $width-pc;
            height: $width-pc*$height-ratio-to-width;
        }
        @include mq-not-pc{
            width: $width-tablet;
            height: $width-tablet*$height-ratio-to-width; 
        }
    }
</style>