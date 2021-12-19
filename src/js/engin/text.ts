import SpriteActor from './sprite_actor';

interface TextStyle {
    fontSize: number;
    fill: string;
}

export default class Text extends SpriteActor {
    _text: string;
    offscreenCanvas: HTMLCanvasElement | undefined;
    style: TextStyle;
    ticking : boolean = false;
    gameWidth: number;
    settingResolution: boolean = false;
    drawingRatio: number;
    drawingRatioInverse: number;
    pixelDepth: number = window.devicePixelRatio || 1;

    constructor(text: string = '', {fontSize = 20, fill= '#000AA0', gameWidth, screen = {addOffscreen: (fake)=>{}}}){
        super();
        this._text = text;
        this.style = {
            fontSize: fontSize,
            fill: fill
        };
        this.gameWidth = gameWidth;
        this.offscreenCanvas = document.createElement('canvas') as HTMLCanvasElement;

        const styleWidth = document.getElementById('screen')!.clientWidth;
        const pixelDepth = window.devicePixelRatio;
        this.drawingRatio = styleWidth*pixelDepth/this.gameWidth;
        this.drawingRatioInverse = 1/this.drawingRatio;

        if(screen) {
            screen.addOffscreen(this);
        }

        this.drawTextAndSetSprite();
    }
    drawTextToOffsetCanvas(text: string, style: TextStyle){
        const offscreenCanvas = this.offscreenCanvas!;
        const cxt = offscreenCanvas.getContext('2d')!;
        const drawingRatio = this.drawingRatio;

        cxt.font = style.fontSize + 'px sans-serif';
        cxt.textBaseline = 'top';

        const textData = cxt.measureText(text);
        const textWidth = textData.width;
        const textHeight = textData.actualBoundingBoxDescent - textData.actualBoundingBoxAscent;
        offscreenCanvas.width = textWidth*drawingRatio;
        offscreenCanvas.height = textHeight*drawingRatio;
        
        cxt.font = style.fontSize + 'px sans-serif';
        cxt.textBaseline = 'top';
        cxt.fillStyle = style.fill;
        cxt.scale(drawingRatio, drawingRatio);
        
        cxt.fillText(text, 0, 0);
    }
    setCanvasToSprite(){
        this.sprite = this.offscreenCanvas;
        this.scale.set(this.drawingRatioInverse);
    }
    drawTextAndSetSprite(){
        this.drawTextToOffsetCanvas(this._text, this.style);
        this.setCanvasToSprite();
    }
    render(context: any){
        context.drawImage(this._sprite.image, this.position, this.scale, this._sprite.rectangle, true);
    }
    set text(text: string){
        this._text = text;
        this.drawTextAndSetSprite();
    }
    set fontSize(size: number){
        this.style.fontSize = size;
        this.drawTextAndSetSprite();
    }
    get text(){
        return this._text;
    }
}