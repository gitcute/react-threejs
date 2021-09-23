import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
//import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";
import gltfPath from "../files/untitled.glb";
//import JSZip from "jszip";

function Three() {
  let camera, scene, renderer;

  setTimeout(() => {
    init();
    render();
  },500)

  function init() {
    const container = document.createElement("div");
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(
      450,
      window.innerWidth / window.innerHeight,
      1000,
      20000
    );
    //camera.position.set(-1.8, 0.6, 2.7);

    scene = new THREE.Scene();

    const loader = new GLTFLoader();
    loader.load(
      gltfPath,
      function (gltf) {
        console.log(gltf);

        const model = gltf.scene;
      //  model.position.set(1, 1, 0);
        //model.scale.set(0.01, 0.01, 0.01);

        model.scale.set(100,100,100);
        model.rotation.set(0,0,0);
        model.position.set(50,-10,50);
        model.castShadow=true;
        console.log(gltf.scene)
        model.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.frustumCulled = false;
            //模型阴影
            child.castShadow = true;
            //模型自发光
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map ;
        }})


        scene.add(model);
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    renderer = new THREE.WebGLRenderer({ antialias: true,exposure:2 });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 1000000;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  }

  //

  function render() {
    renderer.render(scene, camera);
  }

  return <div></div>;
}

export default Three;
