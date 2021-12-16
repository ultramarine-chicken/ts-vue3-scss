import assetData from './assets.js';
import * as Engin from '../engin/engin';

import Ball from './ball';
import Wall from './wall';
import WindowEdge from './windowEdge';
import MainScene from './mainScene';
import ClientWatcher from './client-watcher';

//エイリアス

export default class Game extends Engin.Application{
    constructor(options: {
        el: HTMLCanvasElement,
        width: number, height: number
    }){
        super(options);


        this.loadingMode = 'dynamic';
        
        const assets = assetData.assets;
        for(let i=0, len=assets.length;i<len;i++){
            this.addAsset(assets[i].id, assetData.path + assets[i].src);
        }
        this.loadAll()
                .then(this.setup.bind(this));
    }
    setup(){
        console.log('setup');

        const mainScene = new MainScene();
        this.currentScene = mainScene;

        const leftWall = new Wall(0, 0, 1, this.height);
        const rightWall = new Wall(this.width, 0, 1, this.height);
        const topWall = new Wall(0, 0, this.width, 1);
        const bottomWall = new Wall(0, this.height, this.width, 1);

        const clientWatcher = new ClientWatcher(this.canvas!, {width: this.width, height: this.height});
        const windowTopWall = new WindowEdge('top', clientWatcher);
        const windowBottomWall = new WindowEdge('bottom', clientWatcher);
        mainScene.add(windowTopWall);
        mainScene.add(windowBottomWall);

        const ball = new Ball();
        ball.walls = new Set([leftWall, rightWall, topWall, bottomWall, windowTopWall, windowBottomWall]);
        this.baseContainer.add(ball);
        mainScene.add(ball);


        
        this.startLoop();
    }
}

