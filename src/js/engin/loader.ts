export default class Loader{
    static promises: Array<Promise<any>> = [];
    static assets: Map<string, any> = new Map();
    constructor(){

    }
    static add(id: string, src: string){
        const image = new Image();
        image.src = require('/src/js/game/' + src);
        const promise = new Promise((resolve)=>{
            image.addEventListener('load', ()=>{
                Loader.assets.set(id, image);
                resolve(image);
            });
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