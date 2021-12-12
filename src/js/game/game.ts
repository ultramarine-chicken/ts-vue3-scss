import assetData from './assets.js';
import Engin from '../engin/engin';

export default class Game extends Engin{
    constructor(el: HTMLCanvasElement | any){
        super();
        
        this.getScreen(el);
        


        const path = assetData.path;
        const assets = assetData.assets;
        for(let i=0, len=assets.length;i<len;i++){
            //ルートからのパスをハードコードしないとエラーが出る　
            const src = require('/src/js/game/' + path + assets[i].src);
            const image = new Image();
            image.src = src;
        }

        this.screen!.width = 300;
        this.screen!.height = 300;

        const ctx = this.screen!.getContext('2d')!;
        ctx.fillRect(25, 25, 400, 400);

    }
    setup(){

        
        
    }
}