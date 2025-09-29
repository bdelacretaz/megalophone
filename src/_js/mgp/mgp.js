const mgp = {
  tickCounter: 0,
  sequence: null,
  sequenceIndex: 0,
  lastNote: -1,
  period:250,

  init() {
    console.log('mgp init', this.id);
    document.addEventListener('mgp:tick', this.onTick.bind(this));
    this.tick();
  },

  onTick(_event) {
    if (this.sequence && this.sequence.length > 0) {
      if (++this.sequenceIndex >= this.sequence.length) {
        this.sequenceIndex = 0;
      }
      const note = this.sequence[this.sequenceIndex];
      if(note.length > 0) {
        console.log('mpg note', note, this.lastNote, this.sequence);
        if (this.lastNote > 0) {
          app.synth.noteOff(this.lastNote);
        }
        app.synth.noteOn(note, 127);
        this.lastNote = note;
      }
    }
  },

  onSequenceChange(e) {
    this.sequence = e.target.value?.split(",");
    console.log('mpg sequence', this.id, this.sequence);
  },

  setupSequence(input) {
    input.addEventListener('input', (e) => {
      this.onSequenceChange(e);
    });
  },

  tick() {
    this.tickCounter++;
    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent('mgp:tick', {
          detail: { tick: this.tickCounter },
          bubbles: true,
          cancelable: true
        }));
      this.tick()
    }, this.period);
  }
}

mgp.init();