import RenderingContext from './rendering_context';

export default class Screen {
    canvas: HTMLCanvasElement | undefined = undefined;
    resolution: number = window.devicePixelRatio || 1;
    settingResolution: boolean = false;
    context: RenderingContext | undefined;
    gameSize: {width: number, height: number} = {width: 500, height: 2500};
    prevInnerWidth: number = 0;
    getCanvasElement(el: HTMLCanvasElement){
        this.canvas = el;
        window.removeEventListener('resize', this.setResolution.bind(this));
        window.addEventListener('resize', this.setResolution.bind(this), {passive: true});

        this.context = new RenderingContext(el);
    }
    setSize(width: number, height: number){
        this.gameSize.width = width;
        this.gameSize.height = height;

        
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
                    const width = canvas.clientWidth;
                    const height = canvas.clientHeight;
    
                    canvas.width = width*this.resolution;
                    canvas.height = height*this.resolution;
    
                    const cxt = canvas.getContext('2d')!;
                    cxt.scale(canvas.width/this.gameSize.width, canvas.height/this.gameSize.height);

                    this.prevInnerWidth = innerWidth;
                }


                this.settingResolution = false;
            });
        }
    }
}