import { Group, AnimationMixer, AnimationClip, NumberKeyframeTrack } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Man.gltf';

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

class Man extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            mixer: null,
            prevTimeStamp: null,
            speed: 1000,
            //initialUpdate: false,
        };

        // Load object
        const loader = new GLTFLoader();
        this.name = 'Man';
        loader.load(MODEL, (gltf) => {
            const model = gltf.scene.children[0];
            const mixer = new AnimationMixer(model);
            this.state.mixer = mixer;
            const action = mixer.clipAction(gltf.animations[17]);
            action.play();
            this.add(model);
        });

        this.deltasum = 0;

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // Advance tween animations, if any exist
        //TWEEN.update();

        if (this.state.mixer !== null) {

            if (this.state.prevTimeStamp === null) {
                this.state.prevTimeStamp = timeStamp;
                this.state.mixer.update(37.5);
            }
            /*if (!this.state.initialUpdate) {
                console.log("initial update");
                this.state.mixer.update(19000);
                this.state.initialUpdate = true;
            }*/

            const delta = (timeStamp - this.state.prevTimeStamp) / this.state.speed;
            this.state.prevTimeStamp = timeStamp;
            this.state.mixer.update(delta);

            this.deltasum += delta;
            if (this.deltasum > 10.25) {
                this.deltasum = 0;
                this.state.mixer.update(37.5);
            }


            console.log("here1");
        }
        else {
            console.log("here2");
        }

    }
}

export default Man;
