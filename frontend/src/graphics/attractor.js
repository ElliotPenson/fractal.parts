import { pickRandom } from 'mathjs';

import { Transformation } from './Transformation';
import { getContext } from './utilities';

const color = 'rgba(0, 0, 0, 0.85)';

export function draw(canvas, fractal, random = false) {
  const context = getContext(canvas);
  const transformations = buildTransformations(fractal);
  if (random) {
    drawRandomly(context, fractal.parent, transformations);
  } else {
    drawRecursively(context, fractal.parent, transformations);
  }
}

function buildTransformations(fractal) {
  const { parent, children } = fractal;
  return children.map(child => Transformation.betweenShapes(parent, child));
}

function drawRecursively(
  context,
  shape,
  transformations,
  iterations = 6,
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
