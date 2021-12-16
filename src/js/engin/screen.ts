import RenderingContext from './rendering_context';

export default class Screen {
    canvas: HTMLCanvasElement | undefined = undefined;
    resolution: number = window.devicePixelRatio || 1;
    settingResolution: boolean = false;
    context: RenderingContext | undefined;
    getCanvasElement(el: HTMLCanvasElement){
        this.canvas = el!;
        window.removeEventListener('resize', this.setResolution);
        window.addEventListener('resize', this.setResolution);

        this.context = new RenderingContext(el);
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

                const canvas = this.canvas!;
                const width = canvas.width;
                const height = canvas.height;

                //canvas.width = width*this.resolution;
                //canvas.height = height*this.resolution;

                const cxt = canvas.getContext('2d')!;
                //cxt.scale(this.resolution, this.resolution);


                /*12/16 メモ
                    canvas.clientHeightとcanvas.heightとgame.heightを分けて考えなければならない。
                    描画時にgame.heightとcanvas.heightの比を考慮するとか

                    canvas.clientHeightは所与
                    devicePixelRatioを考慮してcanvas.heightを決定
                    game.heightは所与
                    「描画時に」座標、サイズをcanvas.heightとgame.heightから割り出す。
                    ここまでをrenderingContextの中で処理するべき。
                */

            });
            this.settingResolution = true;
        }
    }
}