import { pickRandom } from 'mathjs';

import { Transformation } from './Transformation';

const color = 'rgba(0, 0, 0, 0.85)';

export const RenderMethod = Object.freeze({
  RANDOM: 'random',
  PROGRESSIVE: 'progressive'
});

export const ITERATION_RANGE = {
  [RenderMethod.RANDOM]: [1000, 50000],
  [RenderMethod.PROGRESSIVE]: [1, 10]
};

export function draw(context, fractal) {
  clear(context);
  let { iterations, renderMethod } = fractal.body.settings;
  const transformations = buildTransformations(fractal);
  if (transformations.length > 0) {
    iterations = fitToRange(iterations, renderMethod);
    if (renderMethod === RenderMethod.RANDOM) {
      drawRandomly(context, fractal.body.parent, transformations, iterations);
    } else {
      drawRecursively(
        context,
        fractal.body.parent,
        transformations,
        iterations
      );
    }
  }
}

function buildTransformations(fractal) {
  const { parent, children } = fractal.body;
  return children.map(child => Transformation.betweenShapes(parent, child));
}

function drawRecursively(
  context,
  shape,
  transformations,
  iterations = 7,
  count = 0
) {
  if (count === iterations) {
    drawShape(context, shape);
  } else {
    for (const transformation of transformations) {
      transformation.decorate(context, () => {
        drawRecursively(context, shape, transformations, iterations, count + 1);
      });
    }
  }
}

function drawRandomly(context, shape, transformations, iterations = 10000) {
  const { x: startX, y: startY } = shape;
  for (const [x, y] of points(iterations, transformations, startX, startY)) {
    plotPoint(context, x, y);
  }
}

function* points(iterations, transformations, startX = 0, startY = 0) {
  let [x, y] = [startX, startY];
  for (let count = 0; count < iterations; count++) {
    const transformation = pickRandom(transformations);
    [x, y] = transformation.solve(x, y);
    yield [x, y];
  }
}

function drawShape(context, shape) {
  const { x, y, width, height } = shape;
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function plotPoint(context, x, y) {
  context.fillStyle = 'black';
  context.fillRect(x, y, 1, 1);
}

function clear(context) {
  context.fillStyle = 'white';
  context.fillRect(0, 0, 1000, 1000);
}

function fitToRange(iterations, renderMethod) {
  const [min, max] = ITERATION_RANGE[renderMethod];
  if (iterations < min) {
    return min;
  } else if (iterations > max) {
    return max;
  } else {
    return iterations;
  }
}
