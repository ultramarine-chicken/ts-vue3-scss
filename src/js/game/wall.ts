import * as Engin from '../engin/engin';

export default class Wall extends Engin.Rectangle {
    constructor(x: number, y: number, w: number, h: number){
        super(x, y, w, h);
    }
}