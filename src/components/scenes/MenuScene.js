import { Scene, Color, Object3D, Vector3 } from 'three';
import { NightclubScene } from './NightclubScene.js';
import { Ceiling, Floor, BackWall, FrontWall, RightWall, LeftWall, Speaker, Table, Truss, Alphabet, Man, Text } from 'objects';
import { BasicLights, SpotLights, LightTarget } from 'lights';

class MenuScene extends NightclubScene {
    constructor() {
        // Call parent Scene() constructor
        super();
        
        // Load in menu text
        const title = new Text(this, "DJ SIMULATOR", new Vector3(-0.12,0.03,-0.08), 0.0001);
        const spaceToPlay = new Text(this, "Press SPACE to Play", new Vector3(-0.11,-0.02,-0.08), 0.00007);
        this.add(title, spaceToPlay);

        // // Populate GUI
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
