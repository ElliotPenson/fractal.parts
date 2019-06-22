import { round, floor } from 'mathjs';

export class Path {
  constructor(shouldCorrect = true, lineWidth = 1) {
    this.shouldCorrect = shouldCorrect;
    this.lineWidth = lineWidth;
    this.path = new Path2D();
  }

  moveTo(x, y) {
    if (this.shouldCorrect) {
      [x, y] = correct(x, y, this.lineWidth);
    }
    this.path.moveTo(x, y);
  }

  lineTo(x, y) {
    if (this.shouldCorrect) {
      [x, y] = correct(x, y, this.lineWidth);
    }
    this.path.lineTo(x, y);
  }

  fill(context) {
    context.fill(this.path);
  }

  stroke(context) {
    context.lineWidth = this.lineWidth;
    context.stroke(this.path);
  }
}

/**
 * Ensure crisp lines by correcting pixels according to line width. Paths with
 * halfway pixels become a blurry approximation.
 */
export function correct(x, y, lineWidth) {
  if (isEven(lineWidth)) {
    return [round(x), round(y)];
  } else {
    return [floor(x) + 0.5, floor(y) + 0.5];
  }
}

function isEven(number) {
  return number % 2 === 0;
}
