import { Vector3 } from 'three';
import { NightclubScene } from './NightclubScene.js';
import { Text } from 'objects';

class InstructionScene extends NightclubScene {
    constructor() {
        // Call parent Scene() constructor
        super();
        this.state.type = 'instruction';

        // Load instruction text
        const instr0 = new Text(this, "HOW TO PLAY", new Vector3(-0.08,0.06,-0.08), 0.00007);
        const instr1 = new Text(this, "When you see an arrow, click on the device it's pointing to.", new Vector3(-0.18,0.03,-0.08), 0.00004);
        const instr2 = new Text(this, "The crowd will react to how well you do!", new Vector3(-0.135,0,-0.08), 0.00004);
        const instr3 = new Text(this, "Press SPACE to Begin", new Vector3(-0.12,-0.04,-0.08), 0.00007);

        this.add(instr0, instr1, instr2, instr3);

        this.state.gui.hide();
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

export default InstructionScene;
