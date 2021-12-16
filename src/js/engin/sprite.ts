import Rectangle from './rectangle';
export default class Sprite {
    image:any;
    rectangle: {x: number, y: number, width: number, height: number} = {x: 0, y: 0, width: 0, height: 0};
    constructor(image: any = undefined, rect: any = undefined){
        this.image = image;
        if(!image){
            return;
        }
        if(rect){
            this.rectangle = rect;
        } else {
            this.rectangle = {x: 0, y: 0, width: image.width, height: image.height};
        }
        
    }
}