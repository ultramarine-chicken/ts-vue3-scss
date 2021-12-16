export default class Ticker {
    prevTimeStamp: number = 0;
    FPS: number = 60;
    readonly expectedElapsedTime = 1000/this.FPS;
    readonly permittedDelay = 2;
    delta: number = 1;
    looping: any = undefined;
    loopCount: number = 0;
    readonly renderingFrequency = 1;

    base: Function

    constructor(base: Function = function(){}){
        this.base = base;
    }
    start(){
        this.looping = requestAnimationFrame(this.loop.bind(this));
    }
    loop(timeStamp: number){
        this.loopCount = (this.loopCount + 1)%this.renderingFrequency;

        const elapsedTime = timeStamp - this.prevTimeStamp;
        this.delta = Math.min(elapsedTime/this.expectedElapsedTime, this.permittedDelay);
        this.prevTimeStamp = timeStamp;


        this.base();


        requestAnimationFrame(this.loop.bind(this));
    }
    stop(){
        cancelAnimationFrame(this.looping);
    }
}