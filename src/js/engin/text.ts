import SpriteActor from './sprite_actor';

interface TextStyle {
    fontSize: number;
    fill: string;
}

export default class Text extends SpriteActor {
    _text: string;
    canvas: HTMLCanvasElement | undefined;
    style: TextStyle
    baseCanvas: HTMLCanvasElement;
    ticking : boolean = false;
    gameWidth: number;
    styleRatio: number;
    drawingRatio: number;
    drawingRatioInverse: number;

    constructor(text: string = '', {fontSize = 20, fill= '0x000000', baseCanvas, gameWidth}){
        super();
        this._text = text;
        
        this.style = {
            fontSize: fontSize,
            fill: fill
        };
        this.baseCanvas = baseCanvas;
        this.gameWidth = gameWidth;

        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.canvas.width = baseCanvas.width;
        this.canvas.height = baseCanvas.height;

        const cxt = this.canvas.getContext('2d')!;
        const width = document.getElementById('screen')!.clientWidth;
        const styleRatio = width/gameWidth;             // = 700/200
        const drawingRatio = baseCanvas.width/gameWidth;// = 875/200
        const drawingRatioInvers = 1/drawingRatio;
        this.styleRatio = styleRatio;
        this.drawingRatio = drawingRatio;
        this.drawingRatioInverse = drawingRatioInvers;
        
        cxt.textBaseline = 'top';
        cxt.font = fontSize + 'px sans-serif';
        
        const textData = cxt.measureText(this._text);
        const textWidth = textData.width;
        const textHeight = textData.actualBoundingBoxAscent + textData.actualBoundingBoxDescent;

        cxt.scale(styleRatio, styleRatio);
        cxt.fillText(this._text, 0, 0);

        this._sprite.image = this.canvas;
        this._sprite.rectangle = {x: 0, y: 0, width: textWidth*drawingRatio, height: textHeight*drawingRatio};
        this.scale.set(drawingRatioInvers);

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
    render(context: any){
        context.drawImage(this._sprite.image, this.position, this.scale, this._sprite.rectangle, true);
    }
    set text(text: string){
        this._text = text;
        
        const canvas = this.canvas!;
        const cxt = canvas.getContext('2d')!;
        cxt.clearRect(0, 0, canvas.width, canvas.height);

        const textData = cxt.measureText(this._text);
        const textWidth = textData.width;
        const textHeight = textData.actualBoundingBoxAscent + textData.actualBoundingBoxDescent;

        cxt.fillText(this._text, 0, 0);

        this._sprite.image = canvas;
        this._sprite.rectangle = {x: 0, y: 0, width: textWidth*this.drawingRatio, height: textHeight*this.drawingRatio};
        this.scale.set(this.drawingRatioInverse);
    }
    set fontSize(size: number){
        this.style.fontSize = size;

        const canvas = this.canvas!;
        const cxt = canvas.getContext('2d')!;
        cxt.clearRect(0, 0, canvas.width, canvas.height);

        cxt.font = size + 'px sans-serif';
        const textData = cxt.measureText(this._text);
        const textWidth = textData.width;
        const textHeight = textData.actualBoundingBoxAscent + textData.actualBoundingBoxDescent;
        
        cxt.fillText(this._text, 0, 0);

        this._sprite.image = canvas;
        this._sprite.rectangle = {x: 0, y: 0, width: textWidth*this.drawingRatio, height: textHeight*this.drawingRatio};
        this.scale.set(this.drawingRatioInverse);
    }
    get text(){
        return this._text;
    }
}