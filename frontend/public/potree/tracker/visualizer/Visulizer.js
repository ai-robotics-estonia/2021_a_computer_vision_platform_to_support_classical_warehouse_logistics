export const unique = function (array, key='') {
  if (!key) return array.filter((o, i, s) => i === s.indexOf(o));
  return array.filter((o, i, s) => i === s.findIndex(so => so[key] === o['key']));
};

export default class Visualizer {
  constructor(trackabeObjects) {
    this.trackabeObjects = trackabeObjects;
  }

  visualize(tracker, time) {
    for (const obj of tracker.getObjects())
      this.addTrackableObject(obj);
    this._visualize(tracker, time);
  }

  _visualize(tracker, time) {
    console.log('Visualize method not implemented!');
  }

  addTrackableObject(object) {
    this.trackabeObjects.addTrack(object)
  }
}