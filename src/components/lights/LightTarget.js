import { Group, SpotLight, AmbientLight, HemisphereLight, Object3D } from 'three';

class LightTarget extends Group {
    constructor(parent, center, range, backward) {
        // Invoke parent Group() constructor with our args
        super();

        const target = new Object3D();
        target.position.set(center[0], center[1], center[2]);

        this.target = target;
        this.center = center;
        this.range = range;
        this.backward = backward;

        this.add(target);
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if (this.backward) {
            this.target.position.set(this.center[0] + this.range * Math.cos(timeStamp / 500), 
                         this.center[1] + this.range * Math.sin(timeStamp / 500), 
                         this.center[2]);
        } else {
            this.target.position.set(this.center[0] + this.range * Math.cos(-timeStamp / 500), 
                         this.center[1] + this.range * Math.sin(-timeStamp / 500), 
                         this.center[2]);
        }
    }
}

export default LightTarget;
