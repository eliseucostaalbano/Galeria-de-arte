import * as THREE from 'three';

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