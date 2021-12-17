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
        el: HTMLCanvasElement | undefined,
        width: number, height: number
    } | undefined = undefined){
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

        const thickness = 500;
        const leftWall = new Wall(-thickness, 0, thickness, this.height);
        const rightWall = new Wall(this.width, 0, thickness, this.height);
        const topWall = new Wall(0, -thickness, this.width, thickness);
        const bottomWall = new Wall(0, this.height, this.width, thickness);

        
        const clientWatcher = new ClientWatcher(this.canvas!, {width: this.width, height: this.height});
        const browserTopEdge = new BrowserEdge(clientWatcher, 'top');
        const browserBottomEdge = new BrowserEdge(clientWatcher, 'bottom');
        mainScene.add(browserTopEdge);
        mainScene.add(browserBottomEdge);

        const ball = new Ball();
        ball.walls = new Set([leftWall, rightWall, topWall, bottomWall]);
        ball.browserTopEdge = browserTopEdge;
        ball.browserBottomEdge = browserBottomEdge;
        this.baseContainer.add(ball);
        mainScene.add(ball);

        const text = new Engin.Text('hoge');
        this.baseContainer.add(text);
        text.x = 0;
        text.y = 0;


        /*
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
        }*/
        
        this.startLoop();
    }
}

