import * as Engin from '../engin/engin';

export default class Ball extends Engin.SpriteActor{
    vx: number = 0;
    vy: number = 0;
    walls: Set<any> = new Set();
    browserTopEdge: any | undefined;
    browserBottomEdge: any | undefined;
    DOMInformation: any;
    readonly elasticity = 0.8;
    readonly airResistance = 0.01;
    readonly friction = 0.05;
    constructor(){
        super(Engin.Loader.get('ball'));

        this.x = 10;
        this.y = 10;
        const angle = Math.PI/6;//Math.random()*Math.PI*2;
        const v = 1;
        this.vx = Math.cos(angle)*v;
        this.vy = Math.sin(angle)*v;
    }
    act(delta: number): void {
        this.move(delta);
        this.calcVelocity(delta);
        this.detectHitToWalls(delta);
        this.considerBrowserEdges();

        
    }
    calcVelocity(delta: number){
        const gravity = 0.1;
        this.vy += gravity*delta;

        const airResistance = this.airResistance;
        this.vx -= Math.sign(this.vx)*Math.min(Math.abs(this.vx)*airResistance*delta, Math.abs(this.vx));
        this.vy -= Math.sign(this.vy)*Math.min(Math.abs(this.vy)*airResistance*delta, Math.abs(this.vy));

        const max = 15;
        this.vx = Math.min(Math.max(this.vx, -max), max);
        this.vy = Math.min(Math.max(this.vy, -max), max);
    }
    move(delta: number){
        
        this.x = (this.x + this.vx * delta);
        this.y = (this.y + this.vy * delta);

    }
    detectHitToWalls(delta: number){
        const elasticity = this.elasticity;
        for(let wall of this.walls){
            const detectInfo = this.detectCollision(wall, delta);
            if(detectInfo.vertical){
                this.x = -(this.hitRect.x+this.hitRect.width*0.5) 
                        + (wall.x + wall.hitRect.x + wall.hitRect.width*0.5) 
                        - Math.sign(this.vx)*(wall.hitRect.width + this.hitRect.width)*0.5; 
                this.vx = (wall.vx - this.vx)*elasticity;
            } else if(detectInfo.horizontal){
                this.y = -(this.hitRect.y+this.hitRect.height*0.5) 
                        + (wall.y + wall.hitRect.y + wall.hitRect.height*0.5) 
                        - Math.sign(this.vy - wall.vy)*(wall.hitRect.height + this.hitRect.height)*0.5; 
                this.vy = (wall.vy - this.vy)*elasticity;
            }
        }
    }
    considerBrowserEdges(){
        const elasticity = this.elasticity;
        if(this.y + this.vy < this.browserTopEdge.y) {
            this.vy = -(this.vy - this.browserTopEdge.vy)*elasticity;
            this.y += this.browserTopEdge.y - (this.y + this.vy);
            
            this.vx -= Math.sign(this.vx)*Math.min(this.friction, Math.abs(this.vx));
        }
        if(this.y + this.hitRect.y + this.hitRect.height + this.vy> this.browserBottomEdge.y){
            this.vy = -(this.vy - this.browserBottomEdge.vy)*elasticity;
            this.y += this.browserBottomEdge.y - (this.y + this.height + this.vy);

            this.vx -= Math.sign(this.vx)*Math.min(this.friction, Math.abs(this.vx));
        }
        
    }
}