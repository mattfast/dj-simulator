import * as Dat from 'dat.gui';

import { Scene, Color, Object3D, Vector3 } from 'three';
import { Ceiling, Floor, BackWall, FrontWall, RightWall, LeftWall, Speaker, Table, Truss } from 'objects';
import { BasicLights, SpotLights, LightTarget } from 'lights';

class NightclubScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
            selected: null,
            lastSelected: null,
            difficulty: 1000,
            score: 0,
            sequence: [],
            demonstration: true,
            demonstrationIndex: -1,
            challengeIndex: 0,
            prevTime: 0,
            mouseUp: false,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add lights
        const atmospheric = new BasicLights();
        //const spotlight1 = new SpotLights(this, 0xaa0000, [0, 0, 0], false);
        //const spotlight2 = new SpotLights(this, 0x00aa00, [0, 0, 0], false);
        const spotlight1 = new SpotLights(this, 0xffffff, [0, 0, 0], false);
        const spotlight2 = new SpotLights(this, 0xffffff, [0, 0, 0], false);
        this.add(atmospheric, spotlight1, spotlight2);

        // Add light targets
        const target1 = new LightTarget(this, [1, 0, -10], 5, false);
        const target2 = new LightTarget(this, [-1, 0, -10], 5, true);
        this.add(target1, target2);

        // Connect lights to targets
        spotlight1.state.dir.target = target1.target;
        spotlight2.state.dir.target = target2.target;

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
        truss1.position.set(27, 6, -47);
        truss2.position.set(-27, 6, -47);
        truss3.position.set(27, 6, 17);
        truss4.position.set(-27, 6, 17);

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
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
    }
}

export { NightclubScene };
