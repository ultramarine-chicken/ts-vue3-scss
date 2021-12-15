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

        window.addEventListener('resize', this.screen.setResolution);
    }

    /*
        loadingmodeがstatic の場合
            srcはルートパスを与える。webpackによってバンドルはされない。
            デプロイするときは、静的ファイルをアップロードする必要がある。
        loadingmodeがdynamicの場合 
            srcは相対パスを与える。webpackによってバンドルされる。
            engin/loaderのrequire()の中身をイイカンジのルートパスにする必要がある。
    */
    addAsset(id: string, src: string){
        this.loadingFunctions[this.loadingMode](id, src);
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

        
        if(this.ticker.canRender()){
            return;
        }

        this.screen.clear();
        this.baseContainer.render(this.canvas!);

        const ctx = this.canvas!.getContext('2d')!;
        ctx.font = '20px sans-serif';
        ctx.fillText(""+Math.floor(this.ticker.delta*100)*0.01, 40, 40);
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