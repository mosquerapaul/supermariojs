import {loadLougie} from './entities/Lougie.js';
import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name){
        return factory => entityFactories[name] = factory;
    }

    return Promise.all ([
        loadLougie().then(addAs('lougie')),
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
    ])
    .then(() => entityFactories);
}