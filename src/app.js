/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Vector2, Clock, FloatType, Raycaster, AudioListener, Audio, AudioLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GameScene, MenuScene, InstructionScene } from 'scenes';

// Initialize core ThreeJS components
const menuScene = new MenuScene();
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

// Set up audio
const listener = new AudioListener();
var audioLoader = new AudioLoader();
const audio = {};
audio['titleMusic'] = new Audio( listener );

// Load initial background music
audioLoader.load('src/components/audio/title_music.mp3', function( buffer ) {
    audio['titleMusic'].setBuffer( buffer );
    audio['titleMusic'].setLoop = true;
    audio['titleMusic'].hasPlaybackControl = true;
    audio['titleMusic'].play();
});

// Load 'click' sound
audio['clickSound'] = new Audio( listener );
audioLoader.load('src/components/audio/button_press.mp3', function( buffer ) {
   audio['clickSound'].setBuffer( buffer );
   audio['clickSound'].hasPlaybackControl = true;
   audio['clickSound'].setVolume(3.0);
   audio['clickSound'].pause();
});

// Load Animals by Martin Garrix (Game music)
audio['animalsSong'] = new Audio( listener );
audioLoader.load('src/components/audio/animals.mp3', function( buffer ) {
    audio['animalsSong'].setBuffer( buffer );
    audio['animalsSong'].hasPlaybackControl = true;
    audio['animalsSong'].setVolume(0.7);
    audio['animalsSong'].pause();
});

// Load Crowd boo
audio['boo'] = new Audio( listener );
audioLoader.load('src/components/audio/boo.mp3', function( buffer ) {
    audio['boo'].setBuffer( buffer );
    audio['boo'].hasPlaybackControl = true;
    audio['boo'].pause();
});

// Load Crowd cheer
audio['cheer'] = new Audio( listener );
audioLoader.load('src/components/audio/cheer.mp3', function( buffer ) {
    audio['cheer'].setBuffer( buffer );
    audio['cheer'].hasPlaybackControl = true;
    audio['cheer'].pause();
});

// Load Action Failure sound
audio['actionFailure'] = new Audio( listener );
audioLoader.load('src/components/audio/action_failure_edited.mp3', function( buffer ) {
    audio['actionFailure'].setBuffer( buffer );
    audio['actionFailure'].hasPlaybackControl = true;
    audio['actionFailure'].setVolume(5.0);
    audio['actionFailure'].pause();
});

// Load Action Success sound
audio['actionSuccess'] = new Audio( listener );
audioLoader.load('src/components/audio/action_success.mp3', function( buffer ) {
    audio['actionSuccess'].setBuffer( buffer );
    audio['actionSuccess'].hasPlaybackControl = true;
    audio['actionSuccess'].setVolume(2.0);
    audio['actionSuccess'].pause();
});


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
        if (scene.state.type == 'menu'){
            scene = new InstructionScene();
            audio['clickSound'].play();
        }
        else if (scene.state.type == 'instruction'){
            scene = new GameScene(audio);
            audio['clickSound'].play();
            audio['titleMusic'].stop();
            audio['animalsSong'].play();
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
            //actionSuccess.play();
            scene.state.selected = object;
        }
    }
})

window.addEventListener('mouseup', event => {
    scene.state.mouseUp = true;
})
