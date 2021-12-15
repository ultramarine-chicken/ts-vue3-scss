import Screen from './screen';
import Loader from './loader';
import Ticker from './ticker';
import Container from './container';
import Sprite from './actor';
import Scene from './scene';

export default class Application {
    screen: Screen = new Screen();
    loader: Loader = new Loader();
    loadThen: Function = ()=>{};
    ticker: Ticker = new Ticker(()=>{this.baseTickerFunction();});
    baseContainer: Container = new Container();
    width: number;
    height: number;
    scenes: Map<string, Scene> = new Map();
    currentScene: Scene | undefined = undefined;
    constructor(options: { el: HTMLCanvasElement | undefined, width: number, height: number } 
                = { el: undefined, width: 300, height: 400 }){
        if(options.el) this.screen.getCanvasElement(options.el);
        if(options.width && options.height) this.screen.setSize(options.width, options.height);
        this.width = options.width;
        this.height = options.height;
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

    baseTickerFunction(){
        /*
            １．currentSceneに属するActorのupdateを行う。
            ２．baseContainerに属するContainer(Actor)のrenderを行う。
        */
        if(this.currentScene) this.currentScene.update(this.ticker.delta);

        this.screen.clear();
        this.baseContainer.render(this.canvas!);
    }

    startLoop(){
        this.ticker.start();
    }

    createSpriteFromAsset(id: string){
        return new Sprite(Loader.get(id));
    }
    newSprite(image: any){
        return new Sprite(image);
    }
};