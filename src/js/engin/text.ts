import SpriteActor from './sprite_actor';

class TextStyle {
    fontSize: number = 20;
    fill: string = '0x000000';
}

export default class Text extends SpriteActor {
    _text: string;
    style: TextStyle;
    constructor(text: string = '', style: TextStyle = new TextStyle()){
        super();
        this._text = text;
        this.style = style;
    }
    render(context: any){
        context.drawText(this._text, this.position, this.style);
    }
    set text(text: string){
        this._text = text;
    }
    get text(){
        return this._text;
    }
}