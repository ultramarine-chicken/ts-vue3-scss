export default class Screen {
    canvas: HTMLCanvasElement | undefined = undefined;
    resolution: number = window.devicePixelRatio || 1;
    settingResolution: boolean = false;

    getCanvasElement(el: HTMLCanvasElement){
        this.canvas = el!;
        window.removeEventListener('resize', this.setResolution);
        window.addEventListener('resize', this.setResolution);
    }
    setSize(width: number, height: number){
        if(this.canvas){
            this.canvas.width = width;
            this.canvas.height = height;

            this.setResolution();
            
        } else {
            throw Error('The canvas has not been set.');
        }
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
            requestAnimationFrame(()=>{
                this.settingResolution = false;
                const width = this.canvas!.width;
                const height = this.canvas!.height;

                this.canvas!.width = width*this.resolution;
                this.canvas!.height = height*this.resolution;

                const cxt = this.canvas!.getContext('2d')!;
                cxt.scale(this.resolution, this.resolution);
            });
            this.settingResolution = true;
        }
    }
}