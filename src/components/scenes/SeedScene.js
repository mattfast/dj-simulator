import * as Dat from 'dat.gui';

import { Scene, Color, Object3D, Vector3 } from 'three';
import { Ceiling, Floor, BackWall, FrontWall, RightWall, LeftWall, Speaker, Table, Truss } from 'objects';
import { BasicLights, SpotLights, LightTarget } from 'lights';

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
  }


class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
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

        // Add room geometries
        const ceiling = new Ceiling(this);
        const floor = new Floor(this);
        const backwall = new BackWall(this);
        const frontwall = new FrontWall(this);
        const rightwall = new RightWall(this);
        const leftwall = new LeftWall(this);

        this.add(frontwall, floor, backwall, ceiling, rightwall, leftwall);

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
        //console.log(dumpObject(table).join('\n'));

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
