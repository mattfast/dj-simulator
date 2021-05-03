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

class FrontWall extends Group {
    constructor(parent) {
        super();

        this.state = {
            //cameraPosition: parent.camera.position
        };

        let planeMaterial = new MeshStandardMaterial({
          //color: 0x808080,
          //color: 0x202020,
          color: 0x101022,
          side: DoubleSide
        });
        // Create a geometry with N segments.
        const planeGeometry = new PlaneGeometry(200, 100);

        // Update geometry.
        planeGeometry.computeFaceNormals();

        // Create plane
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = 0;
        plane.position.set(0, 0, -50);
        this.add(plane);
    }
}

export default FrontWall