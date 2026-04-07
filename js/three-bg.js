import * as THREE from 'three';

const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 12);
camera.lookAt(0, 0, 0);

const particleCount = 4000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
    const radius = 8 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
    positions[i*3+2] = radius * Math.cos(phi);
    const color = new THREE.Color().setHSL(0.55 + Math.random() * 0.2, 1, 0.6);
    colors[i*3] = color.r;
    colors[i*3+1] = color.g;
    colors[i*3+2] = color.b;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const particleMat = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, blending: THREE.AdditiveBlending });
const particles = new THREE.Points(geometry, particleMat);
scene.add(particles);

const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.28, 180, 24, 3, 4);
const knotMat = new THREE.MeshStandardMaterial({ color: 0x00f2ff, emissive: 0x004466, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.2 });
const knot = new THREE.Mesh(knotGeo, knotMat);
scene.add(knot);

const knot2Geo = new THREE.TorusKnotGeometry(0.9, 0.22, 160, 20, 2, 3);
const knotMat2 = new THREE.MeshStandardMaterial({ color: 0xb000ff, emissive: 0x330066, emissiveIntensity: 0.7 });
const knot2 = new THREE.Mesh(knot2Geo, knotMat2);
scene.add(knot2);

const orbMat = new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00aa44, emissiveIntensity: 0.5 });
const orb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), orbMat);
orb.position.set(2.5, 1.2, -3);
scene.add(orb);
const orb2 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0x442200 }));
orb2.position.set(-2, -1, -4);
scene.add(orb2);

const ambient = new THREE.AmbientLight(0x111122);
scene.add(ambient);
const mainLight = new THREE.PointLight(0x00aaff, 1.2);
mainLight.position.set(3, 4, 5);
scene.add(mainLight);
const backLight = new THREE.PointLight(0xff44cc, 0.8);
backLight.position.set(-2, 1, -6);
scene.add(backLight);

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.008;
    particles.rotation.y = time * 0.1;
    particles.rotation.x = Math.sin(time * 0.2) * 0.2;
    knot.rotation.x = time * 0.4;
    knot.rotation.y = time * 0.6;
    knot2.rotation.x = time * 0.5;
    knot2.rotation.z = time * 0.3;
    orb.position.y = 1.2 + Math.sin(time * 2) * 0.2;
    orb2.position.x = -2 + Math.sin(time * 1.5) * 0.3;
    camera.position.z = 12 + Math.sin(time * 0.2) * 0.2;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
