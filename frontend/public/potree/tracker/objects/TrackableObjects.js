import * as THREE from "../../libs/three.js/three.module.min.js";
import TrackableObject from "./TrackableObject.js";

const hashCode = function (word) {
  let hash = 0,
    i,
    chr;
  if (word.length === 0) return hash;
  for (i = 0; i < word.length; i++) {
    chr = word.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const haxColorCode = function (word) {
  let hash = hashCode(word).toString(16);
  if (hash.length < 6)
    hash = hashCode(word + 'color').toString(16);
  return parseInt(hash.slice(-6), 16);
};

function createTrackableObject(o) {
  return new TrackableObject(o.id, haxColorCode(String(o.id)))
}

export default class TrackableObjects extends THREE.Object3D {
  constructor() {
    super();
    this.objects = {};
  }

  addTrack(object) {
    const { id } = object;
    let trackableObject = this.getObject(id);
    if (!trackableObject) {
      trackableObject = createTrackableObject(object)
      this.objects[id] = trackableObject;
      this.add(trackableObject);
    }
    trackableObject.addTrack(object);
  }

  hideObject(id) {
    if (!this.hasObject(id)) return;
    const obj = this.getObject(id);
    this.remove(obj);
  }

  showObject(id) {
    if (!this.hasObject(id)) return;
    const obj = this.getObject(id);
    this.add(obj);
  }

  hasObject(id) {
    return id in this.objects;
  }

  getObject(id) {
    return this.hasObject(id) ? this.objects[id] : null;
  }
}