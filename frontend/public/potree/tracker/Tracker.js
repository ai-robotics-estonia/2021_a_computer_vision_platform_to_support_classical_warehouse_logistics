export default class Tracker {

  constructor() {
    this.objects = []
    this.updateSubscribers = [];
  }

  static parseData(rawData) {
    const firstLine = (_, i) => i !== 0;
    const emptyLine = (_) => !!_;
    return rawData.split('\n')
      .filter(l => !l.startsWith('#'))
      .filter(firstLine)
      .filter(emptyLine)
      .map(line => {
        const data = line.split(';');
        const time = parseInt(data[0]);
        const id = data[1].trim();
        const x = parseFloat(data[2]);
        const y = parseFloat(data[3]);
        const z = parseFloat(data[4]);

        const bbx1 = parseFloat(data[5]);
        const bby1 = parseFloat(data[6]);
        const bbz1 = parseFloat(data[7]);

        const bbx2 = parseFloat(data[8]);
        const bby2 = parseFloat(data[9]);
        const bbz2 = parseFloat(data[10]);

        return ({
          id,
          time,
          x,
          y,
          z,
          bbx1,
          bby1,
          bbz1,
          bbx2,
          bby2,
          bbz2,
        })
      })
  }

  loadCsv(csvStr) {
    this.setObjects(Tracker.parseData(csvStr))
  }

  setObjects(objects) {
    this.objects = objects;
    this.objects = this.objects.sort((o1, o2) => o1.time - o2.time);
    for (const sub of this.updateSubscribers)
      sub(this);
  }

  addObject(object) {
    this.objects.push(object);
    this.objects = this.objects.sort((o1, o2) => o1.time - o2.time);
    for (const sub of this.updateSubscribers)
      sub(this)
  }

  set onUpdate(f) {
    this.updateSubscribers.push(f);
  }

  getMinTime() {
    if (this.objects.length === 0) return -1;
    return this.objects.sort((o1, o2) => o1.time - o2.time)[0].time
  }

  getMaxTime() {
    if (this.objects.length === 0) return -1;
    return this.objects.sort((o1, o2) => o2.time - o1.time)[0].time
  }

  getObjects() {
    return this.objects;
  }

  beenObjects(time) {
    if (this.objects.length === 0) return [];
    return this.objects.filter((o) => o.time <= time);
  }
}