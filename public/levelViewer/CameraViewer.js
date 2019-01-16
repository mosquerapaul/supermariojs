import {Vec2} from '../js/math.js';


export default class CameraViewer {
    constructor(sizeX) {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(sizeX * 30, 240);
    }
}