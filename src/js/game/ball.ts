import * as Engin from '../engin/engin';

export default class Ball extends Engin.MovableSpriteActor{
    vx: number = 0;
    vy: number = 0;
    walls: Set<any> = new Set();
    DOMInformation: any;
    constructor(){
        super(Engin.Loader.get('ball'));

        this.x = 200;
        this.y = 200;
        const angle = Math.random()*Math.PI*2;
        const v = 5;
        this.vx = Math.cos(angle)*v;
        this.vy = Math.sin(angle)*v;

        this.vx  = 0;
        this.vy = 5;

    }
    act(delta: number): void {

        this.detectHitToWalls();
        this.move(delta);
    }

    move(delta: number){
        this.x = (this.x + this.vx * delta);
        this.y = (this.y + this.vy * delta);
    }
    detectHitToWalls(){
        for(let wall of this.walls){
            if(this.detectCollision(wall)){
                this.vx = -this.vx;
                this.vy = -this.vy;
                return;
            }
        }
    }
}