import * as PIXI from 'pixi.js';
import assetData from './assets.js';

export default class Game extends PIXI.Application{
    constructor(el: HTMLDivElement){
        super();
        

        el.appendChild(this.view);
        


        const path = assetData.path;
        const assets = assetData.assets;
        for(let i=0, len=assets.length;i<len;i++){
            //ルートからのパスをハードコードしないとエラーが出る　
            const src = require('/src/js/game/' + path + assets[i].src);
            const image = new Image();
            image.src = src;
        }


    }
    setup(loader: any, resources: any){
        
        const image = new PIXI.Sprite(resources['aza'].texture);
        this.stage.addChild(image);
        
    }
}