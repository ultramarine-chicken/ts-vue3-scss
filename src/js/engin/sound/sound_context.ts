//WebAudioAPIのテスト
declare global {
    interface Window {
        webkitAudioContext: any
    }
}

export default class  SoundMaster {
    cxt: AudioContext
    unlockEvents: string[] = ['click', 'scroll', 'touchstart'];
    masterGain: GainNode
    constructor(){
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.cxt = new AudioContext();

        this.masterGain = this.cxt.createGain();
        this.masterGain.connect(this.cxt.destination);

        for(let e of this.unlockEvents){
            document.addEventListener(e, this.initContext.bind(this), {once: true});
        }
    }
    initContext(){
        if(this.cxt.state === 'suspended'){
            this.cxt.resume();
        }
        for(let e of this.unlockEvents){
            document.removeEventListener(e, this.initContext.bind(this));
        }
    }
}

