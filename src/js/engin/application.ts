import Screen from './screen';
import Loader from './loader';
import Ticker from './ticker';
import Container from './container';
import Sprite from './sprite';

export default class Application {
    screen: Screen = new Screen();
    loader: Loader = new Loader();
    loadThen: Function = ()=>{};
    ticker: Ticker = new Ticker(this.baseTickerFunction.bind(this));
    baseContainer: Container = new Container();
    constructor(options: {
        el: HTMLCanvasElement | undefined,
        width: number,
        height: number
    } = {
        el: undefined,
        width: 300,
        height: 400
    }){
        if(options.el) this.screen.getCanvasElement(options.el);
        if(options.width && options.height) this.screen.setSize(options.width, options.height);
    }

    startLoading(){
        this.loader.loadAll()
                    .then(this._loadThen.bind(this));
    }
    _loadThen(){
        this.loadThen();
    }
    addImage(id: string, src: string){
        this.loader.add(id, src);
    }
    getAsset(id: string){
        return this.loader.get(id);
    }

    setCanvas(el){
        this.screen.getCanvasElement(el)
    }
    getContext(){
        return this.screen.canvas!.getContext('2d')!;
    }
    get canvas(){
        return this.screen.canvas;
    }

    baseTickerFunction(delta: number){
        this.screen.clear();
        this.baseContainer.update(this.screen.canvas!, delta);
    }

    startLoop(){
        this.ticker.start();
    }

    createSpriteFromAsset(id: string){
        return new Sprite(this.getAsset(id));
    }
    newSprite(image: any){
        return new Sprite(image);
    }
};