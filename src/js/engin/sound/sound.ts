import SoundContext from './sound_context';

export default class Sound {
    buf: any;
    _gainNode: GainNode | undefined;
    acxt?: SoundContext;
    constructor(){

    }
    play(){
        const cxt = this.acxt!.cxt;
        const sourceBuffer = cxt.createBufferSource();
        sourceBuffer.buffer = this.buf;
        sourceBuffer.connect(cxt.destination);
        sourceBuffer.start(0);
    }
    stop(){

    }
    set volume(vol: number){

    }
}