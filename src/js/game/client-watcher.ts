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
    constructor(canvas: HTMLCanvasElement, size: {width: number, height: number}){

        document.addEventListener('scroll', this.getScrollingInfo.bind(this), {passive: true});
        window.addEventListener('resize', this.getResizingInfo.bind(this), {passive: true});
        document.onwheel = this.getScrollingInfo.bind(this);
        
        this.canvas = canvas;
        this.gameHeight = size.height;
        this.gameWidth = size.width;
        this.getScrollingInfo();
        this.ticking = false;
        this.getResizingInfo();
        this.gameRatioToCanvasAboutSize = this.gameHeight/this.canvasHeight;
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
                this.canvasHeight = this.canvas.clientHeight;
                this.viewHeight = window.innerHeight;
                this.gameRatioToCanvasAboutSize = this.gameHeight/this.canvasHeight;
                this.ticking = false;
            });
            
        }

    }
}