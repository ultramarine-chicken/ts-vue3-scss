export default class Rectangle {
    
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    constructor(x=0, y=0, w=0, h=0){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    detectCollision(other: Rectangle){
        return Math.abs((this.x+this.width*0.5) - (other.x+other.width*0.5)) < (this.width + other.width)*0.5
                && Math.abs((this.y+this.height*0.5) - (other.y+other.height*0.5)) < (this.height + other.height)*0.5;
    }
    detectVerticalCollision(other: Rectangle){
        return Math.abs((this.x+this.width*0.5) - (other.x+other.width*0.5)) < (this.width + other.width)*0.5;
    }
    detectHorizontalCollision(other: Rectangle){
        return Math.abs((this.y+this.height*0.5) - (other.y+other.height*0.5)) < (this.height + other.height)*0.5;
    }
}