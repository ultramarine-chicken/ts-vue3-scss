import Rectangle from './rectangle';
export default class Sprite {
    image:any;
    rectangle: Rectangle = new Rectangle;
    constructor(image: any = undefined, rect: any = undefined){
        this.image = image;
        this.rectangle = rect;
    }
}