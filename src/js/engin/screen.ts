export default class Screen {
    canvas: HTMLCanvasElement | undefined = undefined;

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
            return this.canvas.getContext(opt)! as CanvasRenderingContext2D;
        } else {
            throw Error('The canvas has not been set.');
        }
    }
    clear(){
        const cxt = this.getContext('2d');
        cxt.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    }
}