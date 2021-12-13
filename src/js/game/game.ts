import assetData from './assets.js';
import * as Engin from '../engin/engin';

let Sprite = Engin.Sprite;

class Ball extends Engin.Sprite{
    vx: number = 0;
    vy: number = 0;
    constructor(image: any){
        super(image);
        this.actions = [this.move.bind(this), this.detectHitToWall.bind(this)];

        this.x = 100;
        this.y = 100;
        const angle = Math.random()*Math.PI*2;
        const v = 2;
        this.vx = Math.sin(angle)*v;
        this.vy = Math.cos(angle)*v;
    }
    move(delta: number){
        this.x += this.vx * delta;
        this.y += this.vy * delta;
    }
    detectHitToWall(){

    }
}

export default class Game extends Engin.Application{
    constructor(options){
        super(options);
        
        const path = assetData.path;
        const assets = assetData.assets;
        for(let i=0, len=assets.length;i<len;i++){
            this.addImage(assets[i].id, path + assets[i].src);
        }
        this.loadThen = this.setup.bind(this);
        this.startLoading();

    }
    setup(){
        console.log('setup');

        const ball = new Ball(this.getAsset('ball'));
        this.baseContainer.add(ball);


        this.ticker.add(this.mainLoop.bind(this));
        this.startLoop();
    }
    mainLoop(delta: number){
        //this.aza.x += 1;
    }
}
