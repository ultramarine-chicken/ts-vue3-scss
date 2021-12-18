import SpriteActor from './sprite_actor';
import Rectangle from './rectangle';

interface TextStyle {
    fontSize: number;
    fill: string;
}

export default class Text extends SpriteActor {
    _text: string;
    canvas: HTMLCanvasElement | undefined;
    style: TextStyle
    baseCanvasSize: {width: number, height: number};
    constructor(text: string = '', {fontSize = 20, fill= '0x000000', baseCanvasSize = {width: 300, height: 150}, gameWidth = 200}){
        super();
        this._text = text;
        
        this.style = {
            fontSize: fontSize,
            fill: fill
        };
        this.baseCanvasSize = baseCanvasSize;

        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.canvas.width = baseCanvasSize.width;
        this.canvas.height = baseCanvasSize.height;

        const cxt = this.canvas.getContext('2d')!;
        const c = document.getElementById('screen')!;
        const width = c.clientWidth;
        cxt.scale(width/gameWidth, width/gameWidth);
        
        cxt.textBaseline = 'top';
        cxt.font = fontSize + 'px sans-serif';
        cxt.fillText(this._text, 0, 0);
        
        const textData = cxt.measureText(this._text);
        const textWidth = textData.width;
        const textHeight = textData.actualBoundingBoxAscent + textData.actualBoundingBoxDescent;

        this.sprite = this.canvas;
        this._sprite.rectangle = {x: 0, y: 0, width: textWidth*baseCanvasSize.width/gameWidth, height: textHeight*baseCanvasSize.width/gameWidth};
        this.scale.set(gameWidth/baseCanvasSize.width);

        /*12/18 知見
        別のcanvasでキャッシュしてSpriteActorとして扱うときの手順
        １．canvas用意、ある程度の大きさを用意しておく
        ２．context取得
        ３．gameのサイズを取得 
        ４．メインcanvasのcssスタイルサイズを取得　3, 4は順不同
        ５．contextを(canvasのcssサイズ/gameのサイズ)比でscaleする。
        ６．描画
        ７．メインのcanvasの描画サイズを取得
        ８．Sprite用意、切り取りの幅は(メインcanvasの描画サイズ/gameサイズ)倍にする。
        ９．drawImageするときのサイズは(gameサイズ/メインcanvasの描画サイズ)倍にする。
        １０．おめでとう！
        */
    }
    /*
    render(context: any){
        context.drawText(this._text, this.position, this.style);
    }*/
    
    render(context: any){
        context.drawImage(this._sprite.image, this.position, this.scale, this._sprite.rectangle, true);
    }
    set text(text: string){
        this._text = text;
    }
    get text(){
        return this._text;
    }
}