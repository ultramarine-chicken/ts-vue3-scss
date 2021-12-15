import Wall from './wall';
export default class WindowEdge extends Wall{
    getEdge: {top: Function, bottom: Function};
    canvas: HTMLCanvasElement;
    gameInfo: any;
    type: string
    constructor(gameInfo: any, type: string){
        super();
        this.getEdge = {
            top: this.getTopEdge.bind(this),
            bottom: this.getBottomEdge.bind(this)
        }
        this.type = type;
        this.gameInfo = gameInfo;
        this.canvas = gameInfo.canvas;

        super(0, this.getEdge[type](), gameInfo.width, 1);
    }
    getTopEdge(){
        return (window.scrollY - this.gameInfo.canvasY)*this.gameInfo.height/this.canvas.clientHeight;
    }
    getBottomEdge(){
        return (window.scrollY + document.documentElement.clientHeight - this.gameInfo.canvasY)*this.gameInfo.height/this.canvas.clientHeight;
    }
    act(delta: number): void {
        this.y = this.getEdge[this.type]();
        
    }
}