import assetData from './assets.js';
import * as Engin from '../engin/engin';

import Ball from './ball';
import Wall from './wall';
import BrowserEdge from './windowEdge';
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
        const windowTopWall = new BrowserEdge('top', clientWatcher);
        const windowBottomWall = new BrowserEdge('bottom', clientWatcher);
        mainScene.add(windowTopWall);
        mainScene.add(windowBottomWall);

        const ball = new Ball();
        ball.walls = new Set([leftWall, rightWall, topWall, bottomWall, windowTopWall, windowBottomWall]);
        this.baseContainer.add(ball);
        mainScene.add(ball);

        const textShowingDelta = new Engin.Text('delta: ' + this.ticker.delta);
        this.baseContainer.add(textShowingDelta);
        textShowingDelta.act = () => {
            textShowingDelta.text = ((this.ticker.delta*1000)|0)/1000 + '';
        }
        mainScene.add(textShowingDelta);

        const topaza = new Engin.SpriteActor(Engin.Loader.get('aza'));
        this.baseContainer.add(topaza);
        mainScene.add(topaza);
        topaza.act = () => {
            topaza.y = -clientWatcher.canvasTop*clientWatcher.gameRatioToCanvasAboutSize;
        }

        const bottomaza = new Engin.SpriteActor(Engin.Loader.get('aza'));
        this.baseContainer.add(bottomaza);
        mainScene.add(bottomaza);
        bottomaza.act = () => {
            const watcher = clientWatcher;
            bottomaza.y = (watcher.viewHeight - watcher.canvasTop)*watcher.gameRatioToCanvasAboutSize - bottomaza.height;
        }
        
        this.startLoop();
    }
}

