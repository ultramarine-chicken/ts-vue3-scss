import Container from './container';
import Rectangle from './rectangle';
import Scene from './scene';

export default class Actor extends Container{
    actions: Array<Function> = [];
    vx: number = 0;
    vy: number = 0;
    hitRect: {x: number, y: number, width: number, height: number} = {x: 0, y: 0, width: this.width, height: this.height};
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
    get virtualPosition(){
        return {x: this.x + this.vx, y: this.y + this.vy};
    }
    calcGlobalHitArea(position: {x: number, y: number}, hitRect: {x: number, y: number, width: number, height: number}){
        return new Rectangle(position.x + hitRect.x, position.y + hitRect.y, 
                            position.x + hitRect.x + hitRect.width, position.y + hitRect.y + hitRect.height);
    }
    calcNowHitArea(){
        return this.calcGlobalHitArea(this.position, this.hitRect);
    }
    calcVirtualHitArea(){
        return this.calcGlobalHitArea(this.virtualPosition, this.hitRect);
    }

    detectCollision(other: Actor){
        const thisHitArea = this.calcNowHitArea();
        const thisVirtualHitArea = this.calcVirtualHitArea();
        const otherHitArea = other.calcNowHitArea();
        const otherVirtualHitArea = other.calcVirtualHitArea();

        let verticalCollision;
        let horizontalCollision;
        //if()
        return thisVirtualHitArea.detectCollision(otherVirtualHitArea);
    }
}
