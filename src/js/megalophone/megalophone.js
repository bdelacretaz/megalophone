import Synth from './synth.js';

export default class Megalophone {
  #synth;
  constructor(ctx) {
    this.#synth = new Synth(ctx);
  }

  play(freq, duration) {
    console.log('play',freq);
    this.#synth.play(freq, duration);
  }
}