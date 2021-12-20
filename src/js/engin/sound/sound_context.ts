//WebAudioAPIのテスト
declare global {
    interface Window {
        webkitAudioContext: any
    }
}

export default class  SoundContext {
    cxt: AudioContext
    constructor(){
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.cxt = new AudioContext();

        document.addEventListener('click', this.initContext.bind(this), {once: true});
        document.addEventListener('scroll', this.initContext.bind(this), {once: true});
        /*
        const AudioContext = window.AudioContext || window.webkitAudioContext;
const ocxt = new AudioContext();
const url = require('./js/game/sounds/fish.wav');

document.addEventListener('click', ()=>{
    if(ocxt.state === 'suspended'){
        ocxt.resume();
    }

    const srcBuffer = ocxt.createBufferSource();
    fetch(url)
        .then((res)=>{return res.arrayBuffer();})
        .then((data)=>{return ocxt.decodeAudioData(data)})
        .then((buf)=>{ srcBuffer.buffer = buf;});
    
    srcBuffer.connect(ocxt.destination);
    srcBuffer.start(0);
});*/
    }
    initContext(){
        if(this.cxt.state === 'suspended'){
            this.cxt.resume();
        }
        document.removeEventListener('click', this.initContext.bind(this));
        document.removeEventListener('scroll', this.initContext.bind(this));
    }
}

