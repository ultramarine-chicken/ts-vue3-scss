
import Sprite from './sprite';
import Container from './container';
import Scene from './scene';
import Actor from './actor';

export default class SpriteActor extends Actor{
    sprite: Sprite;
    constructor(image: any = undefined, scene: Scene | undefined = undefined){
        super(scene);
        this.sprite = new Sprite(image);

        this.rectangle.width = image.width;
        this.rectangle.height = image.height;
    }
    render(canvas: HTMLCanvasElement){
        
        const cxt = canvas.getContext('2d')!;
        cxt.drawImage(this.sprite.image, 
                        this.sprite.rectangle.x, this.sprite.rectangle.y, this.sprite.rectangle.width, this.sprite.rectangle.height,
                        this.x, this.y, this.rectangle.width, this.rectangle.height);
    }
    beAddedToContainer(container: Container){
        container.add(this);
    }
}