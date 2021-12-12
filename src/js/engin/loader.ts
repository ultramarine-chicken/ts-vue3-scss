export default class Loader{
    promises: Array<Promise<any>> = [];
    assets: Map<string, any> = new Map();
    constructor(){

    }
    add(id: string, src: string){
        const image = new Image();
        image.src = require('/src/js/game/' + src);
        const promise = new Promise((resolve)=>{
            image.addEventListener('load', ()=>{
                this.assets.set(id, image);
                resolve(image);
            });
        });
        this.promises.push(promise);
    }
    loadAll(){
        return Promise.all(this.promises).then((p) => this.assets);
    }
    get(id){
        return this.assets.get(id);
    }
}