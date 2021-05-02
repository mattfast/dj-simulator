import { Group, SpotLight, AmbientLight, HemisphereLight, Object3D } from 'three';

class SpotLights extends Group {
    constructor(parent, color, position, blinking) {
        // Invoke parent Group() constructor with our args
        super();

        const dir = new SpotLight(color, 5, 0.0, 0.5, 1, 1);

        dir.position.set(position[0], position[1], position[2]);

        this.blinking = blinking;
        this.on = true;
        this.ticker = 0;

        this.dir = dir;
        this.add(dir);
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
    	this.ticker++;

    	if (this.blinking && this.ticker % 2 == 0) {

    		if (this.on)
    			this.dir.power = 0;
    		else
    			this.dir.power = 5 * Math.PI;

    		this.on = !this.on;
    	}
    }
}

export default SpotLights;
