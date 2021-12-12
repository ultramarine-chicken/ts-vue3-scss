export default class {
    screen: HTMLCanvasElement | undefined = undefined
    constructor(){

    }
    getScreen(el: HTMLCanvasElement){
        this.screen = el!;
    }
};