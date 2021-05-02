import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Alphabet.gltf';

/*function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
}*/

//let letterD;
class Alphabet extends Group {
    constructor(parent, letter) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
        };

        // Load object
        const loader = new GLTFLoader();

        this.name = 'Alphabet';
        loader.load(MODEL, (gltf) => {
            //let letterD = gltf.scene.getObjectByName('D');
            this.add(gltf.scene.getObjectByName(letter));
            //console.log(dumpObject(gltf.scene).join('\n'));
        });

        // Add self to parent's update list
        //parent.addToUpdateList(this);
    }
}

export default Alphabet;
