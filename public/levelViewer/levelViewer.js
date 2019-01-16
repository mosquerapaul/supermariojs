import Camera from '../js/Camera.js';
import Entity from '../js/Entity.js';
import PlayerController from '../js/traits/PlayerController.js'
import Timer from '../js/Timer.js';
import {createLevelLoader} from './levelLoaderViewer.js';
import {loadFont} from '../js/loaders/font.js';
import {loadEntities} from '../js/entities.js';
import {createDashboardLayer} from '../js/layers/dashboard.js';

import {setupKeyboard} from '../js/input.js';
import {setupMouseControl, enableDebug} from '../js/debug.js'; // DEBUG CONTROL DE RATÓN PARA MARIO Y PANTALLA

import {loadProfile} from '../js/tempFunction.js';
import CameraViewer from './CameraViewer.js';


async function viewer(canvas) {
    const context = canvas.getContext('2d');
    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel("1-1");



    const camera = new CameraViewer(level.tileCollider.tiles.matrix.grid.length);
    window.camera = camera;
    
    const mario = entityFactory.mario();

    enableDebug(level, false, false, false);

    
    level.comp.draw(context, camera);
      
}

const canvas = document.getElementById('level');
viewer(canvas);