import assetData from './assets.js';
import * as Engin from '../engin/engin';

let Sprite = Engin.Sprite;

class Ball extends Engin.Sprite{
    constructor(image: any){
        super(image);
        this.actions = [this.move.bind(this)];
    }
    move(){
        this.x += 1;
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
