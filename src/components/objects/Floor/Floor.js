import {
    ShaderMaterial, 
    BoxBufferGeometry,
    NearestFilter,
    Vector3,
    Group,
    CubeGeometry,
    PlaneGeometry,
    Mesh,
    DoubleSide,
    TextureLoader,
    RepeatWrapping,
    MeshStandardMaterial,
} from 'three';

const fragmentShader = `
    #include <common>
    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;
    // By Daedelus: https://www.shadertoy.com/user/Daedelus
    // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
    #define TIMESCALE 0.5
    #define TILES 8
    #define COLOR 0.7, 1.6, 2.8
    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        vec2 uv = fragCoord.xy / iResolution.xy;
        uv.x *= iResolution.x / iResolution.y;
        uv.y *= 200.0;
        vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));
        float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);
        p = min(max(p * 3.0 - 1.8, 0.1), 2.0);
        vec2 r = mod(uv * float(TILES), 1.0);
        r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));
        p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);
        fragColor = vec4(COLOR, 1.0) * p;
    }
    varying vec2 vUv;
    void main() {
        mainImage(gl_FragColor, vUv * iResolution.xy);
    }
`;

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

const loader = new TextureLoader();
const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/bayer.png');
texture.minFilter = NearestFilter;
texture.magFilter = NearestFilter;
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;

class Floor extends Group {
    constructor(parent) {
        super();

        this.state = {
            //cameraPosition: parent.camera.position
        };

        this.uniforms = {
            iTime: { value: 0 },
            iResolution:  { value: new Vector3(window.innerWidth, window.innerHeight, 1) },
            iChannel0: { value: texture },
        };
        const planeMaterial = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            side: DoubleSide
        });

        /*let planeMaterial = new MeshStandardMaterial({
          //color: 0x808080,
          color: 0x202020,
          side: DoubleSide
        });*/
        // Create a geometry with N segments.
        const planeGeometry = new PlaneGeometry(200, 100);

        // Update geometry.
        planeGeometry.computeFaceNormals();

        // Create plane
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;
        plane.position.set(0, -6, -15);
        plane.scale.set(1, 20, 1);
        this.add(plane);
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        timeStamp *= 0.001;
        this.uniforms.iTime.value = timeStamp;
    }
}

export default Floor