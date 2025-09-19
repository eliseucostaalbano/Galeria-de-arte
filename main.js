import * as THREE from 'three';

const imagens = [
  'socrates.jpg',
  'stars.jpg',
  'wave.jpg',
  'spring.jpg',
  'mountain.jpg',
  'sunday.jpg'
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
  const base = new THREE.Object3D();
  base.rotation.y = i *  (2 * Math.PI / count);
  root.add(base);

const arte = new THREE.Mesh(
  new THREE.BoxGeometry(3, 2, 0.01),
  new THREE.MeshBasicMaterial({ color: 0xf08080 })
);
arte.position.z = -4;
base.add( arte );

}

function animate() {
  root.rotation.y += 0.002;
  renderer.render( cena, camera );
}

window.addEventListener( 'resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});