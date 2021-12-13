import Container from './container';
export default class Sprite extends Container{
    image: any = undefined;
    actions: Array<Function> = [];
    constructor(image: any = undefined){
        super();
        this.image = image;
    }
    update(canvas: HTMLCanvasElement): void {
        for(let func of this.actions){
            func();
        }
        
        for(let i=0, len=this.children.length;i<len;i++){
            this.children[i].update(canvas);
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