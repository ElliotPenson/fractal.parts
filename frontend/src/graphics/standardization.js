import produce from 'immer';
import { min } from 'mathjs';

import { getCanvasSize } from './utilities';
import { ITERATION_RANGE } from './attractor';

/**
 * Users may create fractal templates of any form. This function moves,
 * resizes, and constrains fractals so they draw nicely.
 * @param {HTMLCanvasElement} canvas
 * @param {object} fractal
 */
export function standardize(fractal, canvas) {
  fractal = moveToOrigin(fractal);
  fractal = resizeToCanvas(fractal, canvas);
  fractal = constrainIterations(fractal);
  return fractal;
}

export function moveToOrigin(fractal) {
  return produce(fractal, draft => {
    const [dx, dy] = [0 - draft.parent.x, 0 - draft.parent.y];
    draft.parent = { ...draft.parent, x: 0, y: 0 };
    draft.children = draft.children.map(child => shift(child, dx, dy));
  });
}

export function resizeToCanvas(fractal, canvas) {
  return produce(fractal, draft => {
    const { width, height } = getCanvasSize(canvas);
    const factor = min(
      width / draft.parent.width,
      height / draft.parent.height
    );
    draft.parent = scale(draft.parent, factor);
    draft.children = draft.children.map(child => scale(child, factor));
  });
}

export function constrainIterations(fractal) {
  return produce(fractal, draft => {
    draft.settings.iterations = fitToRange(
      draft.settings.iterations,
      ITERATION_RANGE[draft.settings.renderMethod]
    );
  });
}

export function scale(shape, factor) {
  return produce(shape, draft => {
    draft.x *= factor;
    draft.y *= factor;
    draft.width *= factor;
    draft.height *= factor;
  });
}

export function shift(shape, dx, dy) {
  return produce(shape, draft => {
    draft.x += dx;
    draft.y += dy;
  });
}

export function fitToRange(number, [min, max]) {
  if (number == null) {
    return min;
  } else if (number < min) {
    return min;
  } else if (number > max) {
    return max;
  } else {
    return number;
  }
}
