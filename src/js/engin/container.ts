import Rectangle from './rectangle';

export default class Container{
    children: Array<Container> = [];
    position: {x: number, y: number} = {x: 0, y: 0};
    size: {width: number, height: number} = {width: 0, height: 0};
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
        this.position.x = pos;
    }
    get x(){
        return this.position.x;
    }
    set y(pos: number){
        this.position.y = pos;
    }
    get y(){
        return this.position.y;
    }
    set width(wid: number){
        this.size.width = wid;
    }
    get width(){
        return this.size.width;
    }
    set height(hei: number){
        this.size.height = hei;
    }
    get height(){
        return this.size.height;
    }
    get rectangle(){
        return new Rectangle(this.x, this.y, this.width, this.height);
    }
}