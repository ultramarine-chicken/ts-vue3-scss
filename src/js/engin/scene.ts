import Actor from './actor';

export default class Scene {
    actors: Set<Actor> = new Set();
    update(delta: number){
        this.act(delta);

        for(let actor of this.actors){
            actor.update(delta);
        }
    }
    add(actor: Actor){
        this.actors.add(actor);
    }
    act(delta: number){

    }
}