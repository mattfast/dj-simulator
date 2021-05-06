import { MeshBasicMaterial, Texture, DoubleSide, Mesh, PlaneGeometry,
    FontLoader, TextGeometry, MeshLambertMaterial, Group, Scene } from 'three';
    

class Text extends Group {
    constructor(parent, text, position, scalarMultiple) {

        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
        };

        var loader = new FontLoader();
        loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function(font, scene) {
            var material = new MeshLambertMaterial({
                color: 0xd3d3d3,
                emissive: 0xff0000,
            });

            // game start page signs
            var gameTitle = new TextGeometry(text, {
                font: font,
                size: 250,
                height: 8,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 9,
                bevelSegments: 5,
            });

            var gameTitleMesh = new Mesh(gameTitle, material);
            gameTitleMesh.position.set(position.x, position.y, position.z);
            gameTitleMesh.scale.multiplyScalar(scalarMultiple);
            gameTitleMesh.rotation.set(0, 0, 0);
            // gameTitleMesh.castShadow = true;
            parent.add(gameTitleMesh);        
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    };

    update(timeStamp) {
        // Advance tween animations, if any exist
        //TWEEN.update();
    }
}

export default Text;