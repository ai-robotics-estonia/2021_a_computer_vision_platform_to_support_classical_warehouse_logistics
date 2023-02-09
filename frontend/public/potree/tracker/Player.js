export const PLAYER_STATE = {
  RUNNING: 'running',
  STOPPED: 'stopped'
}

export default class Player {

  constructor() {
    this.stateSubscribers = [];
    this.tickSubscribers = [];
    this.state = PLAYER_STATE.STOPPED;
    this.speed = 1;
    this.time = -1;
    this.span = 0;
    this.frequency = 1;
    this.interval = undefined;
  }

  play() {
    this.setState(PLAYER_STATE.RUNNING);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.setTime(this.getTime() + this.speed / this.frequency);
      if (this.getTime() === this.getTimeSpan()) this.pause();
    },1000 / this.frequency);
  }

  pause() {
    clearInterval(this.interval);
    this.setState(PLAYER_STATE.STOPPED);
  }

  set onTick(f) {
    this.tickSubscribers.push(f);
  }

  tick() {
    for (const sub of this.tickSubscribers)
      sub(this.getTime());
  }

  setSpeed(speed) {
    if (speed === 0) {
      console.log('Speed cannot be zero. if u need to pause use .pause()');
      return;
    }
    this.speed = speed;
  }

  setTime(n) {
    if (n < 0) n = 0;
    if (n > this.getTimeSpan()) n = this.getTimeSpan();
    this.time = n;
    this.tick();
  }

  getTime() {
    return this.time;
  }

  set onStateChange(f) {
    this.stateSubscribers.push(f);
  }

  setState(state) {
    this.state = state
    for (const subscriber of this.stateSubscribers)
      subscriber(state, this);
  }

  getState() {
    return this.state;
  }

  getFrequency() {
    return this.frequency;
  }
  getSpeed() {
    return this.speed;
  }

  setFrequency(f) {
    if (f === 0) return;
    this.frequency = f;
    if (this.getState() === PLAYER_STATE.RUNNING)
      this.play();
  }

  setTimeSpan(timespan) {
    this.span = timespan;
  }

  getTimeSpan() {
    return this.span;
  }
}