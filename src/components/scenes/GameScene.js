import * as Dat from 'dat.gui';

import { NightclubScene } from './NightclubScene.js';
import { Scene, Color, Object3D, Vector3 } from 'three';
import { Man, Arrow } from 'objects';
import { BasicLights, SpotLights, LightTarget } from 'lights';


const tablePositions = [
    new Vector3(-2, -0.1, -2),
    new Vector3(-1, -0.1, -3),
    new Vector3(0.1, -0.1, -4),
    new Vector3(2, -0.1, -2.5),
    new Vector3(3, -0.1, -2)
]

const tableNames = {
    'mesh_7': 0,
    'mesh_9': 0,
    'mesh_0': 1,
    'mesh_1': 1,
    'mesh_11': 2,
    'mesh_10': 2,
    'mesh_13': 2,
    'mesh_5': 3,
    'mesh_6': 4
}

class GameScene extends NightclubScene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Add man
        const wayne = new Man(this);
        const alfred = new Man(this);
        const steve = new Man(this);
        wayne.scale.set(0.05, 0.05, 0.05);
        alfred.scale.set(0.01, 0.01, 0.01);
        steve.scale.set(0.1, 0.1, 0.1);

        wayne.position.set(10, -6, -20);
        alfred.position.set(-10, -6, -17);
        steve.position.set(0, -6, -17);
        //this.add(wayne, alfred, steve);

        // Add arrow
        this.blueArrows = []
        this.greenArrows = []
        this.redArrows = []
        for (let i = 0; i < tablePositions.length; i++) {
            this.blueArrows[i] = new Arrow(this, true, tablePositions[i], 'blue');
            this.greenArrows[i] = new Arrow(this, true, tablePositions[i], 'green');
            this.redArrows[i] = new Arrow(this, true, tablePositions[i], 'red');
            
            this.blueArrows[i].visible = false;
            this.greenArrows[i].visible = false;
            this.redArrows[i].visible = false;
            this.add(this.blueArrows[i], this.greenArrows[i], this.redArrows[i]);
        }

        // Add first arrow to sequence
        this.state.sequence[0] = Math.floor(Math.random() * this.blueArrows.length);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    fade(object, beginTimestamp, out) {
        if (object.material !== null) {
            if (out) {
                if (material.opacity > 0) {
                    material.opacity -= 0.001 * (timeStamp - beginTimeStamp);
                }   
            }
            else {
                if (material.opacity < 1) {
                    material.opacity += 0.001 * (timeStamp - beginTimeStamp);
                }
            }

        }

        for (let i = 0; i < object.children.length; i++) {
            fade(object.children[i], beginTimestamp, out);
        }
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }

        // handle demonstration of sequence
        if (this.state.demonstration) {

            // demonstrate next arrow in sequence
            if (timeStamp - this.state.prevTime > 2000) {

                if (this.state.demonstrationIndex >= 0){
                    this.blueArrows[this.state.sequence[this.state.demonstrationIndex]].visible = false;
                }
                this.state.demonstrationIndex += 1;

                if (this.state.demonstrationIndex == this.state.sequence.length) {
                    this.state.demonstrationIndex = -1;
                    this.state.selected = null;
                    this.state.demonstration = false;
                }
                else {
                    this.state.prevTime = timeStamp; 
                }
            }
            if (timeStamp - this.state.prevTime > 500) {
                if (this.state.demonstrationIndex >= 0){
                    this.blueArrows[this.state.sequence[this.state.demonstrationIndex]].visible = true;
                }
            }
        }

        // handle attempt at sequence
        else {
            if (this.state.selected !== null) {
                if (this.state.selected.name in tableNames) {
                    console.log(tableNames[this.state.selected.name]);
                    console.log(this.state.sequence[this.state.challengeIndex]);
                    console.log(this.state.challengeIndex);
                    if (tableNames[this.state.selected.name] == this.state.sequence[this.state.challengeIndex]) {
                        this.state.challengeIndex += 1;
                        this.greenArrows[tableNames[this.state.selected.name]].visible = true;

                        if (this.state.challengeIndex == this.state.sequence.length) {
                            const rand = Math.floor(Math.random() * this.blueArrows.length);
                            this.state.sequence[this.state.sequence.length] = rand;

                            this.state.score += (10 * (this.state.sequence.length - 1));
                            this.state.challengeIndex = 0;
                            this.state.prevTime = timeStamp;
                            this.state.demonstration = true;
                        }
                    }
                    else {
                        this.redArrows[tableNames[this.state.selected.name]].visible = true;

                        this.state.challengeIndex = 0;
                        this.state.prevTime = timeStamp;
                        this.state.demonstration = true;
                    }
                }
                this.state.lastSelected = this.state.selected;
                this.state.selected = null;
            }
        }

        if (this.state.mouseUp && this.state.lastSelected !== null) {
            if (this.state.lastSelected.name in tableNames) {
                this.greenArrows[tableNames[this.state.lastSelected.name]].visible = false;
                this.redArrows[tableNames[this.state.lastSelected.name]].visible = false;
            }
            this.state.mouseUp = false;
        }

        /*if (this.state.selected !== null) {
            if (this.state.selected.name in tableNames) {
                if (this.arrows[tableNames[this.state.selected.name]].visible) {
                    this.arrows[tableNames[this.state.selected.name]].visible = false;
                    this.state.arrowTimes[tableNames[this.state.selected.name]] = 0;
                    this.state.score += 100;
                    console.log(this.state.score);
                }
            }
            this.state.selected = null;
        }

        // if it's been a while since the last arrow, randomly add one
        if (this.state.timeSinceLastArrow > this.state.difficulty) {
            const randArrow = Math.floor(Math.random() * this.arrows.length);
            this.arrows[randArrow].visible = true;
            this.state.timeSinceLastArrow = 0;
        }
        else {
            this.state.timeSinceLastArrow += timeStamp - this.state.prevTimeStamp;
        }

        for (let i = 0; i < this.arrows.length; i++) {
            if (this.arrows[i].visible) {
                this.state.arrowTimes[i] += timeStamp - this.state.prevTimeStamp;

                if (this.state.arrowTimes[i] > 1000) {
                    this.state.score -= 200;
                    this.arrows[i].visible = false;
                    this.state.arrowTimes[i] = 0;
                    console.log(this.state.score);
                }
            }
        }*/

        this.state.prevTimeStamp = timeStamp;
    }
}

export default GameScene;
