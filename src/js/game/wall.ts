import * as Engin from '../engin/engin';

export default class LinierWall extends Engin.Actor {
    readonly friction: number = 0.001
    constructor(x: number=0, y: number=0){
        super();
        this.x = x;
        this.y = y;
    }
}