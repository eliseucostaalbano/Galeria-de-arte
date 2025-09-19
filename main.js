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

const geometria = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cubo = new THREE.Mesh( geometria, material );
cena.add( cubo );

camera.position.z = 5;

function animate() {

  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.01;

  renderer.render( cena, camera );

}

window.addEventListener( 'resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});