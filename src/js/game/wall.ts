import * as Engin from '../engin/engin';

export default class Wall extends Engin.Actor {
    constructor(x: number=0, y: number=0, w: number=0, h: number=0){
        super();
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
}