import Rectangle from './rectangle';
export default class Sprite {
    image:any;
    rectangle: Rectangle = new Rectangle;
    constructor(image: any = undefined, rect: any = undefined){
        this.image = image;
        if(rect){
            this.rectangle = rect;
        } else {
            this.rectangle = new Rectangle(0, 0, image.width, image.height);
        }
        
    }
}