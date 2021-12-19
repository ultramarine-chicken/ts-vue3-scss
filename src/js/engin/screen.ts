import RenderingContext from './rendering_context';

export default class Screen {
    canvas: HTMLCanvasElement | undefined = undefined;
    resolution: number = window.devicePixelRatio || 1;
    settingResolution: boolean = false;
    context: RenderingContext | undefined;
    gameSize: {width: number, height: number} = {width: 200, height: 1000};
    sizeRatio: number = this.gameSize.height/this.gameSize.width;
    prevInnerWidth: number = 0;
    offscreenCanvases: Set<any> = new Set();

    getCanvasElement(el: HTMLCanvasElement){
        this.canvas = el;
        window.removeEventListener('resize', this.setResolution.bind(this));
        window.addEventListener('resize', this.setResolution.bind(this), {passive: true});


        this.context = new RenderingContext(el);
    }
    setSize(width: number, height: number){
        this.gameSize.width = width;
        this.gameSize.height = height;
        this.sizeRatio = height/width;
        
        this.setResolution();
    }
    getContext(opt: string){
        if(this.canvas){
            return this.canvas.getContext(opt)! as CanvasRenderingContext2D;
        } else {
            throw Error('The canvas has not been set.');
        }
    }
    clear(){
        const cxt = this.getContext('2d');
        cxt.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    }

    setResolution(){
        if(!this.settingResolution){
            this.settingResolution = true;
            requestAnimationFrame(()=>{
                const innerWidth = window.innerWidth;
                if(this.prevInnerWidth != innerWidth){
                    const canvas = this.canvas!;
                    const styleWidth = canvas.clientWidth;
                    const styleHeight = styleWidth*this.sizeRatio;
                    const pixelDepth = this.resolution;
    
                    canvas.width = styleWidth*pixelDepth;
                    canvas.height = styleHeight*pixelDepth;

                    const drawingRatio = canvas.width/this.gameSize.width;
    
                    const cxt = canvas.getContext('2d')!;
                    cxt.scale(drawingRatio, drawingRatio);

                    
                    for(let offscreen of this.offscreenCanvases){
                        offscreen.drawingRatio = styleWidth*pixelDepth/this.gameSize.width;
                        offscreen.drawingRatioInverse = 1/offscreen.drawingRatio;
                    }

                    this.prevInnerWidth = innerWidth;
                }


                this.settingResolution = false;
            });
        }
    }

    addOffscreen(offscreen: any){
        this.offscreenCanvases.add(offscreen);
    }
}