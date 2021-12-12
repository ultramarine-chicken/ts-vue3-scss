export default class Ticker {
    tickers: Set<Function> = new Set();
    prevTimeStamp: number = 0;
    FPS: number = 60;
    delta: number = 1;
    looping: boolean = false;

    base: Function
    constructor(base: Function = function(){}){
        this.base = base;
    }
    start(){
        this.looping = true;
        requestAnimationFrame(this.loop.bind(this));
    }
    add(func: Function){
        this.tickers.add(func);
    }
    loop(timeStamp: number){
        const elapsedTime = timeStamp - this.prevTimeStamp;
        this.delta = elapsedTime/(1000/this.FPS);
        this.prevTimeStamp = timeStamp;

        this.base();

        for(let func of this.tickers) {
            func(this.delta);
        }



        

        if(this.looping) requestAnimationFrame(this.loop.bind(this));
    }
    stop(){
        this.looping = false;
    }
}