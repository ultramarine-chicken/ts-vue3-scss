export default class Container{
    children: Array<Container> = [];
    position: {x: number, y: number} = {x: 0, y: 0};
    constructor(){
    }
    update(canvas: HTMLCanvasElement){
        for(let i=0, len=this.children.length;i<len;i++){
            this.children[i].update(canvas!);
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
}