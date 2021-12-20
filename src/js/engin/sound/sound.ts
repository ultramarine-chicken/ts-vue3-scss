import SoundContext from './sound_context';

export default class Sound {
    _buffer: any;
    _gainNode: GainNode | undefined;
    acxt?: SoundContext;
    _duration: number = 0;
    playing: boolean = false;
    constructor(){

    }
    play(){
        const cxt = this.acxt!.cxt;
        const sourceBuffer = cxt.createBufferSource();
        sourceBuffer.buffer = this._buffer;
        sourceBuffer.connect(cxt.destination);
        sourceBuffer.start(0);

        this.playing = true;
        setTimeout(this.endThen.bind(this), this._duration*1000);
    }
    stop(){

    }
    endThen(){
        this.playing = false;
    }
    set buffer(buf){
        this._buffer = buf;
        this._duration = buf.duration;
    }
    set volume(vol: number){

    }

}