import SpriteActor from './sprite_actor';

class TextStyle {
    fontSize: number = 30;
    fill: string = '0x000000';
}

export default class Text extends SpriteActor {
    _text: string;
    style: TextStyle;
    canvas: HTMLCanvasElement;
    constructor(text: string = '', style: TextStyle = new TextStyle()){
        super();
        this._text = text;
        this.style = style;
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        
        const cxt = this.canvas.getContext('2d')!;
        cxt.font = style.fontSize + "px sans-serif";
        
        this.drawText();

        this.sprite = this.canvas;
    }
    drawText(){
        const canvas = this.canvas;
        const text = this._text;
        const cxt = canvas.getContext('2d')!;

        cxt.clearRect(0, 0, canvas.width, canvas.height);
        cxt.fillText(text, 0, this.style.fontSize);
    }
    set text(text: string){
        this._text = text;
        
        this.drawText();
        
        this.sprite = this.canvas;
    }
    get text(){
        return this._text;
    }
}