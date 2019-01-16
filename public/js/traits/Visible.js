import {Trait} from '../Entity.js';
import Camera from '../Camera.js';

export default class Visible extends Trait {
    constructor() {
        super('visible');
        this.onScreen = false;
    }


    visibleStart(entity){
        if(camera.pos.x > entity.pos.x + 300) {
            entity.killable.kill();
        }
        if(entity.visible.onScreen) {
            return;
        }
        if(entity.pos.x < camera.pos.x + 300){
            entity.visible.onScreen = true;
        }
        if(entity.visible.onScreen && entity.pendulumMove) {
            entity.pendulumMove.enabled = true;
        }
    }

    update(entity, deltaTime, level) {
        if(entity.pendulumMove) {
            this.visibleStart(entity);
        }
    }

}