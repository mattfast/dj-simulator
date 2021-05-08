import { NightclubScene } from './NightclubScene.js';
import { Vector3, Audio, AudioLoader, AudioListener } from 'three';
import { Man, Alien, DancingMan, Stormtrooper, Shrek, Arrow, Text } from 'objects';

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

const positiveFeedback = [
    "Nice Job!",
    "Sweet!",
    "Amazing!",
    "Exceptional!",
    "Wow!!",
    "Felix is Amazing!!",
    "Perfect!"
]

const negativeFeedback = [
    "Yikes",
    "Bad Job",
    "Not Great",
    "Try Again",
    "Oof"
]


class GameScene extends NightclubScene {
    constructor(audio) {
        // Call parent Scene() constructor
        super();
        this.state.type = 'game';
        this.state.audio = audio;

        // Add dancers
        const alien = new Alien(this);
        const stormtrooper = new Stormtrooper(this);
        const man = new DancingMan(this);
        const shrek = new Shrek(this);

        man.scale.set(0.015, 0.015, 0.015);
        stormtrooper.scale.set(3, 3, 3);
        alien.scale.set(3, 3, 3);
        shrek.scale.set(0.01, 0.01, 0.01);

        alien.position.set(10, -6, -20);
        stormtrooper.position.set(-10, -6, -17);
        man.position.set(0, -6, -17);
        shrek.position.set(-5, -6, -40)
        this.add(alien, stormtrooper, man, shrek);

        // Add arrows
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

        // Add score counter
        this.state.scorePosition = new Vector3(0.005,0.085,-0.08);
        const score = new Text(this, "Score:", new Vector3(-0.01,0.1,-0.08), 0.00004);
        const scoreNumber = new Text(this, this.state.score.toString(), this.state.scorePosition, 0.00004);
        this.state.scoreNumber = scoreNumber;
        this.add(score, scoreNumber);

        // Add first arrow to sequence
        this.state.sequence[0] = Math.floor(Math.random() * this.blueArrows.length);

        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
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

    removeFromScene(object) {
        console.log("here1");
        console.log(object);

        while (object.children.length) {
            console.log("here");
            this.removeFromScene(object.children[0]);
        }

        if (object.material) {
            object.material.dispose();
        }
        if (object.geometry) {
            object.geometry.dispose();
        }
        this.remove(object);
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

                    this.state.audio['clickSound'].play();
                    if (tableNames[this.state.selected.name] == this.state.sequence[this.state.challengeIndex]) {
                        this.state.challengeIndex += 1;
                        this.greenArrows[tableNames[this.state.selected.name]].visible = true;

                        if (this.state.challengeIndex == this.state.sequence.length) {
                            
                            this.state.audio['actionSuccess'].play();
                            this.state.score += (10 * this.state.sequence.length);
                            console.log(this.state.score);

                            const rand = Math.floor(Math.random() * this.blueArrows.length);
                            this.state.sequence[this.state.sequence.length] = rand;
                            this.state.challengeIndex = 0;
                            this.state.prevTime = timeStamp;
                            this.state.demonstration = true;
                        }
                    }
                    else {
                        this.redArrows[tableNames[this.state.selected.name]].visible = true;

                        this.state.audio['actionFailure'].play();
                        this.state.score = Math.max(0, this.state.score - 10);
                        console.log(this.state.score);
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

        if (this.state.prevScore != this.state.score) {
            //this.state.scoreNumber.visible = false;
            this.removeFromScene(this.state.scoreNumber);
            console.log("here");
            this.state.scoreNumber = new Text(this, this.state.score.toString(), this.state.scorePosition, 0.00004);
            this.add(this.state.scoreNumber);
            this.state.prevScore = this.state.score;
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
