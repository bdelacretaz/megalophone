export default class Synth {
  #oscillators = [];
  #ctx;

  constructor(ctx) {

    this.#ctx = ctx;
    for (let i = 1; i < 6; i++) {
      const osc = new OscillatorNode(ctx);
      this.#oscillators.push(osc);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.detune.value = 0.2*i;

      const filter = new BiquadFilterNode(ctx);
      const gain = new GainNode(ctx);

      const lfo = new OscillatorNode(ctx);
      lfo.type = 'sawtooth';
      lfo.frequency.value = 5;
      lfo.start();
      const lfoGain = new GainNode(ctx);
      lfoGain.gain.value = 100;
      filter.frequency.value = 2500;
      filter.Q.value = 2;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.Q);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(ctx.destination);
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