import { Group, Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import BLUE_MODEL from './BlueArrow.gltf';
import RED_MODEL from './RedArrow.gltf';
import GREEN_MODEL from './GreenArrow.gltf';

class Arrow extends Group {
    constructor(parent, bob, originalPosition, color) {
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

        if (color == 'blue') {
            loader.load(BLUE_MODEL, (gltf) => {
                this.add(gltf.scene);
            });
        }
        else if (color == 'green') {
            loader.load(GREEN_MODEL, (gltf) => {
                this.add(gltf.scene);
            });
        }
        else {
            loader.load(RED_MODEL, (gltf) => {
                this.add(gltf.scene);
            });
        }

        this.position.set(originalPosition.x, originalPosition.y, originalPosition.z);
        this.scale.set(4.0, 4.0, 4.0);
        this.rotation.z = -Math.PI / 2;

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
