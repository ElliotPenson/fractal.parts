import { isInside } from '../geometry';

describe('isInside', () => {
  const shape = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: 10, y: 0 },
    bottomLeft: { x: 0, y: 10 },
    bottomRight: { x: 10, y: 10 }
  };

  it('finds points within a shape', () => {
    expect(isInside({ x: 5, y: 5 }, shape)).toBe(true);
  });

  it("finds points on the shape's edge", () => {
    expect(isInside({ x: 10, y: 0 }, shape)).toBe(true);
  });

  it('finds points outside a shape', () => {
    expect(isInside({ x: 100, y: 5 }, shape)).toBe(false);
    expect(isInside({ x: 5, y: 100 }, shape)).toBe(false);
    expect(isInside({ x: 100, y: 100 }, shape)).toBe(false);
  });

  const rotatedShape = {
    topLeft: { x: 3, y: 4 },
    topRight: { x: 10, y: 2 },
    bottomLeft: { x: 5, y: 8 },
    bottomRight: { x: 12, y: 6 }
  };

  it('finds points within a rotated shape', () => {
    expect(isInside({ x: 5, y: 6 }, rotatedShape)).toBe(true);
    expect(isInside({ x: 8, y: 5 }, rotatedShape)).toBe(true);
  });

  it('finds points outside a rotated shape', () => {
    expect(isInside({ x: 4, y: 2 }, rotatedShape)).toBe(false);
    expect(isInside({ x: 4, y: 7 }, rotatedShape)).toBe(false);
  });
});
