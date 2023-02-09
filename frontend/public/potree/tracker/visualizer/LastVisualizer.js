import Visualizer, {unique} from "./Visulizer.js";

export default class LastVisualizer extends Visualizer {

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
      hiddenTracks.forEach(ht => trackObj.remove(ht));

      const currentTracks = tracks.filter(t => t.raw.time <= time)
        .sort((t1, t2) => t2.raw.time - t1.raw.time);

      for (let i = 0; i < currentTracks.length; i++) {
        if (i === 0) {
          trackObj.add(currentTracks[i])
          continue;
        }
        trackObj.remove(currentTracks[i])
      }
    }
  }
}