import Wall from './wall';

import ClientWatcher from './client-watcher';

import * as Engin from '../engin/engin';

/*
export default class BrowserEdge extends Wall{
    getEdge: {top: Function, bottom: Function};
    gameInfo: any;
    type: string;
    watcher: ClientWatcher;
    prevY: number;
    constructor(watcher: ClientWatcher, option: {type: string, thickness: number}){
        super();
        this.getEdge = {
            top: this.getTopEdge.bind(this),
            bottom: this.getBottomEdge.bind(this)
        }
        
        this.type = option.type;
        this.watcher = watcher;

        super(0, this.getEdge[option.type](), this.watcher.gameWidth, 1);
        this.prevY = this.y;
    }
    getTopEdge(){
        const watcher = this.watcher;
        return (-watcher.canvasTop)*watcher.gameRatioToCanvasAboutSize - this.rectangle.height;
    }
    getBottomEdge(){
        const watcher = this.watcher;
        return (watcher.viewHeight - watcher.canvasTop)*watcher.gameRatioToCanvasAboutSize;
    }
    act(delta: number): void {
        this.y = this.getEdge[this.type]();

        this.vy = this.y - this.prevY;

        this.prevY = this.y;
    }
}*/

export default class BrowserEdge extends Engin.Actor{
    watcher: ClientWatcher;
    type: string;
    prevY: number | undefined;
    getEdge: any = {top: this.getTopEdge.bind(this), bottom: this.getBottomEdge.bind(this)};
    constructor(clientWatcher: ClientWatcher, type: string){
        super();
        this.watcher = clientWatcher;
        this.type = type;
        this.vy = 0;
    }
    act(delta: number): void {
        this.y = this.getEdge[this.type]();

        if(this.prevY) this.vy = (this.y - this.prevY) | 0;

        this.y += this.vy;

        this.prevY = this.y;
    }
    getTopEdge(){
        const watcher = this.watcher;
        return (-watcher.canvasTop)*watcher.gameRatioToCanvasAboutSize - this.rectangle.height;
    }
    getBottomEdge(){
        const watcher = this.watcher;
        return (watcher.viewHeight - watcher.canvasTop)*watcher.gameRatioToCanvasAboutSize;
    }
}