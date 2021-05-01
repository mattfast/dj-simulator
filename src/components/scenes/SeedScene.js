import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
import { Flower, Land, Spotlight } from 'objects';
import { BasicLights } from 'lights';
import { Speaker, Table, Truss } from '../objects';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        const land = new Land();
        const flower = new Flower(this);
        const lights = new BasicLights();
        const spotlight = new Spotlight(this);
        const table = new Table(this);
        const truss = new Truss(this);
        const speaker = new Speaker(this);
        speaker.position.set(4,4,4);
        this.add(spotlight, table, lights, truss, speaker);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
