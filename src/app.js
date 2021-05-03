/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Clock } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera(80);
const renderer = new WebGLRenderer({ antialias: true });

// Post processing
// const composer = new EffectComposer(renderer);
// composer.addPass(new RenderPass(scene, camera));
// composer.addPass(new EffectPass(camera, new BloomEffect()));

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
//controls.minDistance = 4;
controls.maxDistance = 0.1;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    // composer.render(clock.getDelta());
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
