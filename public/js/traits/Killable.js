import {Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    kill() {
        this.queue(() => this.dead = true);
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, deltaTime, level) {
        if(entity.pos.y > camera.pos.y + camera.size.y) {
            entity.killable.kill();
        }
        if(this.dead){
            this.deadTime += deltaTime;
            if(this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity);
                });
                
            }
        }
    }
}