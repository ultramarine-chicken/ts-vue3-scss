export default class RenderingContext {
    cxt: CanvasRenderingContext2D;
    constructor(canvas : HTMLCanvasElement){
        this.cxt = canvas.getContext('2d')!;
    }
    drawImage(img, position, size, rectangle){
        this.cxt.drawImage(img, 
                            rectangle.x, rectangle.y, rectangle.width, rectangle.height,
                            position.x, position.y, size.width, size.height);
    }
    drawText(text: string, position: any, style: any){
        const cxt = this.cxt;
        cxt.textBaseline = 'top';
        cxt.font = style.font + 'px sans-serif';
        cxt.fillText(text, position.x, position.y);
    }
}