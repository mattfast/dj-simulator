import { Group, Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Arrow.gltf';

class Arrow extends Group {
    constructor(parent, bob, originalPosition) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            bob: bob,
            originalPosition: originalPosition,
        };

        // Load object
        const loader = new GLTFLoader();
        this.name = 'Arrow';
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // Advance tween animations, if any exist
        TWEEN.update();
        if (this.state.bob) {
            this.position.y = this.state.originalPosition.y + 0.2 * Math.sin(timeStamp / 300);
        }
    }
}

export default Arrow;
