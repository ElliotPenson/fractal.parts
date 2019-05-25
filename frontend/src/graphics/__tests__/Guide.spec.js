import { inferGuides, findClosest, xRange, yRange } from '../Guide';
import { Shape } from '../Shape';

describe('inferGuides', () => {
  it('does not return guides when no shape is being dragged', () => {
    const shapes = [new Shape(0, 0, 10, 10), new Shape(20, 20, 30, 30)];
    expect(inferGuides(shapes)).toEqual([]);
  });

  it('does not return guides for shapes with no matching axes', () => {
    const shapes = [new Shape(0, 0, 100, 100), new Shape(200, 200, 300, 300)];
    shapes[0].isDragging = true;
    expect(inferGuides(shapes)).toEqual([]);
  });

  it('builds guides on the x-axis', () => {
    const shapes = [new Shape(0, 0, 15, 15), new Shape(15, 0, 15, 15)];
    shapes[0].isDragging = true;
    expect(inferGuides(shapes).length).toBeGreaterThan(0);
  });

  it('builds guides on the x-axis', () => {
    const shapes = [new Shape(0, 0, 15, 15), new Shape(0, 15, 15, 15)];
    shapes[0].isDragging = true;
    expect(inferGuides(shapes).length).toBeGreaterThan(0);
  });
});

describe('findClosest', () => {
  it('returns an empty array when given no guides', () => {
    expect(findClosest([])).toEqual([]);
  });

  it('calculates the guide with the smallest displacement', () => {
    const closest = { displacement: 10 };
    const others = [{ displacement: 100 }, { displacement: -1000 }];
    expect(findClosest([closest, ...others])).toEqual([closest]);
  });

  it('gives more than one guide on a tie', () => {
    const closest = [{ displacement: 10 }, { displacement: 10 }];
    const others = [{ displacement: 100 }, { displacement: 1000 }];
    expect(findClosest([...closest, ...others])).toEqual(closest);
  });

  it('does not return guides in opposite directions', () => {
    const guides = [
      { displacement: 10 },
      { displacement: -10 },
      { displacement: 100 },
      { displacement: 1000 }
    ];
    expect(findClosest(guides)).toHaveLength(1);
  });
});

describe('xRange', () => {
  it('returns an empty array when no shapes are given', () => {
    expect(xRange()).toEqual([]);
  });

  it('calculates the left, center, and right coordinates of a shape', () => {
    const shape = new Shape(0, 1, 2, 3);
    expect(xRange(shape)).toEqual(expect.arrayContaining([0, 1, 2]));
  });

  it('accepts multiple shapes', () => {
    const shapes = [
      new Shape(0, 1, 2, 3),
      new Shape(0, 1, 2, 3),
      new Shape(0, 1, 2, 3)
    ];
    expect(xRange(...shapes)).toHaveLength(shapes.length * 3);
  });
});

describe('yRange', () => {
  it('returns an empty array when no shapes are given', () => {
    expect(yRange()).toEqual([]);
  });

  it('calculates the top, center, and bottom coordinates of a shape', () => {
    const shape = new Shape(0, 1, 2, 4);
    expect(yRange(shape)).toEqual(expect.arrayContaining([1, 3, 5]));
  });

  it('accepts multiple shapes', () => {
    const shapes = [
      new Shape(0, 1, 2, 3),
      new Shape(0, 1, 2, 3),
      new Shape(0, 1, 2, 3)
    ];
    expect(yRange(...shapes)).toHaveLength(shapes.length * 3);
  });
});
