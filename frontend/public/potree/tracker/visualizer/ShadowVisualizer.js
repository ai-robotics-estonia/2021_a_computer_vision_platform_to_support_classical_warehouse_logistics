import Visualizer, { unique } from "./Visulizer.js";

export default class ShadowVisualizer extends Visualizer {

  static shadowTrail(tracks) {
    let t = 0;
    for (let i = tracks.length - 1; i >= 0; i--) {
      tracks[i].setOpacity(1 - t * 0.2)
      t += 1;
    }
  }

  _visualize(tracker, time) {
    const objects = tracker.getObjects();
    const beenObjects = tracker.beenObjects(time);
    const beenObjectIds = unique(beenObjects.map(o => o.id));
    const allObjectIds = unique(objects.map(o => o.id));
    const hide = allObjectIds.filter(o => !beenObjectIds.includes(o));

    for (const id of hide)
      this.trackabeObjects.hideObject(id);
    for (const id of beenObjectIds) {
      this.trackabeObjects.showObject(id);
      const trackObj = this.trackabeObjects.getObject(id);
      const tracks = trackObj.getTracks();
      const hiddenTracks = tracks.filter(t => t.raw.time > time);
      const shadowTracks = tracks.filter(t => t.raw.time <= time);
      hiddenTracks.forEach(ht => trackObj.remove(ht));
      shadowTracks.forEach(ht => trackObj.add(ht));
      ShadowVisualizer.shadowTrail(shadowTracks);
    }
  }
}