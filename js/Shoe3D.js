import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import Stats from 'three/examples/jsm/libs/stats.module.js';

let self;

class Shoe3D {
    constructor(selector) {
        self = this;
        this.target = document.querySelector(selector);
        this.scene = undefined;
        this.camera = undefined;

        // 광선투시(교차 객체를 가져오기 위함)
        this.raycaster = undefined;
        this.objList = [];

        // 교차점을 표시해주는 객체
        this.sphereInter = undefined;

        this.mouse = new THREE.Vector2();

        this.initialize();
    }

    initialize() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.target.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.objList.push(cube);

        const wGeometry = new THREE.EdgesGeometry(cube.geometry);
        const wMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 1 });
        const wire = new THREE.LineSegments(wGeometry, wMaterial);
        wire.renderOrder = 1;
        // const cube = new THREE.Mesh(geometry, material);
        this.scene.add(wire);
        // this.objList.push(wire);

        this.camera.position.z = 5;

        renderer.render(this.scene, this.camera);

        // const controls = new DragControls([cube], camera, renderer.domElement);

        // controls.addEventListener('drag', render);
        const controls = new OrbitControls(this.camera, renderer.domElement);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.minDistance = 5; // 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
        controls.maxDistance = 100; //  마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.

        const sphereGeometry = new THREE.SphereGeometry(0.1);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        this.sphereInter = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphereInter.visible = false;
        this.scene.add(this.sphereInter);

        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Mesh;

        window.addEventListener('mousemove', onDocumentMouseMove, false);

        animate();

        function animate() {
            requestAnimationFrame(animate);

            controls.update(); // 마우스로인해 변경된 카메라값을 업데이트 합니다.
            render.bind(this)();
        }

        function onDocumentMouseMove(event) {
            event.preventDefault();

            self.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            self.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        function render(event) {
            self.raycaster.setFromCamera(self.mouse, self.camera);

            const intersects = self.raycaster.intersectObjects(self.objList, true);
            if (intersects.length > 0) {
                self.sphereInter.visible = true;
                self.sphereInter.position.copy(intersects[0].point);
            } else {
                self.sphereInter.visible = false;
            }

            renderer.render(self.scene, self.camera);
        }
    }
}

export default Shoe3D;
