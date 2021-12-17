export default class RenderingContext {
    cxt: CanvasRenderingContext2D;
    constructor(canvas : HTMLCanvasElement){
        this.cxt = canvas.getContext('2d')!;
    }
    drawImage(img, position, scale, rectangle){
        this.cxt.drawImage(img, 
                            rectangle.x, rectangle.y, rectangle.width, rectangle.height,
                            position.x, position.y, img.width*scale.x, img.height*scale.y);
    }
    drawText(text: string, position: any, style: any){
        const cxt = this.cxt;
        cxt.textBaseline = 'top';
        cxt.font = style.font + 'px sans-serif';
        cxt.fillText(text, position.x, position.y);
    }
}