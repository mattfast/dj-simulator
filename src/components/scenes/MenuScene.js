import { Vector3 } from 'three';
import { NightclubScene } from './NightclubScene.js';
import { Text } from 'objects';

class MenuScene extends NightclubScene {
    constructor() {
        // Call parent Scene() constructor
        super();
        this.state.type = 'menu';

        // Load in menu text
        const title = new Text(this, "DJ SIMULATOR", new Vector3(-0.12,0.03,-0.08), 0.0001);
        const spaceToPlay = new Text(this, "Press SPACE to Play", new Vector3(-0.11,-0.02,-0.08), 0.00007);
        this.add(title, spaceToPlay);

        // // Populate GUI

        this.state.gui.hide();
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { clickedPlay, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default MenuScene;
