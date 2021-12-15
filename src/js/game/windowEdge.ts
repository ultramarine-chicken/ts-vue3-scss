import Wall from './wall';

import ClientWatcher from './client-watcher';

export default class WindowEdge extends Wall{
    getEdge: {top: Function, bottom: Function};
    gameInfo: any;
    type: string;
    watcher: ClientWatcher
    constructor(type: string, watcher: ClientWatcher){
        super();
        this.getEdge = {
            top: this.getTopEdge.bind(this),
            bottom: this.getBottomEdge.bind(this)
        }
        this.type = type;
        this.watcher = watcher;

        super(0, this.getEdge[type](), this.watcher.gameWidth, 1);
    }
    getTopEdge(){
        const watcher = this.watcher;
        return (-watcher.canvasTop)*watcher.gameHeight/watcher.canvasHeight;
    }
    getBottomEdge(){
        const watcher = this.watcher;
        return (watcher.viewHeight - watcher.canvasTop)*watcher.gameHeight/watcher.canvasHeight;
    }
    act(delta: number): void {
        this.y = this.getEdge[this.type]();
    }
}