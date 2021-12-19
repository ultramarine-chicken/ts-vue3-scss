<template>
    <div class='main-box' id='main-box'>
        <canvas ref='screen' id="screen"></canvas>

        
        <div class='delta'>{{ delta }}</div>
    </div>

</template>

<script lang='ts'>
    import { defineComponent } from 'vue';

    import Game from './game/game';

    export default defineComponent({
        name: 'App',
        data(){
            return {
                width: 200,
                heightRatioToWidth: 5,
                delta: '',
            }
        },
        mounted(){
            window.scrollTo(0, 0);
            const screen = this.$refs.screen as HTMLCanvasElement;
            
            const game = new Game({
                el: screen,
                width: this.width,
                height: this.width*this.heightRatioToWidth
            });
            
            const storageDelta = () => {
                this.delta = (game.ticker.delta*100 | 0) / 100 + '';
                requestAnimationFrame(storageDelta);
            }
            requestAnimationFrame(storageDelta);
        },
    });
</script>

<style lang='scss' scoped>
    $width-pc: 700px;
    $width-tablet: 95vw;
    $height-ratio-to-width: 5;
    .main-box{
        background-color: white;
        position: relative;

        overflow: hidden;
        border-radius: 20px;


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
    }
    .delta{
        position: fixed;
        left: 40px;
        top: 40px;
        font-size: 40px;
    }

    h1{
        font-size: 400%;
        margin: 30px 0px;
    }
    h2{
        font-size: 250%;
        margin: 20px 0px;
        margin-left: 30px;
        margin-top: 140px;
    }
    h3{
        font-size: 120%;
        margin: 15px 0px;
        margin-left: 50px;
        margin-top: 25px;
    }
    p{
        font-size: 700%;
        position: absolute;
        bottom: 300px;
    }

</style>