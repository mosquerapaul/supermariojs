import {Trait} from '../Entity.js';
import { Vec2 } from '../math.js';


function setupDashboard(levelSpec){
    
    const limitTime = levelSpec.limitTime;
    const worldLevel = levelSpec.world;
    const checkpoints = levelSpec.checkpoints;

}



export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.time = 300;
    }

    setPlayer(entity){
        this.player = entity;
    }

    update(entity, deltaTime, level) {
        if(!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
        } else if(this.time > 0){
            this.time -= deltaTime * 1.5;
        } else {
            this.time = 0;
        }
    }
}