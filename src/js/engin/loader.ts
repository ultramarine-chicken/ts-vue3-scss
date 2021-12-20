export default class Loader{
    static promises: Array<Promise<any>> = [];
    static assets: Map<string, any> = new Map();
    static preCanvas = document.createElement('canvas') as HTMLCanvasElement;
    static rectangles = {};
    constructor(){

    }
    static addImage(id: string, src: string){
        const image = new Image();
        image.src = require('~game/' + src);

        const promise = new Promise((resolve)=>{ 
            image.addEventListener('load', ()=>{
                Loader.assets.set(id, image);
                resolve(image);
            });
        });
        Loader.promises.push(promise);
    }
    static addSound(id: string, src: string){
        const sound = new Audio();
        sound.src = require('~game/' + src);

        const promise = new Promise((resolve)=>{
            sound.addEventListener('loadstart', ()=>{
                Loader.assets.set(id, sound);
                resolve(sound);
            })
        });
        Loader.promises.push(promise);
    }
    static loadAll(){
        return Promise.all(Loader.promises).then((p) => Loader.assets);
    }
    static get(id){
        return Loader.assets.get(id);
    }
}