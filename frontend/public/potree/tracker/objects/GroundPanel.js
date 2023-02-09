import * as THREE from "../../libs/three.js/three.module.min.js";

const geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
const texture = new THREE.TextureLoader().load(`${Potree.resourcePath}/textures/rectangle.png`);

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 10;
texture.repeat.y = 10;
texture.anisotropy = 16;

const material = new THREE.MeshBasicMaterial();
material.map = texture;
material.needsUpdate = false;

export default class GroundPanel extends THREE.Mesh {
  constructor() {
    super(geometry, material);
    this.scale.set(18, 18, 18)
    this.material.color.setRGB(0.8, 0.8, 0.8);
  }
}