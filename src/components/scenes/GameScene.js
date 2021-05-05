import * as Dat from 'dat.gui';

import { Scene, Color, Object3D, Vector3 } from 'three';
import { Ceiling, Floor, BackWall, FrontWall, RightWall, LeftWall, Speaker, Table, Truss, Alphabet, Man, Arrow } from 'objects';
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
    


class GameScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
            selected: null,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add lights
        const atmospheric = new BasicLights();
        //const spotlight1 = new SpotLights(this, 0xffffff, [0, 0, 0]);
        const spotlight2 = new SpotLights(this, 0xaa0000, [0, 0, 0], false);
        const spotlight3 = new SpotLights(this, 0x00aa00, [0, 0, 0], false);
        this.add(atmospheric, spotlight2, spotlight3);

        // Add light targets
        //const target1 = new LightTarget(this, [0, 0, -10], 5, true);
        const target2 = new LightTarget(this, [1, 0, -10], 5, false);
        const target3 = new LightTarget(this, [-1, 0, -10], 5, true);
        this.add(target2, target3);

        // Connect lights to targets
        //spotlight1.dir.target = target1.target;
        spotlight2.dir.target = target2.target;
        spotlight3.dir.target = target3.target;

        //spotlight4.dir.target = target4.target;

        // Add room geometries
        const ceiling = new Ceiling(this);
        const floor = new Floor(this);
        const backwall = new BackWall(this);
        const frontwall = new FrontWall(this);
        const rightwall = new RightWall(this);
        const leftwall = new LeftWall(this);

        this.add(frontwall, floor, backwall, ceiling, rightwall, leftwall);

        // Create DJ equipment
        const table = new Table(this);
        const truss1 = new Truss(this);
        const truss2 = new Truss(this);
        const truss3 = new Truss(this);
        const truss4 = new Truss(this);
        const speaker1 = new Speaker(this);
        const speaker2 = new Speaker(this);
        const speaker3 = new Speaker(this);
        const speaker4 = new Speaker(this);

        // Set positions of equipment
        table.scale.set(2,2,2);
        table.position.set(7, -6, -13);

        truss1.scale.set(12,12,12);
        truss2.scale.set(12,12,12);
        truss3.scale.set(12,12,12);
        truss4.scale.set(12,12,12);

        truss1.position.set(27, 6, -47);
        truss2.position.set(-27, 6, -47);
        truss3.position.set(27, 6, 17);
        truss4.position.set(-27, 6, 17);

        speaker1.scale.set(5, 5, 5);
        speaker2.scale.set(5, 5, 5);
        speaker3.scale.set(5, 5, 5);
        speaker4.scale.set(5, 5, 5);

        speaker1.position.set(26, 11, -46);
        speaker2.position.set(-26, 11, -46);
        speaker3.position.set(26, 11, 16);
        speaker4.position.set(-26, 11, 16);

        speaker1.rotation.order = "XZY";
        speaker1.rotation.x = Math.PI / 2;
        speaker1.rotation.y = Math.PI / 2;
        speaker1.rotation.z = Math.PI / 4;

        speaker2.rotation.order = "XZY";
        speaker2.rotation.x = Math.PI / 2;
        speaker2.rotation.y = Math.PI / 2;
        speaker2.rotation.z = -Math.PI / 4;

        speaker3.rotation.order = "XZY";
        speaker3.rotation.x = Math.PI / 2;
        speaker3.rotation.y = Math.PI / 2;
        speaker3.rotation.z = 3*Math.PI / 4;

        speaker4.rotation.order = "XZY";
        speaker4.rotation.x = Math.PI / 2;
        speaker4.rotation.y = Math.PI / 2;
        speaker4.rotation.z = -3*Math.PI / 4;
        

        this.add(table, truss1, truss2, truss3, truss4, speaker1, speaker2, speaker3, speaker4);
        //console.log(dumpObject(table).join('\n'));

        // Add letters
        const letterD = new Alphabet(this, 'D');
        const letterJ = new Alphabet(this, 'J');
        const letterF = new Alphabet(this, 'F');
        const letterE = new Alphabet(this, 'E');
        const letterL = new Alphabet(this, 'L');
        const letterI = new Alphabet(this, 'I');
        const letterX = new Alphabet(this, 'X');

        letterD.scale.set(0.1, 0.1, 0.1);
        letterJ.scale.set(0.1, 0.1, 0.1);
        letterF.scale.set(0.1, 0.1, 0.1);
        letterE.scale.set(0.1, 0.1, 0.1);
        letterL.scale.set(0.1, 0.1, 0.1);
        letterI.scale.set(0.1, 0.1, 0.1);
        letterX.scale.set(0.1, 0.1, 0.1);

        letterD.rotation.y = -Math.PI / 2;
        letterJ.rotation.y = -Math.PI / 2;
        letterF.rotation.y = -Math.PI / 2;
        letterE.rotation.y = -Math.PI / 2;
        letterL.rotation.y = -Math.PI / 2;
        letterI.rotation.y = -Math.PI / 2;
        letterX.rotation.y = -Math.PI / 2;

        letterD.position.set(32, 10, -20);
        letterJ.position.set(-6, 12, -25);
        //this.add(letterD, letterJ);

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
        this.arrows = []
        for (let i = 0; i < tablePositions.length; i++) {
            this.arrows[i] = new Arrow(this, true, tablePositions[i]);
            this.arrows[i].transparent = true;
            this.add(this.arrows[i]);
        }
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

        if (this.state.selected !== null) {
            if (this.state.selected.name in tableNames) {
                console.log("changed opacity");
                console.log(this.arrows[tableNames[this.state.selected.name]]);
                this.arrows[tableNames[this.state.selected.name]].visible = !this.arrows[tableNames[this.state.selected.name]].visible;
            }
            this.state.selected = null;
        }
    }
}

export default GameScene;
