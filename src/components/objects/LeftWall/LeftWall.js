import {
    Group,
    CubeGeometry,
    PlaneGeometry,
    Mesh,
    DoubleSide,
    TextureLoader,
    RepeatWrapping,
    MeshStandardMaterial,
} from 'three';

class LeftWall extends Group {
    constructor(parent) {
        super();

        this.state = {
            //cameraPosition: parent.camera.position
        };

        let planeMaterial = new MeshStandardMaterial({
          //color: 0x808080,
          color: 0x202020,
          side: DoubleSide
        });
        // Create a geometry with N segments.
        const planeGeometry = new PlaneGeometry(100, 100);

        // Update geometry.
        planeGeometry.computeFaceNormals();

        // Create plane
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.y = Math.PI / 2;
        plane.position.set(-30, 0, -15);
        this.add(plane);
    }
}

export default LeftWall