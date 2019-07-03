import { floor, log, pow } from 'mathjs';

/**
 * Number of shapes to draw in progressive fractals. Higher numbers increase
 * resolution. Lower numbers improve performance.
 */
export const numberOfShapes = 10000;

/**
 * Number of points to draw in random fractals. Higher numbers increase
 * resolution. Lower numbers improve performance.
 */
export const numberOfPoints = 50000;

/**
 * Calculate the number of iterations needed to show a particular number of
 * shapes in a progressive fractal.
 * @param {number} transformations
 * @param {number} shapes
 * @return {number}
 */
export function findIterations(transformations, shapes = numberOfShapes) {
  if (transformations < 2) {
    return transformations;
  } else {
    return floor(log(shapes) / log(transformations));
  }
}

/**
 * Determine the number of shapes that will be rendered in a progressive
 * fractal.
 * @param {number} transformations
 * @param {number} iterations
 * @return {number} transformations^iterations
 */
export function countShapes(transformations, iterations) {
  return pow(transformations, iterations);
}
