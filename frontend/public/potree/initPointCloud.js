import * as THREE from "./libs/three.js/three.module.min.js";
import { getRoomData, getPointCloudData, getPointCloudId, getPointCloudCameraPositions, server_path } from './api.js';

const pointCloud = await getPointCloudData(getPointCloudId())
const room = await getRoomData(pointCloud.roomId);

const pointCount = ((pointCloud.pointCount ?? 0) / 1_000_000).toFixed(2);
viewer.setDescription(`Room: ${room.name} (${pointCount}M points)`);

Potree.loadPointCloud(`${server_path}/s_generated/${pointCloud.filePath}/potree/metadata.json`, "Room", function(e) {
    viewer.scene.addPointCloud(e.pointcloud);

    let material = e.pointcloud.material;
    material.size = 1;
    material.pointSizeType = Potree.PointSizeType.FIXED;

    viewer.fitToScreen();
});

const cameraPositions = await getPointCloudCameraPositions(pointCloud.filePath);
// Todo: Replace with real data
const CCTVs = ['20220120_171404.jpg', '20220120_171417.jpg']

const radToDeg = (rad) => (rad * 180)/Math.PI;

const camParams = {
    width: 1920,
    height: 1080,
    fov: 90
}

const getRollPitchYaw = (quart) => {
  let q = [...quart];
  q[1] = 0;
  q[3] = 0;
  const magY = Math.sqrt(q[0]*q[0] + q[2]*q[2]);
  q[0] /= magY;
  q[2] /= magY;
  const angY = 2*Math.acos(q[0]);

  q = [...quart];
  q[2] = 0;
  q[3] = 0;
  const magX = Math.sqrt(q[0]*q[0] + q[1]*q[1]);
  q[0] /= magX;
  q[1] /= magX;
  const angX = 2*Math.acos(q[0]);

  q = [...quart];
  q[1] = 0;
  q[2] = 0;
  const magZ = Math.sqrt(q[0]*q[0] + q[3]*q[3]);
  q[0] /= magZ;
  q[3] /= magZ;
  const angZ = 2*Math.acos(q[0]);

  return { x: angX, y: angY, z: angZ }
}

const imageParams = cameraPositions
  .split('\n')
  .filter(l => !l.startsWith('#'))
  .filter((_, i) => i !== 0 && !!_)
  .map(line => {
    const data = line.split(';');
    const name = data[0];
    const qw = parseFloat(data[1]);
    const qx = parseFloat(data[2]);
    const qy = parseFloat(data[3]);
    const qz = parseFloat(data[4]);
    const tx = parseFloat(data[5]);
    const ty = parseFloat(data[6]);
    const tz = parseFloat(data[7]);
    const width = parseInt(data[10]);
    const height = parseInt(data[11]);

    camParams.height = height;
    camParams.width = width;

    const cameraLocation = new THREE.Vector3(tx, ty, tz);
    const cameraDirection = new THREE.Quaternion(qx, qy, qz, qw);

    {
      // Camera position
      let measure = new Potree.Measure();
      measure.name = name;
      measure.closed = true;
      measure.showDistances = false;
      measure.addMarker(cameraLocation);
      viewer.scene.addMeasurement(measure);
    }
    {
      const lookDirection = new THREE.Vector3(-1,0,0).applyQuaternion(new THREE.Quaternion(qx, qy, qz, qw));
      // const lookDirection = new THREE.Vector3(1,0,0).applyQuaternion(new THREE.Quaternion(-1, 0, 0, 0)); // X
      const cameraDirectionPoint = new THREE.Vector3(tx, ty, tz).multiply(lookDirection);
      // Camera direction
      // console.log(name, new THREE.Quaternion(qx, qy, qz, qw), cameraDirectionPoint.z - cameraLocation.z)

      const material = new THREE.LineBasicMaterial( { color: 0xff00ff, linewidth: 4 } );
      const points = [];
      points.push(cameraLocation);
      points.push(cameraDirectionPoint);
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      viewer.scene.scene.add(new THREE.Line( geometry, material ));
    }

    const rot = new THREE.Euler().setFromQuaternion(cameraDirection)


    if (CCTVs.includes(name)) {
      console.log(name, radToDeg(rot.x), radToDeg(rot.y), radToDeg(rot.z));

      const { x, y, z } = getRollPitchYaw([cameraDirection.w, cameraDirection.x, cameraDirection.y, cameraDirection.z]);
      console.log(radToDeg(x), radToDeg(y), radToDeg(z))
    }

    // const { x, y, z } = getRollPitchYaw([cameraDirection.w, cameraDirection.x, cameraDirection.y, cameraDirection.z]);
    const roll = radToDeg(rot.x)
    const pitch = radToDeg(rot.z)
    const yaw = radToDeg(rot.y)

    return (
      {
          id: `/api/v1/s_images/${room.filePath}/cctv/${name}`,
          name,
          x: tx,
          y: ty,
          z: tz,
          omega: roll,
          phi: -pitch,
          kappa: yaw
      }
    )
  })
  .filter(position => CCTVs.includes(position.name));


Potree.OrientedImageLoader.loadData(camParams, imageParams, viewer).then( images => {
    viewer.scene.addOrientedImages(images);

});
