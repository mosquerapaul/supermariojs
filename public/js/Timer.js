export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;
    
    
        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            //SOLO PARA DEBUG, EVITA QUE EL TIEMPO DE INACTIVIDAD SE ACUMULE
            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            } //FIN DE DEBUG
    
            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
    
                accumulatedTime -= deltaTime;
            }
            this.enqueue();
    
            lastTime = time;
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start () {
        this.enqueue();
    }
}