import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Stomper from '../traits/Stomper.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';
import {loadSpriteSheet} from '../loaders.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadLougie() {
    return loadSpriteSheet('lougie')
    .then(createLougieFactory);
}

function createLougieFactory(sprite) {
    const runAnim = sprite.animations.get('run');

    function routeFrame(lougie) {
        if (lougie.jump.falling){
            return 'jump';
        }
        if(lougie.go.distance > 0){
            if(lougie.vel.x < 0 && lougie.go.dir > 0 || lougie.vel.x > 0 && lougie.go.dir < 0){
                return 'break';
            }
            return runAnim(lougie.go.distance);
        }
        return 'idle';
    }

    function setTurboState(turboOn){
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }        

    function drawLougie(context) { 
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createLougie() {
        const lougie = new Entity();
        lougie.size.set(14, 16);

        lougie.addTrait(new Physics);
        lougie.addTrait(new Solid());
        lougie.addTrait(new Go());
        lougie.addTrait(new Jump());
        lougie.addTrait(new Stomper());
        lougie.addTrait(new Killable());

        lougie.killable.removeAfter = 0;

        lougie.turbo = setTurboState;
        lougie.draw = drawLougie;

        lougie.turbo(false);
        
        return lougie;
    }
}