import assetData from './assets.js';
import * as Engin from '../engin/engin';

import Ball from './ball';
import MainScene from './mainScene';

//エイリアス

export default class Game extends Engin.Application{
    DOMInformation: any;
    constructor(options){
        super(options);
        
        const assets = assetData.assets;
        for(let i=0, len=assets.length;i<len;i++){
            Engin.Loader.add(assets[i].id, assetData.path + assets[i].src);
        }
        Engin.Loader.loadAll()
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

        const mainScene = new MainScene();
        mainScene.add(ball);
        this.currentScene = mainScene;

        this.startLoop();
    }
}

