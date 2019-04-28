import { getContext } from './utilities';

export class Attractor {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = getContext(canvas);
  }

  draw() {
    throw new Error('Not implemented');
  }
}
