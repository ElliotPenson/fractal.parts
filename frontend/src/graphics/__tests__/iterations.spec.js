import { findIterations, countShapes } from '../iterations';

describe('findIterations', () => {
  it('returns transformations when below 2', () => {
    expect(findIterations(0)).toBe(0);
    expect(findIterations(1)).toBe(1);
  });

  it('ensure the number of shapes rendered will be less than shapes', () => {
    const shapes = 100;
    const transformations = 3;
    const iterations = findIterations(transformations, shapes);
    expect(shapes).toBeGreaterThanOrEqual(
      countShapes(transformations, iterations)
    );
  });
});

describe('countShapes', () => {
  it('returns 1 when iterations is 0', () => {
    expect(countShapes(0, 0)).toBe(1);
    expect(countShapes(1, 0)).toBe(1);
    expect(countShapes(2, 0)).toBe(1);
  });

  it('returns the number of transformations when iterations is 1', () => {
    const transformations = 3;
    expect(countShapes(transformations, 1)).toBe(transformations);
  });

  it('is proportional to transformations', () => {
    let transformations = 5;
    expect(countShapes(transformations, 2)).toBeLessThan(
      countShapes(transformations, 5)
    );
  });

  it('is proportional to iterations', () => {
    let iterations = 5;
    expect(countShapes(2, iterations)).toBeLessThan(countShapes(5, iterations));
  });
});
