import * as Engin from '../engin/engin';

export default class Ball extends Engin.SpriteActor{
    vx: number = 0;
    vy: number = 0;
    frictions: {x: number, y: number} = {x: 0, y: 0};
    walls: {leftWall?: any, rightWall?: any, topWall?: any, bottomWall?: any} = {};
    browserTopEdge: any | undefined;
    browserBottomEdge: any | undefined;
    DOMInformation: any;
    readonly elasticity = 0.9;
    readonly airResistance = 0.01;
    readonly airFriction = 0.0001;
    readonly gravity = 0.1;
    sound: any;
    constructor(){
        super(Engin.Loader.get('ball'));

        this.x = 10;
        this.y = 10;
        const angle = Math.PI/7;//Math.random()*Math.PI*2;
        const v = 2;
        this.vx = Math.cos(angle)*v;
        this.vy = Math.sin(angle)*v;

        this.sound = Engin.Loader.get('fish');
        
    }
    act(delta: number): void {

        this.move(delta);

        this.resetFrictions();

        this.addGravity(delta);
        
        this.considerEdges(delta);

        

        this.calcAirResistance(delta);
        this.calcFriction(delta);
        this.capVelocity();
    }
    addGravity(delta: number){
        this.vy += this.gravity*delta;
    }
    resetFrictions(){
        const friction = this.airFriction;
        this.frictions = {x: friction, y: friction};
    }
    calcAirResistance(delta: number){
        const airResistance = this.airResistance;
        this.vx -= this.vx*airResistance*delta;
        this.vy -= this.vy*airResistance*delta;
    }
    calcFriction(delta: number){
        
        this.vx -= Math.sign(this.vx)*Math.min(Math.abs(this.vx), this.frictions.x*delta);
        this.vy -= Math.sign(this.vy)*Math.min(Math.abs(this.vy), this.frictions.y*delta);
        
    }
    capVelocity(){
        const max = 15;
        this.vx = Math.min(Math.max(this.vx, -max), max);
        this.vy = Math.min(Math.max(this.vy, -max), max);
    }
    move(delta: number){
        this.x += this.vx*delta;
        this.y += this.vy*delta;
    }
    controllCollision(delta: number, option: {xy: string, thisPos: number, type: string, wall: any}){
        const typeToSign = {'upper': 1, 'lower': -1};
        const sign = typeToSign[option.type];
        const wall = option.wall;
        const thisPos = option.thisPos;
        const xy = option.xy;
        const yx = xy==='x' ? 'y' : 'x';
        const wallPos = wall[xy];
        const scrollVelRectification = 1;
        const collisionVelRecitification = 1.2;
        const wallV = wall['v' + xy];

        if((thisPos + this['v' + xy]*delta) * sign < (wallPos + wallV*delta*scrollVelRectification) * sign){
            this[xy] += (wallPos + wallV*delta*scrollVelRectification) - (thisPos);
            this['v' + xy] += (collisionVelRecitification*wallV - 2*this['v' + xy])*this.elasticity;
            this.frictions[yx] += wall.friction;
            this.frictions[xy] += this.gravity*sign*(-1);

            this.sound.play();
        }
    }
    considerEdges(delta: number){
        this.controllCollision.bind(this)(delta, {xy: 'y', thisPos: this.y, type: 'upper', wall: this.browserTopEdge});
        this.controllCollision.bind(this)(delta, {xy: 'y', thisPos: this.y + this.hitRect.y + this.hitRect.height, type: 'lower', wall: this.browserBottomEdge});
        this.controllCollision.bind(this)(delta, {xy: 'x', thisPos: this.x, type: 'upper', wall: this.walls.leftWall});
        this.controllCollision.bind(this)(delta, {xy: 'x', thisPos: this.x + this.hitRect.x + this.hitRect.width, type: 'lower', wall: this.walls.rightWall});
        this.controllCollision.bind(this)(delta, {xy: 'y', thisPos: this.y, type: 'upper', wall: this.walls.topWall});
        this.controllCollision.bind(this)(delta, {xy: 'y', thisPos: this.y + this.hitRect.x + this.hitRect.width, type: 'lower', wall: this.walls.bottomWall});
    }
}