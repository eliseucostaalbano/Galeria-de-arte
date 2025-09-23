import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import * as TWEEN from 'tween';


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
const texturaSetaEsquerda = textureLoader.load( './img/left.png' );
const texturaSetaDireita = textureLoader.load( './img/right.png' );

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

const setaEsquerda = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.01),
  new THREE.MeshStandardMaterial({ map: texturaSetaEsquerda  , transparent: true })
);
setaEsquerda.name = "Esquerda";
setaEsquerda.userData = (i=== count -1) ? 0 : i + 1;
setaEsquerda.position.set(-1.8, 0, -4);
base.add( setaEsquerda );

const setaDireita = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.01),
  new THREE.MeshStandardMaterial({ map: texturaSetaDireita  , transparent: true })
);
setaDireita.name = "Direita";
setaDireita.userData = (i=== 0) ? count -1 : i - 1;
setaDireita.position.set(1.8, 0, -4);
base.add( setaDireita );

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

function girarGaleria(direção, newIndex) {
  const deltaY = direção * (2 * Math.PI / count);

  new TWEEN.Tween(root.rotation)
    .to( { y: root.rotation.y + deltaY })
    .easing(TWEEN.Easing.Quadratic.Out)
    .start()
    .onStart(() => {
      document.getElementById("titulo").innerText = titulos[newIndex];
      document.getElementById("artista").innerText = artistas[newIndex];
      document.getElementById("titulo").style.opacity = 0;
     document.getElementById("artista").style.opacity = 0;
    })
    .onComplete(() => {
      document.getElementById("titulo").innerText = titulos[newIndex];
      document.getElementById("artista").innerText = artistas[newIndex];
      document.getElementById("titulo").style.opacity = 1;
      document.getElementById("artista").style.opacity = 1;
    });

}

function animate() {
  TWEEN.update();
  renderer.render( cena, camera );
}

window.addEventListener( 'resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

  espelho.getRenderTarget().setSize( window.innerWidth, window.innerHeight );
});

window.addEventListener( 'click', (e) => {
 const raycaster = new THREE.Raycaster();
 const mouse = new THREE.Vector2(
   (e.clientX / window.innerWidth) * 2 - 1,
   - (e.clientY / window.innerHeight) * 2 + 1
 );
 raycaster.setFromCamera(mouse, camera);
 const intersecao = raycaster.intersectObject(root, true);
  const obj = intersecao[0].object;
  const newIndex = obj.userData;
 if (intersecao.length > 0) {
      if(obj.name === "Esquerda") {
        girarGaleria(-1, newIndex);
      }
      if(obj.name === "Direita") {
        girarGaleria(1, newIndex);
      }
    }
});

document.getElementById("titulo").innerText = titulos[0];
document.getElementById("artista").innerText = artistas[0];