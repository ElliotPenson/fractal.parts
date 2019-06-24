import { pickRandom } from 'mathjs';

import { findTransformation } from './Transformation';
import { standardize } from './standardization';

const colors = {
  attractor: 'rgba(0, 0, 0, 0.85)',
  background: 'white'
};

export const RenderMethod = {
  RANDOM: 'random',
  PROGRESSIVE: 'progressive'
};

export const ITERATION_RANGE = {
  [RenderMethod.RANDOM]: [1000, 50000],
  [RenderMethod.PROGRESSIVE]: [1, 10]
};

/**
 * Paint an attractor to the canvas using transformation matrices.
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {object} fractal
 */
export function draw(canvas, context, fractal) {
  fractal = standardize(fractal, canvas);
  const transformations = findTransformations(fractal);
  const render = getRenderer(fractal);
  render(context, transformations);
}

/**
 * Directly manipulate the canvas transformation matrix to render an attractor.
 * Draw a shape, apply each transformation, and repeat.
 * @param {Transformation[]} transformations
 */
function drawProcessively(context, shape, transformations, iterations) {
  if (iterations === 0) {
    drawShape(context, shape);
  } else {
    for (const matrix of transformations) {
      matrix.decorate(context, () => {
        drawProcessively(context, shape, transformations, iterations - 1);
      });
    }
  }
}

/**
 * Use the chaos game to render transformations. The chaos game repeatedly
 * applies a random transformation to a point to get the next point.
 * @param {Transformation[]} transformations
 */
function drawRandomly(context, shape, transformations, iterations) {
  if (transformations.length > 0) {
    for (const [x, y] of points(iterations, transformations)) {
      plotPoint(context, x, y);
    }
  }
}

/**
 * Create a unique render function for the fractal.
 * @param {object} fractal
 * @returns {(context, transformations) => void}
 */
function getRenderer(fractal) {
  return (context, transformations) => {
    const { settings, parent } = fractal;
    if (settings.renderMethod === RenderMethod.RANDOM) {
      drawRandomly(context, parent, transformations, settings.iterations);
    } else {
      drawProcessively(context, parent, transformations, settings.iterations);
    }
  };
}

/**
 * Generate random, chaos-game points.
 * @param {number} iterations
 * @param {Transformation[]} transformations
 */
export function* points(iterations, transformations, x = 0, y = 0) {
  for (let count = 0; count < iterations; count++) {
    const transformation = pickRandom(transformations);
    [x, y] = transformation.solve(x, y);
    yield [x, y];
  }
}

function findTransformations({ parent, children }) {
  return children.map(child => findTransformation(parent, child));
}

export function clear(canvas, context) {
  const { width, height } = canvas;
  context.fillStyle = colors.background;
  context.fillRect(0, 0, width, height);
}

function drawShape(context, shape) {
  const { x, y, width, height } = shape;
  context.fillStyle = colors.attractor;
  context.fillRect(x, y, width, height);
}

function plotPoint(context, x, y) {
  context.fillStyle = colors.attractor;
  context.fillRect(x, y, 1, 1);
}
