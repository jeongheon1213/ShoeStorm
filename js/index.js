// ~ 내코드
import * as THREE from 'three';
import DragControls from 'three-dragcontrols';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffffff  } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
decalInit(THREE);

const geometry2 =  THREE.DecalGeometry( cube, new THREE.Vector3( 0, 1, 0 ), new THREE.Euler(0,0,1,'XYZ'), new THREE.Vector3( 1, 1, 1 ) );
const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh2 = new THREE.Mesh( geometry2, material2 );
scene.add( mesh2 );


renderer.render( scene, camera );


const controls = new DragControls( [ cube ], camera, renderer.domElement );


controls.addEventListener('drag', render);


function render(event ) {
    console.log(event.object.position);era );

}
