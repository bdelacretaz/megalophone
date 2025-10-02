export default class Synth {
  #oscillators = [];
  #filter;
  #ctx;

  constructor(ctx) {

    this.#ctx = ctx;

    const filter = new BiquadFilterNode(ctx);
    this.#filter = filter;
    const gain = new GainNode(ctx);

    const lfo = new OscillatorNode(ctx);
    lfo.type = 'sawtooth';
    lfo.frequency.value = 5;
    lfo.start();
    const lfoGain = new GainNode(ctx);
    lfoGain.gain.value = 100;
    filter.frequency.value = 1800;
    filter.Q.value = 0.2;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    gain.connect(filter);
    filter.connect(ctx.destination);

    for (let i = 1; i < 3; i++) {
      const osc = new OscillatorNode(ctx);
      this.#oscillators.push(osc);
      osc.type = i % 2 == 0 ? 'square': 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.detune.value = 2 * i;
      osc.start();
      osc.connect(gain);
    }
  }

  setFilterFreq(freq) {
    this.#filter.frequency.value = Number(freq);
  }

  async play(freq, duration) {
    await this.#ctx.resume();
    this.#oscillators.forEach(osc => {
      osc.frequency.setValueAtTime(freq, this.#ctx.currentTime);
      // hack - need an envelope
      osc.frequency.setValueAtTime(50000, this.#ctx.currentTime + duration);
    });
  }
}