import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Table.gltf';

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
  }

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
            console.log(dumpObject(gltf.scene).join('\n'));
            smallDisc = gltf.scene.getObjectByName('DJControl01_1_13');
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
