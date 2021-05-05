import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Table.gltf';

let smallDisc;
class Table extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
        };

        // Load object
        const loader = new GLTFLoader();
        this.name = 'Table';
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            smallDisc = gltf.scene.getObjectByName('Part01_3');
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // Advance tween animations, if any exist
        TWEEN.update();
        if (smallDisc) {
            for (const disc of smallDisc.children) {
              disc.rotation.y = timeStamp / 1000;
            }
          }
    }
}

export default Table;
