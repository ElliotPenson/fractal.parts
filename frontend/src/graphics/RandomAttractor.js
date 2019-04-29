import { pickRandom } from 'mathjs';

import { Attractor } from './Attractor';
import { repeat } from './utilities';

export class RandomAttractor extends Attractor {
  draw(template, iterations = 50000) {
    this.clear();
    const { x: startX, y: startY } = template.base;
    const transformations = template.export();
    for (const [x, y] of points(iterations, transformations, startX, startY)) {
      this.plotPoint(x, y);
    }
  }

  clear() {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  plotPoint(x, y) {
    this.context.fillStyle = 'black';
    this.context.fillRect(x, y, 1, 1);
  }
}

function* points(iterations, transformations, startX = 0, startY = 0) {
  let [x, y] = [startX, startY];
  if (transformations && transformations.length) {
    for (let count = 0; count < iterations; count++) {
      const transformation = pickRandom(transformations);
      yield transformation.solve(x, y);
    }
  }
}
