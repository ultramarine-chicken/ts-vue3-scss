
import Sprite from './sprite';
import Container from './container';
import Scene from './scene';
import Actor from './actor';
import Rectangle from './rectangle';

export default class SpriteActor extends Actor{
    sprite: Sprite;
    constructor(image: any = undefined, scene: Scene | undefined = undefined){
        super(scene);
        this.sprite = new Sprite(image);

        this.width = image.width;
        this.height = image.height;

    }
    render(canvas: HTMLCanvasElement){
        const cxt = canvas.getContext('2d')!;
        cxt.drawImage(this.sprite.image, 
                        this.sprite.rectangle.x, this.sprite.rectangle.y, this.sprite.rectangle.width, this.sprite.rectangle.height,
                        this.x | 0, this.y | 0, this.width | 0, this.height | 0);
    }
    beAddedToContainer(container: Container){
        container.add(this);
    }
}

class MovableSpriteActor extends SpriteActor{
    vx: number = 0;
    vy: number = 0;
    hitRect: {x: number, y: number, width: number, height: number} = {x: 0, y: 0, width: this.width, height: this.height};
    constructor(image: any = undefined, scene: Scene | undefined = undefined){
        super(image, scene);
    }
    detectCollision(other: Actor){
        const virtualPosition = {x: this.x + this.vx, y: this.y + this.vy};
        
        return true;
    }
}
export {MovableSpriteActor};