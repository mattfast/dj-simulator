/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Vector2, Clock, FloatType, Raycaster } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GameScene, MenuScene } from 'scenes';

// Initialize core ThreeJS components
const menuScene = new MenuScene();
const gameScene = new GameScene();
const camera = new PerspectiveCamera(80);
const renderer = new WebGLRenderer({ 	
	antialias: false,
});
const raycaster = new Raycaster();

// Set up camera
camera.position.set(0, -10, 100);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxDistance = 0.1;
controls.update();

// default scene to be rendered is the MenuScene
let scene = menuScene;

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

// press space to play
window.addEventListener('keydown', event => {
    const key = event.key;
    if (key == ' '){
        if (scene == menuScene){
            scene = gameScene;
        }
    }
})

window.addEventListener('mousedown', event => {
    const clickLocation = new Vector2();

    clickLocation.x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
    clickLocation.y = -(event.clientY / window.innerHeight) * 2.0 + 1.0;

    raycaster.setFromCamera(clickLocation, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        console.log(object.name);
        if (object !== null) {
            scene.state.selected = object;
        }
    }
})

window.addEventListener('mouseup', event => {
    scene.state.mouseUp = true;
})
