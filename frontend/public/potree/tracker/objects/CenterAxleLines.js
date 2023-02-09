import * as THREE from "../../libs/three.js/three.module.min.js";

function createAxleLine(color, direction) {
  const material = new THREE.LineBasicMaterial( { color: color, linewidth: 4 } );
  const points = [];
  points.push( new THREE.Vector3( 0, 0, 0 ) );
  points.push( direction );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  return new THREE.Line( geometry, material );
}

export class CenterAxleLines extends THREE.Object3D {
  constructor(length= 2) {
    super();

    const blue = createAxleLine(0x0000ff, new THREE.Vector3( 0, 0, length));
    const green = createAxleLine(0x00ff00, new THREE.Vector3( 0, length, 0 ));
    const red = createAxleLine(0xff0000, new THREE.Vector3( length, 0, 0 ));
    this.add(blue);
    this.add(green);
    this.add(red);
  }
}