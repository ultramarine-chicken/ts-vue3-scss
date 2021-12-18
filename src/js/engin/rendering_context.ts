export default class RenderingContext {
    cxt: CanvasRenderingContext2D;
    constructor(canvas : HTMLCanvasElement){
        this.cxt = canvas.getContext('2d')!;
        
    }
    drawImage(img, position, scale, rectangle, smooth: boolean = false){
        const cxt = this.cxt;
        cxt.imageSmoothingEnabled = smooth;
        cxt.drawImage(img, 
                            rectangle.x, rectangle.y, rectangle.width, rectangle.height,
                            position.x, position.y, rectangle.width*scale.x, rectangle.height*scale.y);
    }
    drawText(text: string, position: any, style: any){
        const cxt = this.cxt;
        cxt.textBaseline = 'top';
        cxt.font = style.font + 'px sans-serif';
        cxt.fillText(text, position.x, position.y);
    }
}