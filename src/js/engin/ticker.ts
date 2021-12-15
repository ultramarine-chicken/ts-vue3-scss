export default class Ticker {
    tickers: Set<Function> = new Set();
    prevTimeStamp: number = 0;
    FPS: number = 60;
    readonly expectedElapsedTime = 1000/this.FPS;
    readonly permittedDelay = 2;
    delta: number = 1;
    looping: any = undefined;

    base: Function
    constructor(base: Function = function(){}){
        this.base = base;
    }
    start(){
        this.looping = requestAnimationFrame(this.loop.bind(this));
    }
    add(func: Function){
        this.tickers.add(func);
    }
    loop(timeStamp: number){
        const elapsedTime = timeStamp - this.prevTimeStamp;
        this.delta = Math.min(elapsedTime/this.expectedElapsedTime, this.permittedDelay);
        this.prevTimeStamp = timeStamp;

        this.base(undefined, this.delta);

        for(let func of this.tickers) {
            func(this.delta);
        }


        requestAnimationFrame(this.loop.bind(this));
    }
    stop(){
        cancelAnimationFrame(this.looping);
    }
}