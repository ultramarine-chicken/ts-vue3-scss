import Container from './container';
export default class Sprite extends Container{
    image: any = undefined;
    constructor(image: any){
        super();
        this.image = image;
    }
    update(canvas: HTMLCanvasElement): void {
        this.render(canvas);
        for(let i=0, len=this.children.length;i<len;i++){
            this.children[i].update(canvas);
        }
    }
    render(canvas){
        const cxt = canvas.getContext('2d');
        if(this.image){
            cxt.drawImage(this.image, this.x, this.y);
        }
    }
}