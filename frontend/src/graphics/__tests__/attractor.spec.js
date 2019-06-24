import { points } from '../attractor.js';
import { Transformation, translate } from '../Transformation.js';

describe('points', () => {
  it('generates no points when given zero iterations', () => {
    expect(Array.from(points(0, []))).toEqual([]);
    expect(Array.from(points(0, [Transformation.identity()]))).toEqual([]);
  });

  it('repeats the same point when given the identity matrix', () => {
    const initialPoint = [1, 2];
    const iterable = points(10, [Transformation.identity()], ...initialPoint);
    for (const point of iterable) {
      expect(point).toEqual(initialPoint);
    }
  });

  it('successively applies the transformation matrix', () => {
    const expected = [[5, 10], [10, 20], [15, 30], [20, 40], [25, 50]];
    const iterable = points(expected.length, [translate(5, 10)]);
    for (const point of expected) {
      expect(point).toEqual(iterable.next().value);
    }
  });
});
