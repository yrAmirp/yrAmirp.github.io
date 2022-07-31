import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';
import { Camera, Vector3 } from 'three';

let scene,camera,renderer;
function init () {
  let canvas = document.querySelector('.canvas');
  const loader = new GLTFLoader();
  const loaderTexture = new THREE.TextureLoader();
  //scene
  scene = new THREE.Scene();
  
  //camera
  camera = new THREE.PerspectiveCamera(2, canvas.clientWidth / canvas.clientHeight, 10, 3000);
  camera.position.set(1,1,1)


  //renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setClearColor( 0x000000, 0 ); // the default
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  canvas.appendChild(renderer.domElement);

  //orbitcontrols
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;
  controls.enabledDamping = true;
  controls.minDistance = 30;
  controls.maxDistance = 50;
  controls.minPolarAngle = Math.PI/6;
  controls.maxPolarAngle = Math.PI - Math.PI/6;
  //light
  const ambient = new THREE.AmbientLight(0xc4c4c4, 1)
  scene.add(ambient);


RectAreaLightUniformsLib.init();
{
    const rectLight = new THREE.RectAreaLight(0x434155, 2, 30, 15);
    rectLight.position.set(0,0,5)
    rectLight.rotation.y = Math.PI + Math.PI/4;
    scene.add(rectLight)
}

{
    const rectLight = new THREE.RectAreaLight(0x434155, 2, 30, 15);
    rectLight.position.set(0,0,-5)
    rectLight.rotation.y = Math.PI - Math.PI/4;
    scene.add(rectLight)
}

  //model
  loader.load('./model/scene.gltf',  
    (gltf) => {
      scene.add(gltf.scene)
    }, 
    (error) => {
      console.log(error)
    }
  )

  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
  }

  animate();  
}


init();