import assetData from './assets.js';
import * as Engin from '../engin/engin';

//エイリアス
const Sprite = Engin.Sprite;
const Loader = Engin.Loader;

class Ball extends Engin.Sprite{
    vx: number = 0;
    vy: number = 0;
    wall: {x: number, y: number, w: number, h: number};
    DOMInformation: any;
    constructor(wallInfo: any, DOMInformation){
        super(Loader.get('ball'));
        this.actions = [this.detectHitToWall.bind(this),
                        this.move.bind(this)];

        this.x = 200;
        this.y = 200;
        const angle = Math.random()*Math.PI*2;
        //const angle = Math.PI*0.3;
        const v = 5;
        this.vx = Math.cos(angle)*v;
        this.vy = Math.sin(angle)*v;

        this.wall = wallInfo;
        this.DOMInformation = DOMInformation;
    }
    move(delta: number){
        this.x = (this.x + this.vx * delta);
        this.y = (this.y + this.vy * delta);
    }
    detectHitToWall(){
        if(this.x < 0 || this.x + this.width> 0 + this.wall.w){
            this.vx = -this.vx;
        }

        const docInfo = this.DOMInformation;
        const windowWall = {
            top: (window.scrollY - docInfo.canvasY)*docInfo.screenRatioToCanvas(),
            bottom: (window.scrollY + docInfo.windowHeight - docInfo.canvasY)*docInfo.screenRatioToCanvas()
        };

        const collisionTop = (top) => {
            if(this.y< top){
                this.y = top + 1;
                this.vy = -this.vy;
            }
        }
        const collisionBottom = (bottom) => {
            if(this.y + this.height> bottom) {
                this.y = bottom - this.height - 1;
                this.vy = -this.vy;
            }
        }
        collisionTop(0);
        collisionBottom(this.wall.h);
        collisionTop(windowWall.top);
        collisionBottom(windowWall.bottom);



    }
}

export default class Game extends Engin.Application{
    DOMInformation: any;
    constructor(options){
        super(options);
        
        const path = assetData.path;
        const assets = assetData.assets;
        for(let i=0, len=assets.length;i<len;i++){
            Loader.add(assets[i].id, path + assets[i].src);
        }
        Loader.loadAll()
                .then(this.setup.bind(this));

        const canvasRect = options.el.getBoundingClientRect();
        this.DOMInformation = {
            canvasY: canvasRect.top,
            windowHeight : document.documentElement.clientHeight,
            canvasHeight: options.el.clientHeight,
            screenRatioToCanvas: ()=>{
                return this.height/this.DOMInformation.canvasHeight;
            }
        };
    }
    setup(){
        console.log('setup');

        const ball = new Ball({x: 0, y: 0, w: this.width, h: this.height}, this.DOMInformation);
        this.baseContainer.add(ball);


        this.ticker.add(this.mainLoop.bind(this));
        this.startLoop();
    }
    mainLoop(delta: number){
        //this.aza.x += 1;
    }
}
