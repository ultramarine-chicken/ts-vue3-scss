import Container from './container';
import Rectangle from './rectangle';
import Scene from './scene';

export default class Actor extends Container{
    actions: Array<Function> = [];
    constructor(scene: Scene | undefined = undefined){
        super();
        if(scene) scene.add(this);
    }
    update(delta: number = 1): void {
        this.act(delta);
    }
    act(delta: number){

    }
    beAddedToScene(scene: Scene){
        scene.add(this);
    }

}