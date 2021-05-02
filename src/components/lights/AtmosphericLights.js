import { Group, SpotLight, AmbientLight, HemisphereLight } from 'three';

class AtmosphericLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        const ambi = new AmbientLight(0x404040, 1.32);
        const hemi = new HemisphereLight(0xffffbb, 0x080820, 2.3);

        this.add(ambi, hemi);
    }
}

export default AtmosphericLights;
