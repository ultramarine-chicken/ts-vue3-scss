import * as Engin from '../engin/engin';

export default class Ball extends Engin.SpriteActor{
    vx: number = 0;
    vy: number = 0;
    walls: Set<any> = new Set();
    DOMInformation: any;
    constructor(){
        super(Engin.Loader.get('ball'));

        this.x = 20;
        this.y = 20;
        const angle = Math.random()*Math.PI*2;
        const v = 2;
        this.vx = Math.cos(angle)*v;
        this.vy = Math.sin(angle)*v;
    }
    act(delta: number): void {

        this.detectHitToWalls();
        this.move(delta);
    }

    move(delta: number){
        this.x = (this.x + this.vx * delta);
        this.y = (this.y + this.vy * delta);

        this.vx += (Math.random()-0.5)*1;
        this.vy += (Math.random()-0.5)*1;
    }
    detectHitToWalls(){
        for(let wall of this.walls){
            const detectInfo = this.detectCollision(wall);
            if(detectInfo.vertical){
                this.vx = -this.vx;
                return;
            } else if(detectInfo.horizontal){
                this.vy = -this.vy;
                return;
            }
        }
    }
}