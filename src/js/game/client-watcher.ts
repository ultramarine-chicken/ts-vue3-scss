export default class ClientWatcher{
    canvas: HTMLCanvasElement;
    scrollY: number = 0;
    canvasTop: number = 0;
    canvasHeight: number = 0;
    viewHeight: number = 0;
    gameHeight: number = 0;
    gameWidth: number;
    gameRatioToCanvasAboutSize: number;
    ticking: boolean = false;
    preInnerWidth: number = 0;
    constructor(canvas: HTMLCanvasElement, size: {width: number, height: number}){

        document.addEventListener('scroll', this.getScrollingInfo.bind(this), {passive: true});
        window.addEventListener('resize', this.getResizingInfo.bind(this), {passive: true});
        document.onwheel = this.getScrollingInfo.bind(this);
        
        this.canvas = canvas;
        this.gameHeight = size.height;
        this.gameWidth = size.width;
        this.ticking = false;
        this.getInitialInfo();
        this.gameRatioToCanvasAboutSize = this.gameHeight/this.canvasHeight;
    }
    getInitialInfo(){
        if(!this.ticking){
            this.ticking = true;
            requestAnimationFrame(()=>{
                this.scrollY = window.scrollY;
                this.canvasTop = this.canvas.getBoundingClientRect().top;
                this.canvasHeight = this.canvas.clientHeight;
                this.viewHeight = window.innerHeight;
                this.gameRatioToCanvasAboutSize = this.gameHeight/this.canvasHeight;
                this.ticking = false;
            });
        }
    }
    getScrollingInfo(){
        if(!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(()=>{
                this.scrollY = window.scrollY;
                this.canvasTop = this.canvas.getBoundingClientRect().top;
                this.ticking = false;
            });
            
        }
    }
    getResizingInfo(){
        if(!this.ticking){
            this.ticking = true;
            requestAnimationFrame(()=>{
                const innerWidth = window.innerWidth;
                if(innerWidth != this.preInnerWidth){
                    this.gameRatioToCanvasAboutSize = this.gameHeight/this.canvas.clientHeight;
                    this.preInnerWidth = innerWidth;
                }
                this.canvasTop = this.canvas.getBoundingClientRect().top;
                this.viewHeight = window.innerHeight;
                this.ticking = false;

                
            });
            
        }

    }
}