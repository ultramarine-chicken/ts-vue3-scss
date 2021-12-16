
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
    render(context){
        context.drawImage(this.sprite.image, this.position, this.size, this.sprite.rectangle);
    }
    beAddedToContainer(container: Container){
        container.add(this);
    }
}
