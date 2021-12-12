export default class Screen {
    canvas: HTMLCanvasElement | undefined = undefined;
    constructor(){

    }
    getCanvasElement(el: HTMLCanvasElement){
        this.canvas = el!;
    }
    setSize(width: number, height: number){
        if(this.canvas){
            this.canvas.width = width;
            this.canvas.height = height;
        } else {
            throw Error('The canvas has not been set.');
        }

    }
    getContext(opt: string){
        if(this.canvas){
            this.canvas.getContext(opt);
        } else {
            throw Error('The canvas has not been set.');
        }
        
    }
}