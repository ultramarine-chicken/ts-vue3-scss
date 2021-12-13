import Actor from './actor';

export default class Scene {
    actors: Set<Actor> = new Set();
    update(delta: number){
        for(let actor of this.actors){
            actor.update(delta);
        }
    }
    add(actor: Actor){
        this.actors.add(actor);
    }
}