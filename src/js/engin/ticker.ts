export default class Ticker {
    tickers: Set<Function> = new Set();
    prevTimeStamp: number = 0;
    FPS: number = 60;
    maxFPS: number = 60;
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

        const accuracy = 0.9;
        if(elapsedTime < 1/this.maxFPS * accuracy){
            requestAnimationFrame(this.loop.bind(this));
        }


        this.delta = elapsedTime/(1000/this.FPS);
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