import { MeshBasicMaterial, Texture, DoubleSide, Mesh, PlaneGeometry,
    FontLoader, TextGeometry, MeshLambertMaterial, Group, Scene } from 'three';
    

class Instruction2 extends Group {
    constructor(parent) {

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
        var instruction = new TextGeometry("The crowd will react to how well you do!", {
            font: font,
            size: 250,
            height: 8,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 9,
            bevelSegments: 5
        });

        var instrMesh = new Mesh(instruction, material);
        instrMesh.position.set(-0.135,0,-0.08);
        instrMesh.scale.multiplyScalar(0.00004);
        instrMesh.rotation.set(0, 0, 0);
        instrMesh.castShadow = true;
        parent.add(instrMesh);
        
    });

        // // game over sign
        // var gameOver = new TextGeometry("Game  Over", {
        //     font: font,
        //     size: 250,
        //     height: 8,
        //     curveSegments: 12,
        //     bevelEnabled: true,
        //     bevelThickness: 10,
        //     bevelSize: 9,
        //     bevelSegments: 5
        // });

        // var gameOverMesh = new Mesh(gameOver, material);
        // gameOverMesh.position.set(15, 5, -8);
        // gameOverMesh.rotation.set(0, Math.PI * 1.5, 0);
        // gameOverMesh.scale.multiplyScalar(0.01)
        // gameOverMesh.castShadow = true;
        // //scene.end = gameOverMesh;

        // // press to start sign
        // var playButton = new TextGeometry("PLAY", {
        //     font: font,
        //     size: 60,
        //     height: 5,
        //     curveSegments: 12,
        //     bevelEnabled: true,
        //     bevelThickness: 1,
        //     bevelSize: 1,
        //     bevelSegments: 2
        // });

        // var playMesh = new Mesh(playButton, material);
        // playMesh.position.set(15, 1.5, -3.5);
        // playMesh.rotation.set(0, Math.PI * 1.5, 0);
        // playMesh.scale.multiplyScalar(0.01)
        // playMesh.castShadow = true;
        // scene.add(playMesh);

        // // press to start sign
        // var playAgain = new TextGeometry("Click to Play Again", {
        //     font: font,
        //     size: 60,
        //     height: 5,
        //     curveSegments: 12,
        //     bevelEnabled: true,
        //     bevelThickness: 1,
        //     bevelSize: 1,
        //     bevelSegments: 2
        // });

        // var playAgainMesh = new Mesh(playAgain, material);
        // playAgainMesh.position.set(15, 1.5, -3.3);
        // playAgainMesh.rotation.set(0, Math.PI * 1.5, 0);
        // playAgainMesh.scale.multiplyScalar(0.01)
        // playAgainMesh.castShadow = true;
        // //scene.restart = mesh4;

    // Add self to parent's update list
    parent.addToUpdateList(this);
};

update(timeStamp) {
    // Advance tween animations, if any exist
    //TWEEN.update();
    }
}

export default Instruction2;