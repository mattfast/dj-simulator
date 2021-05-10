import { Vector3 } from 'three';
import { NightclubScene } from './NightclubScene.js';
import { Text } from 'objects';

class GameOverScene extends NightclubScene {
    constructor(finalScore) {
        // Call parent Scene() constructor
        super();
        this.state.type = 'gameOver';

        // Load instruction text
        const instr0 = new Text(this, "GAME OVER", new Vector3(-0.08,0.06,-0.08), 0.00007);
        const instr1 = new Text(this, "Final Score:", new Vector3(-0.05,0.03,-0.08), 0.00004);
        const instr2 = new Text(this, finalScore.toString(), new Vector3(-0.02,0,-0.08), 0.00004);
        const instr3 = new Text(this, "Press SPACE to Play Again!", new Vector3(-0.16,-0.04,-0.08), 0.00007);

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

export default GameOverScene;
