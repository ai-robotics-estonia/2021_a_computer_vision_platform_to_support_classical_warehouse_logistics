import * as THREE from "../../libs/three.js/three.module.min.js";
import Track from "./Track.js";

class TrackableObject extends THREE.Object3D {
  constructor(id, color) {
    super();

    this.trackableId = id;
    this.color = color;
    this.tracks = [];
  }

  static guardAgainstWrongId(trackableObject, object) {
    const { id } = object;
    if (id !== undefined && id !== trackableObject.trackableId)
      throw new Error('IDs don\'t match! Track data not belong to this object!');
  }

  static hasTrackWithSameTimestamp(trackableObject, object) {
    for (const track of trackableObject.tracks)
      if (track.raw.time === object.time)
        return true;
    return false;
  }

  addTrack(object) {
    TrackableObject.guardAgainstWrongId(this, object);
    if (TrackableObject.hasTrackWithSameTimestamp(this, object))
      return;

    const { x, y, z, bbx1, bby1, bbz1, bbx2, bby2, bbz2 } = object;

    const track = new Track(x, y, z, bbx1, bby1, bbz1, bbx2, bby2, bbz2, this.color);
    track.raw = object;
    this.tracks.push(track);
    this.tracks = this.tracks.sort((a,b) => a.time - b.time);
    this.add(track);
  }

  getTracks() {
    return this.tracks;
  }
}

export default TrackableObject;