import assets from './assets.js';
import * as Engin from '../engin/engin';

import Ball from './ball';
import LinerWall from './wall';
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


        const imageAssetData = assets.image;
        const imagePath = imageAssetData.path;
        const imageAssets = imageAssetData.assets;
        for(let i=0, len=imageAssets.length;i<len;i++){
            Engin.Loader.addImage(imageAssets[i].id, imagePath+ imageAssets[i].src);
        }
        const soundAssetData = assets.sound;
        const soundPath = soundAssetData.path;
        const soundAssets = soundAssetData.assets;
        for(let i=0, len=soundAssets.length;i<len;i++){
            Engin.Loader.addSound(soundAssets[i].id, soundPath + soundAssets[i].src);
        }
        this.loadAll()
                .then(this.setup.bind(this));

        this.resolution = window.devicePixelRatio || 1;
    }
    setup(){
        
        console.log('setup');

        

        const mainScene = new MainScene();
        this.currentScene = mainScene;

        const leftWall = new LinerWall(0, 0);
        const rightWall = new LinerWall(this.width, 0);
        const topWall = new LinerWall(0, 0);
        const bottomWall = new LinerWall(0, this.height);

        
        const clientWatcher = new ClientWatcher(this.canvas!, {width: this.width, height: this.height});
        
        const browserTopEdge = new BrowserEdge(clientWatcher, 'top');
        const browserBottomEdge = new BrowserEdge(clientWatcher, 'bottom');
        mainScene.add(browserTopEdge);
        mainScene.add(browserBottomEdge);

        const ball = new Ball();
        ball.browserTopEdge = browserTopEdge;
        ball.browserBottomEdge = browserBottomEdge;
        ball.walls = {rightWall: rightWall, leftWall: leftWall, topWall: topWall, bottomWall: bottomWall};
        this.baseContainer.add(ball);
        mainScene.add(ball);

        const text = new Engin.Text('あいうえおかきくけこ', {fontSize: 30, gameWidth: this.width, screen: this.screen});
        this.baseContainer.add(text);
        text.x = 0;
        text.y = 0;
        mainScene.add(text);
        text.act = () => {
            text.text = ((Math.random()*100)|0)/100 + '';
        }


        const topaza = new Engin.SpriteActor(Engin.Loader.get('aza'));
        this.baseContainer.add(topaza);
        mainScene.add(topaza);
        topaza.act = () => {
            topaza.y = browserTopEdge.y + browserTopEdge.vy*1.5;
        }

        const bottomaza = new Engin.SpriteActor(Engin.Loader.get('aza'));
        this.baseContainer.add(bottomaza);
        mainScene.add(bottomaza);
        bottomaza.act = () => {
            bottomaza.y = browserBottomEdge.y - bottomaza.height + browserBottomEdge.vy*1.5;
        }
        topaza.scale.set(0.5);
        bottomaza.scale.set(0.5);
        
        this.startLoop();
    }
}

