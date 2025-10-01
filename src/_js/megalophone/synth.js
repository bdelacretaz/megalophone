export default class Synth {
  #oscillators = [];
  #ctx;

  constructor(ctx) {

    this.#ctx = ctx;
    for (let i = 1; i < 4; i++) {
      const osc = new OscillatorNode(ctx);
      this.#oscillators.push(osc);
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.detune.value = 0.5*i;
      osc.connect(ctx.destination);

      /*
      const filter = new BiquadFilterNode(ctx);
      const gain = new GainNode(ctx);
      gain.gain.value = 1;
      osc.connect(gain);
      gain.connect(filter);
      filter.connect(ctx.destination);
      */
    }
  }

  play(freq, duration) {
    this.#oscillators.forEach(osc => {
      osc.frequency.setValueAtTime(freq, this.#ctx.currentTime);
      osc.start(this.#ctx.currentTime);
      osc.stop(this.#ctx.currentTime + duration);
    });
  }
}