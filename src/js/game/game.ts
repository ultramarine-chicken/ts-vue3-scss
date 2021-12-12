import assetData from './assets.js';
import Engin from '../engin/engin';

export default class Game extends Engin{
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

        
        const aza = this.newSprite(this.getAsset('aza'));
        aza.x = 50;
        this.baseContainer.add(aza);


        this.ticker.add(this.function.bind(this));
        this.startLoop();
        
    }
    function(delta: number){
    }
}