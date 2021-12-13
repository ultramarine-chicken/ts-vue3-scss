import Container from './container';
import Rectangle from './rectangle';
import Sprite from './sprite';
import Scene from './scene';
export default class Actor extends Container{
    sprite: Sprite = new Sprite();
    actions: Array<Function> = [];
    hitArea: Rectangle = new Rectangle();
    constructor(image: any = undefined, scene: Scene | undefined = undefined){
        super();
        this.sprite = new Sprite(image, {x: 0, y: 0, width: image.width, height: image.height});
        this.rectangle.width = image.width;
        this.rectangle.height = image.height;

        if(scene) scene.add(this);
    }
    update(delta: number = 1): void {
        for(let func of this.actions){
            func(delta);
        }
    }
    render(canvas: HTMLCanvasElement){
        const cxt = canvas.getContext('2d')!;
        if(this.sprite){
            cxt.drawImage(this.sprite.image, 
                            this.sprite.rectangle.x, this.sprite.rectangle.y, this.sprite.rectangle.width, this.sprite.rectangle.height,
                            this.x, this.y, this.rectangle.width, this.rectangle.height);
        }
    }
}