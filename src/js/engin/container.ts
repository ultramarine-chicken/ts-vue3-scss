import Rectangle from './rectangle';

export default class Container{
    children: Array<Container> = [];
    rectangle: Rectangle = new Rectangle();
    constructor(){
    }
    render(canvas: HTMLCanvasElement){
        for(let i=0, len=this.children.length;i<len;i++){
            this.children[i].render(canvas!);
        }
    }
    add(obj: Container){
        this.children.push(obj);
    }
    set x(pos: number){
        this.rectangle.x = pos;
    }
    get x(){
        return this.rectangle.x;
    }
    set y(pos: number){
        this.rectangle.y = pos;
    }
    get y(){
        return this.rectangle.y;
    }
    set width(wid: number){
        this.rectangle.width = wid;
    }
    get width(){
        return this.rectangle.width;
    }
    set height(hei: number){
        this.rectangle.height = hei;
    }
    get height(){
        return this.rectangle.height;
    }
}