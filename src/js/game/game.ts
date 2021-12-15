import assetData from './assets.js';
import * as Engin from '../engin/engin';

import Ball from './ball';
import Wall from './wall';
import WindowEdge from './windowEdge';
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

        const mainScene = new MainScene();
        this.currentScene = mainScene;

        const gameInfo = {
            canvas: this.canvas,
            width: this.width,
            height: this.height,
            canvasY: this.canvas!.getBoundingClientRect().top
        }
        const leftWall = new Wall(0, 0, 1, this.height);
        const rightWall = new Wall(this.width, 0, 1, this.height);
        const topWall = new Wall(0, 0, this.width, 1);
        const bottomWall = new Wall(0, this.height, this.width, 1);
        const windowTopWall = new WindowEdge(gameInfo, 'top');
        const windowBottomWall = new WindowEdge(gameInfo, 'bottom');
        mainScene.add(windowTopWall);
        mainScene.add(windowBottomWall);
        

        const ball = new Ball();
        ball.walls = new Set([leftWall, rightWall, topWall, bottomWall, windowTopWall, windowBottomWall]);
        this.baseContainer.add(ball);
        mainScene.add(ball);



        
        this.startLoop();
    }
}

