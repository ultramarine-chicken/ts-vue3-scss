<template>
    <div class='main-box'>
        <canvas ref='screen' id="screen"></canvas>
        <div class='delta'>{{ delta }}</div>
        <h1>やったー！！</h1>
        <h2>何これ？</h2>
        <h3>ブラウザの「ふち」をゲームに取り込もうという試みだよ。</h3>

        <h2>どゆこと？</h2>
        <h3>ボールは壁にぶつかると跳ね返るよ。</h3>
        <h3>divのふちとブラウザのふちが「壁」として認識されているよ。</h3>

        <h2>つまり？</h2>
        <h3>スクロールすると一緒に壁判定も移動するってことだよ。</h3>

        <h2>どうやってんの？</h2>
        <h3>ボールはcanvasに描画しているよ。</h3>
        <h3>scrollイベントでスクロール位置を取得して、<br>resizeイベントでcanvasの位置と高さを取得してるよ。</h3>
        <h3>なんでresizeイベントを使うかというと、<br>canvas(を入れてるdiv)のサイズは<br>ウィンドウの幅に対してレスポンシブにしているからだよ。</h3>
        <h3>scrollの速度も計測してるから、壁の速さによって跳ね方が変わったりするよ</h3>

        <h2>左上の数字は何？怖いんですけど</h2>
        <h3>60fpsに対する実行速度比だよ。</h3>
        <h3>前のフレームからの経過時間が16.7msなら1が表示されるってことだね。</h3>
        <h3>スクロール量やclientHeightの取得は<br>(その都度レンダリングが割り込むから）<br>クソ重くなるらしいんだけどけど、<br>
        requestAnimationFrameで処理を間引いたらなんとかなったよ。</h3>

        <h2>そんで？</h2>
        <h3>なんか面白いことに使えないかなあと思ったけど<br>
            今のところ何も思いついていないよ。</h3>
        <h3>同じような手法で、canvas上のスプライトと<br>他のHTML要素を座標で干渉させ合うことも
            できそうだなあと思ったよ。</h3>
            <h3>普通に全部DOM操作でやるよりは処理が軽くなるんじゃないかなあ。</h3>
            <h3>canvasのサイズにも依るかあ。</h3>
        <p>おわり</p>
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
            const screen = this.$refs.screen as HTMLCanvasElement;
            
            const game = new Game({
                el: screen,
                width: this.width,
                height: this.width*this.heightRatioToWidth
            });
            
            const storageDelta = () => {
                this.delta = game.ticker.delta.toFixed(3);
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