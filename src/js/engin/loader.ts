import SoundContext from './sound/sound_context';
import Sound from './sound/sound';

interface SoundOption {
    vol: number,
    loop: boolean
}

export default class Loader{
    static promises: Array<Promise<any>> = [];
    static assets: Map<string, any> = new Map();
    static preCanvas = document.createElement('canvas') as HTMLCanvasElement;
    static rectangles = {};
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
    static addSound(id: string, src: string, acxt: SoundContext, 
                    {vol = 1, loop = false} : Partial<SoundOption> = {}){
        const sound = new Sound(acxt);
        
        const url = require('~game/' + src);
        const promise = new Promise((resolve)=>{
            fetch(url).then((res)=>{
                return res.arrayBuffer();
            }).then((data)=>{
                return acxt.cxt.decodeAudioData(data);
            }).then((buf)=>{
                sound.buffer = buf;
                sound.volume = vol;
                sound.loop = loop;
            }).then(()=>{
                Loader.assets.set(id, sound);
                resolve(sound);
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