import * as THREE from "../../libs/three.js/three.module.min.js";
import { materialTraverse } from "../../potreeUtils.js";

function createBoundingBox(
  x1,
  y1,
  z1,
  x2,
  y2,
  z2,
  color) {
  const material = new THREE.LineBasicMaterial( { color: color, linewidth: 1 } );

  const points1 = [];
  points1.push( new THREE.Vector3( x1, y1, z1 ) );
  points1.push( new THREE.Vector3( x2, y1, z1 ) );
  points1.push( new THREE.Vector3( x2, y1, z2 ) );
  points1.push( new THREE.Vector3( x1, y1, z2 ) );
  points1.push( new THREE.Vector3( x1, y1, z1 ) );
  points1.push( new THREE.Vector3( x1, y2, z1 ) );
  points1.push( new THREE.Vector3( x1, y2, z2 ) );
  points1.push( new THREE.Vector3( x1, y1, z2 ) );

  const geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
  const line1 = new THREE.Line( geometry1, material );

  const points2 = [];
  points2.push( new THREE.Vector3( x2, y2, z2 ) );
  points2.push( new THREE.Vector3( x2, y1, z2 ) );
  points2.push( new THREE.Vector3( x2, y1, z1 ) );
  points2.push( new THREE.Vector3( x2, y2, z1 ) );
  points2.push( new THREE.Vector3( x2, y2, z2 ) );
  points2.push( new THREE.Vector3( x1, y2, z2 ) );
  points2.push( new THREE.Vector3( x1, y2, z1 ) );
  points2.push( new THREE.Vector3( x2, y2, z1 ) );
  const geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
  const line2 = new THREE.Line( geometry2, material );
  const object = new THREE.Object3D();

  object.add(line1);
  object.add(line2);
  return object;
}

function createCorner(x, y, z, color) {
  const sphere = new THREE.SphereBufferGeometry(0.02, 10, 10);
  let sphereMaterial = new THREE.MeshBasicMaterial({
    color: color
  });
  const corner = new THREE.Mesh(sphere, sphereMaterial);
  corner.position.set(x, y, z);
  return corner;
}

function createCore(x, y, z, color) {
  const sphere = new THREE.SphereBufferGeometry(0.05, 10, 10);
  let sphereMaterial = new THREE.MeshBasicMaterial({
    color: color
  });
  const corner = new THREE.Mesh(sphere, sphereMaterial);
  corner.position.set(x, y, z);
  return corner;
}

function createCorners(x1, y1, z1, x2, y2, z2, color) {
  const c1 = createCorner(x1, y1, z1, color);
  const c2 = createCorner(x1, y1, z2, color);
  const c3 = createCorner(x1, y2, z1, color);
  const c4 = createCorner(x1, y2, z2, color);
  const c5 = createCorner(x2, y1, z1, color);
  const c6 = createCorner(x2, y1, z2, color);
  const c7 = createCorner(x2, y2, z1, color);
  const c8 = createCorner(x2, y2, z2, color);
  return [c1, c2, c3, c4, c5, c6, c7, c8]
}

class Track extends THREE.Object3D {
  constructor(x, y, z, x1, y1, z1, x2, y2, z2, color) {
    super();
    this.color = color;

    this.bb = createBoundingBox(x1, y1, z1, x2, y2, z2, this.color);
    this.corners = createCorners(x1, y1, z1, x2, y2, z2, this.color);
    this.center = createCore(x, y, z, this.color);

    const mouseover = () => this.setColor(0xffffff);
    const mouseleave = () => this.setColor(this.color);

    this.center.addEventListener('mouseover', mouseover);
    this.center.addEventListener('mouseleave', mouseleave);

    for (const c of this.corners) this.add(c);
    this.add(this.bb);
    this.add(this.center);
  }

  setColor(color) {
    for (const material of this.getMaterials())
      material.color.setHex(color);
  }

  setOpacity(opacity) {
    for (const material of this.getMaterials()) {
      material.opacity = opacity;
      material.transparent = opacity < 1;
    }
  }

  getMaterials() {
    return materialTraverse(this);
  }
}

export default Track;