import React,{ useState, useEffect } from "react";
import * as THREE from "three";
import _ from "lodash";

function init() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  let content = document.getElementById("threeObj");
  content.appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  let render = function (){
    requestAnimationFrame(render);

   // cube.rotation.x += 0.1;
  //  cube.rotation.y += 0.1;
  
    renderer.render(scene, camera);
  }

  render();
}

function Test() {
 // const [state, setstate] = useState(initialState);
  useEffect(() =>{
    init();
})
  return (
    <div>
      <div id="threeObj"></div>
    </div>
  );
}

export default Test;
