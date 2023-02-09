class Toggle {

  constructor(onCb, offCb) {
    this.state = false;
    this.onCb = onCb;
    this.offCb = offCb;
    this.handlers = []
  }

  setToggle = (state) => {
    this.state = state;
    if (state) this.onCb();
    else this.offCb();

    for (const handler of this.handlers) {
      handler(state)
    }
  }

  toggle = (state= undefined) => {
    if (state === undefined) this.setToggle(!this.state);
    else this.setToggle(state);
  }

  addHandler = (cb) => {
    this.handlers.push(cb);
  }
}

export default Toggle;