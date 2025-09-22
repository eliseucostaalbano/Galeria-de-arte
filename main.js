import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';


const imagens = [
  './img/socrates.jpg',
  './img/stars.jpg',
  './img/wave.jpg',
  './img/spring.jpg',
  './img/mountain.jpg',
  './img/sunday.jpg'
];

const titulos = [
  'a Morte de Sócrates',
  'A Noite Estrelada',
  'A Grande Onda de Kanagawa',
  'Efeito da Primavera, Giverny',
  'Montanha Corcoran',
  'Um Domingo na Grande Jatte'
];

const artistas = [
  'Jacques-Louis David',
  'Vincent Van Gogh',
  'Katsushika Hokusai',
  'Claude Monet',
  'Albert Bierstadt',
  'George Seurat'
];

const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const root = new THREE.Object3D();
cena.add(root);

let count = 6;
for (let i = 0; i < count; i++) {
  const textura = textureLoader.load( imagens[i] );
  textura.colorSpace = THREE.SRGBColorSpace;
  const base = new THREE.Object3D();
  base.rotation.y = i *  (2 * Math.PI / count);
  root.add(base);

const borda = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.09),
    new THREE.MeshStandardMaterial({ color: 0x202020 })
);
borda.position.z = -4.05;
base.add( borda );

const arte = new THREE.Mesh(
  new THREE.BoxGeometry(3, 2, 0.01),
  new THREE.MeshStandardMaterial({ map: textura })
);
arte.position.z = -4;
base.add( arte );

}

const holoFote = new THREE.SpotLight(0xffffff, 100.0, 10, 0.65, 1);
holoFote.position.set(0, 5, 0);
holoFote.target.position.set(0, 1, -5);
cena.add(holoFote);
cena.add(holoFote.target);

const espelho = new Reflector(
  new THREE.CircleGeometry(10),
  {
    color: 0x505050,
   textureWidth: window.innerWidth,
   textureHeight: window.innerHeight,
  }
);
espelho.position.y = -1.5;
espelho.rotateX( - Math.PI / 2 );
cena.add( espelho );


function animate() {
  root.rotation.y += 0.002;
  renderer.render( cena, camera );
}

window.addEventListener( 'resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

  espelho.getRenderTarget().setSize( window.innerWidth, window.innerHeight );
});