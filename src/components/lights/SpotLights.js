import { Group, SpotLight, AmbientLight, HemisphereLight, Object3D } from 'three';

class SpotLights extends Group {
    constructor(parent, color, position, blinking) {
        // Invoke parent Group() constructor with our args
        super();

        this.state = {
            parent: parent,
            gui: parent.state.gui,
            blinking: true,
            ticker: 0,
            dir: new SpotLight(color, 5, 0.0, 0.5, 1, 1),
            color: color,
            prevColor: color,
            strobeSpeed: 10,
        }

        this.state.dir.position.set(position[0], position[1], position[2]);

        this.state.gui.add(this.state, 'blinking');
        this.state.gui.add(this.state, 'strobeSpeed');
        this.state.gui.addColor(this.state, 'color');
        this.add(this.state.dir);
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
    	this.state.ticker++;

        if (this.state.color != this.state.prevColor) {
            this.state.dir = null;
            this.state.dir = new SpotLight(this.state.color, 5, 0.0, 0.5, 1, 1);
            this.state.prevColor = this.state.color;
            this.state.parent.add(this.state.dir);
        }

    	if (this.state.blinking && this.state.ticker % this.state.strobeSpeed == 0) {

    		if (this.state.dir.power > 0)
    			this.state.dir.power = 0;
    		else
    			this.state.dir.power = 5 * Math.PI;

    	}
        else if (!this.state.blinking) {
            this.state.dir.power = 5 * Math.PI;
        }
    }
}

export default SpotLights;
