import Container from './container';
export default class Sprite extends Container{
    image: any = undefined;
    actions: Array<Function> = [];
    width: number = 0;
    height: number = 0;
    constructor(image: any = undefined){
        super();
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    update(canvas: HTMLCanvasElement, delta: number): void {
        for(let func of this.actions){
            func(delta);
        }
        
        for(let i=0, len=this.children.length;i<len;i++){
            this.children[i].update(canvas, delta);
        }

        this.render(canvas);
    }
    render(canvas){
        const cxt = canvas.getContext('2d');
        if(this.image){
            cxt.drawImage(this.image, this.x, this.y);
        }
    }
}