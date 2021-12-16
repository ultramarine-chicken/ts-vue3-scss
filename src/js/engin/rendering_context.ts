export default class RenderingContext {
    cxt: CanvasRenderingContext2D;
    constructor(canvas : HTMLCanvasElement){
        this.cxt = canvas.getContext('2d')!;
    }
    drawImage(img, position, size, rectangle){
        this.cxt.drawImage(img, 
                            rectangle.x, rectangle.y, rectangle.width, rectangle.height,
                            position.x, position.y, rectangle.width, rectangle.height);
    }
}