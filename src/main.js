// Magical Romantic Flower Experience - Pure JavaScript
// Made with love for the most amazing girl in the world 💕
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';



let flower = { group: new THREE.Group(), flowerHead: new THREE.Group() };

// Initialize Three.js scene
const scene = new THREE.Scene();

// Ultra-romantic gradient background
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const context = canvas.getContext('2d');

const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
gradient.addColorStop(0, '#ff1493');
gradient.addColorStop(0.3, '#ff69b4');
gradient.addColorStop(0.6, '#9370db');
gradient.addColorStop(1, '#4b0082');

context.fillStyle = gradient;
context.fillRect(0, 0, 512, 512);

// Add sparkle effects to background
context.fillStyle = 'rgba(255, 255, 255, 0.8)';
for (let i = 0; i < 100; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = Math.random() * 3 + 1;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
}

const bgTexture = new THREE.CanvasTexture(canvas);
scene.background = bgTexture;

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 8);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('scene'),
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Romantic lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x444444, 1.5);
hemiLight.position.set(0, 10, 0);
scene.add(hemiLight);


const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
mainLight.position.set(5, 10, 5);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 4096;
mainLight.shadow.mapSize.height = 4096;
scene.add(mainLight);

// Multiple romantic colored lights
const lights = [
    { color: 0xff1493, pos: [-3, 3, 3], intensity: 1.5 },
    { color: 0xff69b4, pos: [3, 4, -2], intensity: 1.2 },
    { color: 0x9370db, pos: [0, 5, 4], intensity: 1.0 },
    { color: 0xffd700, pos: [-2, 2, -3], intensity: 0.8 },
    { color: 0xff4500, pos: [4, 3, 2], intensity: 0.9 }
];

const pointLights = [];
lights.forEach(light => {
    const pointLight = new THREE.PointLight(light.color, light.intensity, 15);
    pointLight.position.set(...light.pos);
    scene.add(pointLight);
    pointLights.push({ light: pointLight, baseIntensity: light.intensity });
});

// Create the most beautiful flower ever
{/*function createMagicalFlower() {
    const flowerGroup = new THREE.Group();
    
    // Magical glowing base
    const baseGeometry = new THREE.CylinderGeometry(0.8, 1.0, 0.2, 16);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b4513,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.1;
    flowerGroup.add(base);
    
    // Elaborate root system with glow
    const rootGeometry = new THREE.CylinderGeometry(0.05, 0.15, 0.8, 8);
    const rootMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x654321,
        shininess: 50
    });
    const mainRoot = new THREE.Mesh(rootGeometry, rootMaterial);
    mainRoot.position.y = -0.4;
    flowerGroup.add(mainRoot);
    
    // Multiple spiral root branches
    for (let i = 0; i < 8; i++) {
        const branchGeometry = new THREE.CylinderGeometry(0.02, 0.08, 0.6, 6);
        const branch = new THREE.Mesh(branchGeometry, rootMaterial);
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.3;
        branch.position.set(
            Math.cos(angle) * radius, 
            -0.6, 
            Math.sin(angle) * radius
        );
        branch.rotation.z = Math.cos(angle) * 0.5;
        branch.rotation.x = Math.sin(angle) * 0.5;
        flowerGroup.add(branch);
    }
    
    // Majestic glowing stem
    const stemGeometry = new THREE.CylinderGeometry(0.08, 0.12, 4, 12);
    const stemMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x228b22,
        shininess: 80,
        transparent: true,
        opacity: 0.95
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 1.5;
    flowerGroup.add(stem);
    
    // Elegant leaves with shimmer
    const leafGeometry = new THREE.ConeGeometry(0.3, 0.8, 8);
    const leafMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x32cd32,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    
    const leafPositions = [
        { pos: [0.4, 0.8, 0], rot: [0, 0, Math.PI/3] },
        { pos: [-0.3, 1.2, 0.2], rot: [0, 0, -Math.PI/4] },
        { pos: [0.25, 1.8, -0.15], rot: [0, Math.PI/6, Math.PI/5] },
        { pos: [-0.2, 2.4, 0.1], rot: [0, -Math.PI/8, -Math.PI/6] }
    ];
    
    leafPositions.forEach(leaf => {
        const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);
        leafMesh.position.set(...leaf.pos);
        leafMesh.rotation.set(...leaf.rot);
        flowerGroup.add(leafMesh);
    });
    
    // The most gorgeous flower head ever created
    const flowerHead = new THREE.Group();
    
    // Glowing center
    const centerGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffd700,
        shininess: 200,
        transparent: true,
        opacity: 0.95,
        emissive: 0x444400
    });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    flowerHead.add(center);
    
    // Magical petal layers
    const petalLayers = [
        { count: 20, radius: 0.8, size: [0.25, 0.8], color: 0xff1493, opacity: 0.95 },
        { count: 15, radius: 0.6, size: [0.2, 0.6], color: 0xff69b4, opacity: 0.9 },
        { count: 12, radius: 0.45, size: [0.15, 0.5], color: 0xffc0cb, opacity: 0.85 },
        { count: 8, radius: 0.3, size: [0.12, 0.4], color: 0xffb6c1, opacity: 0.8 }
    ];
    
    petalLayers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
            const petalGeometry = new THREE.ConeGeometry(layer.size[0], layer.size[1], 8);
            const petalMaterial = new THREE.MeshPhongMaterial({ 
                color: layer.color,
                shininess: 150,
                transparent: true,
                opacity: layer.opacity,
                side: THREE.DoubleSide
            });
            
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);
            const angle = (i / layer.count) * Math.PI * 2 + (layerIndex * Math.PI / 8);
            
            petal.position.set(
                Math.cos(angle) * layer.radius,
                -0.1 + layerIndex * 0.05,
                Math.sin(angle) * layer.radius
            );
            petal.rotation.z = angle + Math.PI / 2;
            petal.rotation.x = 0.3 + layerIndex * 0.1;
            
            flowerHead.add(petal);
        }
    });
    
    // Magical stamens
    for (let i = 0; i < 12; i++) {
        const stamenGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const stamenMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffff00,
            shininess: 200,
            emissive: 0x333300
        });
        const stamen = new THREE.Mesh(stamenGeometry, stamenMaterial);
        const angle = (i / 12) * Math.PI * 2;
        stamen.position.set(
            Math.cos(angle) * 0.15,
            0.1,
            Math.sin(angle) * 0.15
        );
        flowerHead.add(stamen);
    }
    
    flowerHead.position.y = 3.5;
    flowerGroup.add(flowerHead);
    
    return { group: flowerGroup, flowerHead: flowerHead };
}*/}

// Create the magical flower
//const flower = createMagicalFlower();
//scene.add(flower.group);

const loader = new GLTFLoader();
loader.load('bouquet.glb', (gltf) => {
    const model = gltf.scene;
    const scaleFactor = window.innerWidth < 768 ? 4.5 : 7.5;
    const yOffset = window.innerWidth < 768 ? -1 : 0;

    model.scale.set(7.5, 7.5, 7.5); // Adjust size as needed
    model.position.set(0, 0, 0);     // Adjust position
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
    model.position.set(0, yOffset, 0);
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const oldMat = child.material;
            const texture = oldMat.map || null;
            // Enhance materials to look more physically real and glossy
            child.material = new THREE.MeshPhysicalMaterial({
                map: oldMat.map || null,
                color: oldMat.color || 0xffffff,
                roughness: 0.2,
                metalness: 0.5,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
                reflectivity: 1.0,
                transparent: oldMat.transparent || true,
                opacity: oldMat.opacity || 0.95,
            });
        }
    });
    scene.add(model);

    // Optional sway animation for loaded model
    // mimic old structure to keep swaying
}, undefined, (error) => {
    console.error("An error happened while loading the flower model:", error);
});


// Romantic particle systems
const particles = [];

// Floating hearts
for (let i = 0; i < 50; i++) {
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

    const heartGeometry = new THREE.ShapeGeometry(heartShape);
    const heartMaterial = new THREE.MeshBasicMaterial({
        color: 0xff1493,
        transparent: true,
        opacity: 0.8
    });

    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    heart.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 10,
        (Math.random() - 0.5) * 20
    );
    const scale = window.innerWidth < 768 ? 0.15 : 0.2;
    heart.scale.set(scale, scale, scale);

    scene.add(heart);
    particles.push({
        mesh: heart,
        speed: Math.random() * 0.02 + 0.01,
        rotSpeed: Math.random() * 0.05 + 0.02,
        type: 'heart'
    });
}

// Magical sparkles
for (let i = 0; i < 200; i++) {
    const sparkleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const sparkleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });

    const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
    sparkle.position.set(
        (Math.random() - 0.5) * 25,
        Math.random() * 15,
        (Math.random() - 0.5) * 25
    );
    scene.add(sparkle);
    particles.push({
        mesh: sparkle,
        speed: Math.random() * 0.01 + 0.005,
        rotSpeed: Math.random() * 0.1 + 0.05,
        type: 'sparkle'
    });
}

// Rose petals falling
for (let i = 0; i < 100; i++) {
    const petalScale = window.innerWidth < 768 ? 0.15 : 0.2;
    const petalGeometry = new THREE.PlaneGeometry(petalScale, petalScale * 1.5);
    const petalMaterial = new THREE.MeshLambertMaterial({
        color: 0xff69b4,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });

    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    petal.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 15 + 5,
        (Math.random() - 0.5) * 20
    );
    petal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    scene.add(petal);
    particles.push({
        mesh: petal,
        speed: Math.random() * 0.03 + 0.01,
        rotSpeed: Math.random() * 0.02 + 0.01,
        type: 'petal'
    });
}

// Camera controls
let cameraAngle = 0;
const cameraRadius = 8;
const cameraHeight = 2;

// Interactive heart burst function
function createHeartBurst() {
    for (let i = 0; i < 20; i++) {
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0);
        heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
        heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
        heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

        const heartGeometry = new THREE.ShapeGeometry(heartShape);
        const heartMaterial = new THREE.MeshBasicMaterial({
            color: 0xff1493,
            transparent: true,
            opacity: 1
        });

        const heart = new THREE.Mesh(heartGeometry, heartMaterial);
        heart.position.set(0, 2, 0);
        heart.scale.set(0.3, 0.3, 0.3);

        const direction = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            Math.random() + 0.5,
            (Math.random() - 0.5) * 2
        ).normalize();

        scene.add(heart);

        // Animate heart burst
        let burstTime = 0;
        const animateHeart = () => {
            burstTime += 0.05;
            heart.position.add(direction.clone().multiplyScalar(0.1));
            heart.material.opacity = Math.max(0, 1 - burstTime);
            heart.rotation.z += 0.1;

            if (burstTime < 1) {
                requestAnimationFrame(animateHeart);
            } else {
                scene.remove(heart);
                heart.geometry.dispose();
                heart.material.dispose();
            }
        };
        animateHeart();
    }
}
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,   // strength
    0.4,   // radius
    0.85   // threshold
);
composer.addPass(bloomPass);

// Animation loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Smooth camera rotation around the flower
    cameraAngle += 0.005;
    camera.position.x = Math.cos(cameraAngle) * cameraRadius;
    camera.position.z = Math.sin(cameraAngle) * cameraRadius;
    camera.position.y = cameraHeight + Math.sin(time * 0.5) * 0.5;
    camera.lookAt(0, 2, 0);

    // Flower swaying
    flower.group.rotation.z = Math.sin(time * 0.8) * 0.1;
    flower.flowerHead.rotation.y = Math.sin(time * 0.3) * 0.2;

    // Animate all particles
    particles.forEach(particle => {
        // Floating motion
        particle.mesh.position.y += Math.sin(time * 2 + particle.mesh.position.x) * 0.002;

        // Rotation
        particle.mesh.rotation.x += particle.rotSpeed;
        particle.mesh.rotation.y += particle.rotSpeed * 0.7;
        particle.mesh.rotation.z += particle.rotSpeed * 0.5;

        // Opacity variation for sparkles
        if (particle.type === 'sparkle') {
            particle.mesh.material.opacity = 0.3 + Math.sin(time * 3 + particle.mesh.position.x) * 0.5;
        }

        // Falling motion for petals
        if (particle.type === 'petal') {
            particle.mesh.position.y -= particle.speed;
            particle.mesh.position.x += Math.sin(time + particle.mesh.position.y) * 0.002;
        }

        // Reset position if too far
        if (particle.mesh.position.y < -5) {
            particle.mesh.position.y = 15;
            particle.mesh.position.x = (Math.random() - 0.5) * 20;
            particle.mesh.position.z = (Math.random() - 0.5) * 20;
        }
    });

    // Pulsing lights
    pointLights.forEach((lightData, index) => {
        lightData.light.intensity = lightData.baseIntensity + Math.sin(time * 2 + index) * 0.3;
    });
    // renderer.render(scene, camera);
    composer.render();


}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Interactive features
window.addEventListener('click', createHeartBurst);
window.addEventListener('touchstart', createHeartBurst);

// Start the magic
animate();

// Love console messages
console.log("💕 Welcome to your romantic flower experience! 💕");
console.log("Click anywhere to create a burst of hearts!");
console.log("This flower was made with all my love just for you 🌹");
console.log("Every petal represents a reason why I love you 💖");

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scene,
        camera,
        renderer,
        flower,
        createHeartBurst,
        animate
    };
}