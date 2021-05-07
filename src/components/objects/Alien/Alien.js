import { Group, AnimationMixer, AnimationClip, NumberKeyframeTrack } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Alien.gltf';

class Alien extends Group {
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
        this.name = 'Alien';
        loader.load(MODEL, (gltf) => {
            const model = gltf.scene.children[0];
            const mixer = new AnimationMixer(model);
            this.state.mixer = mixer;
            const action = mixer.clipAction(gltf.animations[0]);
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
            }

            const delta = (timeStamp - this.state.prevTimeStamp) / this.state.speed;
            this.state.mixer.update(delta);
        }

        this.state.prevTimeStamp = timeStamp;
    }
}

export default Alien;
