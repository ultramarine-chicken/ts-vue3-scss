import Screen from './screen';
import Loader from './loader';

export default class Application {
    screen: Screen = new Screen();
    loader: Loader = new Loader();
    loadThen: Function = ()=>{};
    constructor(options: {
        el: HTMLCanvasElement,
        width: number,
        height: number
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
    getContext(){
        return this.screen.canvas!.getContext('2d')!;
    }
    get canvas(){
        return this.screen.canvas;
    }
};