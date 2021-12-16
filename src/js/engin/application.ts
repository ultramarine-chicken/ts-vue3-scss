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

    loadingMode: string = 'dynamic';
    loadingFunctions: {} = {dynamic: Loader.addDynamically, static: Loader.addStatically}
    
    constructor(options: { el: HTMLCanvasElement | undefined, width: number, height: number } 
                = { el: undefined, width: 300, height: 400 }){
        if(options.el) this.screen.getCanvasElement(options.el);
        if(options.width && options.height) this.screen.setSize(options.width, options.height);
        this.width = options.width;
        this.height = options.height;
    }


    /*
        loadingmodeがstatic の場合
            srcはルートパスを与える。webpackによってバンドルはされない。
            デプロイするときは、静的ファイルもイイカンジにアップロードする必要がある。
            現状、うまくいかない。
        loadingmodeがdynamicの場合 
            srcは相対パスを与える。webpackによってバンドルされる。
            engin/loaderのrequire()の中身をイイカンジのルートパスにする必要がある。
    */
    addAsset(id: string, src: string){
        this.loadingFunctions[this.loadingMode](id, src);
    }
    loadAll(){
        return Loader.loadAll();
    }

    setCanvas(el: HTMLCanvasElement){
        this.screen.getCanvasElement(el);
        this.screen.setResolution();

        const cxt = el.getContext('2d')!;
        cxt.imageSmoothingEnabled = true;
    }
    getContext(){
        return this.screen.canvas!.getContext('2d')!;
    }
    get canvas(){
        return this.screen.canvas;
    }
    set resolution(resolution: number){
        this.screen.resolution = resolution;
        this.screen.setResolution();
    }

    baseTickerFunction(){
        /*
            １．currentSceneに属するActorのupdateを行う。
            ２．baseContainerに属するContainer(Actor)のrenderを行う。
        */
        if(this.currentScene) this.currentScene.update(this.ticker.delta);

        

        this.screen.clear();
        this.baseContainer.render(this.screen.context);
    }

    startLoop(){
        this.ticker.start();
    }


};