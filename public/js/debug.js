import {createCollisionLayer} from './layers/collision.js'; //PARA DEBUG DE COLISIONES
import {createCameraLayer} from './layers/camera.js'; // PARA DEBUG CÁMARA


export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event =>{
            if(event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y);
            } else if (event.buttons === 2
                && lastEvent && lastEvent.buttons === 2
                && lastEvent.type === 'mousemove'){
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }
            lastEvent = event;
        });
    });
    canvas.addEventListener('contextmenu', event =>{
        event.preventDefault();
    });
}

export function enableDebug(level, collisionDebugState, cameraDebugState, keyboardDebugState) {
    if(collisionDebugState) {
        // DEBUGER PARA COLISIONES
        level.comp.layers.push(
            createCollisionLayer(level));
    }
    if(cameraDebugState) {
        // DEBUGUER PARA CÁMARA
        level.comp.layers.push(
            createCameraLayer(camera)); 
    }
    if(keyboardDebugState){
        // CONTROL DE RATÓN PARA DEBUG, MOVER MARIO CON BOTÓN IZQ Y CAMARA CON BOTÓN DER.  
        setupMouseControl(canvas, mario, camera);
    }
}