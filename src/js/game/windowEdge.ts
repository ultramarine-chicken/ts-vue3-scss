import ClientWatcher from './client-watcher';

import * as Engin from '../engin/engin';

export default class BrowserEdge extends Engin.Actor{
    watcher: ClientWatcher;
    type: string;
    prevY: number | undefined;
    getEdge: any = {top: this.getTopEdge.bind(this), bottom: this.getBottomEdge.bind(this)};
    readonly friction: number = 0.001;
    constructor(clientWatcher: ClientWatcher, type: string){
        super();
        this.watcher = clientWatcher;
        this.type = type;
        this.vy = 0;
        this.y = this.getEdge[this.type]();
        
    }
    act(delta: number): void {
        this.y = this.getEdge[this.type]();

        if(this.prevY) this.vy = (this.y - this.prevY);

        this.prevY = this.y;

    }
    getTopEdge(){
        const watcher = this.watcher;
        return (-watcher.canvasTop)*watcher.gameRatioToCanvasAboutSize;
    }
    getBottomEdge(){
        
        const watcher = this.watcher;
        return (watcher.viewHeight - watcher.canvasTop)*watcher.gameRatioToCanvasAboutSize;
    }
}