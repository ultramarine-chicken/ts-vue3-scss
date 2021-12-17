
import Sprite from './sprite';
import Container from './container';
import Scene from './scene';
import Actor from './actor';
import Rectangle from './rectangle';

export default class SpriteActor extends Actor{
    _sprite: Sprite;
    constructor(image: any = undefined){
        super();
        this._sprite = new Sprite(image);

        this.width = image?.width || 0;
        this.height = image?.height || 0;

        this.hitRect = {x: 0, y: 0, width: image?.width || 0, height: image?.height || 0};

    }
    render(context){
        if(this.sprite.image){
            context.drawImage(this._sprite.image, this.position, this.size, this._sprite.rectangle);
        }
    }
    set sprite(img:any){
        this._sprite.image = img;
        this._sprite.rectangle = {x: 0, y: 0, width: img.width, height: img.height};
        this.hitRect = {x: 0, y: 0, width: img.width, height: img.height};
        this.size = {width: img.width, height: img.height};
    }
    get sprite(){
        return this._sprite;
    }
}
