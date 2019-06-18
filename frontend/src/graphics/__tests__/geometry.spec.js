import {
  Rectangle,
  isInside,
  convertToRadians,
  convertToDegrees
} from '../geometry';

describe('Rectangle', () => {
  describe('isTouching', () => {
    const shape = new Rectangle(100, 100, 100, 100);
    it('returns false for positions outside the shape', () => {
      expect(shape.isTouching(0, 0)).toBe(false);
      expect(shape.isTouching(1000, 50)).toBe(false);
      expect(shape.isTouching(50, 1000)).toBe(false);
      expect(shape.isTouching(1000, 1000)).toBe(false);
    });

    it('returns true for positions inside the shape', () => {
      expect(shape.isTouching(75, 75)).toBe(true);
      expect(shape.isTouching(51, 99)).toBe(true);
    });
  });

  describe('topLeft', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is the origin when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.topLeft.x).toBeCloseTo(0);
      expect(shape.topLeft.y).toBeCloseTo(0);
    });

    it('becomes like upper right when rotated 90 degrees', () => {
      shape.rotation = Math.PI / 2;
      expect(shape.topLeft.x).toBeCloseTo(shape.width);
      expect(shape.topLeft.y).toBeCloseTo(0);
    });

    it('becomes like lower left when rotated -90 degrees', () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.topLeft.x).toBeCloseTo(0);
      expect(shape.topLeft.y).toBeCloseTo(shape.width);
    });
  });

  describe('top', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is above the center when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.top.x).toBeCloseTo(shape.x);
      expect(shape.top.y).toBeCloseTo(0);
    });

    it("becomes like 'right' when rotated 90 degrees", () => {
      shape.rotation = Math.PI / 2;
      expect(shape.top.x).toBeCloseTo(shape.width);
      expect(shape.top.y).toBeCloseTo(shape.y);
    });

    it("becomes like 'left' when rotated -90 degrees", () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.top.x).toBeCloseTo(0);
      expect(shape.top.y).toBeCloseTo(shape.y);
    });
  });

  describe('topRight', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is origin + width when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.topRight.x).toBeCloseTo(shape.width);
      expect(shape.topRight.y).toBeCloseTo(0);
    });

    it('becomes like bottom right when rotated 90 degrees', () => {
      shape.rotation = Math.PI / 2;
      expect(shape.topRight.x).toBeCloseTo(shape.width);
      expect(shape.topRight.y).toBeCloseTo(shape.height);
    });

    it('becomes like top left when rotated -90 degrees', () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.topRight.x).toBeCloseTo(0);
      expect(shape.topRight.y).toBeCloseTo(0);
    });
  });

  describe('right', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is to the right of the center when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.right.x).toBeCloseTo(shape.width);
      expect(shape.right.y).toBeCloseTo(shape.y);
    });

    it("becomes like 'bottom' when rotated 90 degrees", () => {
      shape.rotation = Math.PI / 2;
      expect(shape.right.x).toBeCloseTo(shape.x);
      expect(shape.right.y).toBeCloseTo(shape.height);
    });

    it("becomes like 'top' when rotated -90 degrees", () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.right.x).toBeCloseTo(shape.x);
      expect(shape.right.y).toBeCloseTo(0);
    });
  });

  describe('bottomRight', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is width/height when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.bottomRight.x).toBeCloseTo(shape.width);
      expect(shape.bottomRight.y).toBeCloseTo(shape.height);
    });

    it('becomes like bottom left when rotated 90 degrees', () => {
      shape.rotation = Math.PI / 2;
      expect(shape.bottomRight.x).toBeCloseTo(0);
      expect(shape.bottomRight.y).toBeCloseTo(shape.height);
    });

    it('becomes like top right when rotated -90 degrees', () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.bottomRight.x).toBeCloseTo(shape.width);
      expect(shape.bottomRight.y).toBeCloseTo(0);
    });
  });

  describe('bottom', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is below the center when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.bottom.x).toBeCloseTo(shape.x);
      expect(shape.bottom.y).toBeCloseTo(shape.height);
    });

    it("becomes like 'left' when rotated 90 degrees", () => {
      shape.rotation = Math.PI / 2;
      expect(shape.bottom.x).toBeCloseTo(0);
      expect(shape.bottom.y).toBeCloseTo(shape.y);
    });

    it("becomes like 'right' when rotated -90 degrees", () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.bottom.x).toBeCloseTo(shape.width);
      expect(shape.bottom.y).toBeCloseTo(shape.y);
    });
  });

  describe('bottomLeft', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is origin + height when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.bottomLeft.x).toBeCloseTo(0);
      expect(shape.bottomLeft.y).toBeCloseTo(shape.height);
    });

    it('becomes like top left when rotated 90 degrees', () => {
      shape.rotation = Math.PI / 2;
      expect(shape.bottomLeft.x).toBeCloseTo(0);
      expect(shape.bottomLeft.y).toBeCloseTo(0);
    });

    it('becomes like bottom right when rotated -90 degrees', () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.bottomLeft.x).toBeCloseTo(shape.width);
      expect(shape.bottomLeft.y).toBeCloseTo(shape.height);
    });
  });

  describe('left', () => {
    const shape = new Rectangle(5, 5, 10, 10);
    it('is to the left of the center when the shape is not rotated', () => {
      shape.rotation = 0;
      expect(shape.left.x).toBeCloseTo(0);
      expect(shape.left.y).toBeCloseTo(shape.y);
    });

    it("becomes like 'top' when rotated 90 degrees", () => {
      shape.rotation = Math.PI / 2;
      expect(shape.left.x).toBeCloseTo(shape.x);
      expect(shape.left.y).toBeCloseTo(0);
    });

    it("becomes like 'bottom' when rotated -90 degrees", () => {
      shape.rotation = -(Math.PI / 2);
      expect(shape.left.x).toBeCloseTo(shape.x);
      expect(shape.left.y).toBeCloseTo(shape.height);
    });
  });
});

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

  const rotatedRectangle = {
    topLeft: { x: 3, y: 4 },
    topRight: { x: 10, y: 2 },
    bottomLeft: { x: 5, y: 8 },
    bottomRight: { x: 12, y: 6 }
  };

  it('finds points within a rotated shape', () => {
    expect(isInside({ x: 5, y: 6 }, rotatedRectangle)).toBe(true);
    expect(isInside({ x: 8, y: 5 }, rotatedRectangle)).toBe(true);
  });

  it('finds points outside a rotated shape', () => {
    expect(isInside({ x: 4, y: 2 }, rotatedRectangle)).toBe(false);
    expect(isInside({ x: 4, y: 7 }, rotatedRectangle)).toBe(false);
  });
});

describe('convertToRadians', () => {
  it('should return zero radians for zero degrees', () => {
    expect(convertToRadians(0)).toEqual(0);
  });

  it('should return π/2 for 90 degrees', () => {
    expect(convertToRadians(90)).toEqual(Math.PI / 2);
  });

  it('should return π for 180 degrees', () => {
    expect(convertToRadians(180)).toEqual(Math.PI);
  });

  it('should be reversed with convertToDegrees', () => {
    expect(convertToDegrees(convertToRadians(0))).toEqual(0);
    expect(convertToDegrees(convertToRadians(10))).toEqual(10);
    expect(convertToDegrees(convertToRadians(90))).toEqual(90);
    expect(convertToDegrees(convertToRadians(103))).toEqual(103);
  });
});

describe('convertToDegrees', () => {
  it('should return zero degrees for zero radians', () => {
    expect(convertToDegrees(0)).toEqual(0);
  });

  it('should return 90 degrees for π/2', () => {
    expect(convertToDegrees(Math.PI / 2)).toEqual(90);
  });

  it('should return 180 degrees for π', () => {
    expect(convertToDegrees(Math.PI)).toEqual(180);
  });

  it('should be reversed with convertToRadians', () => {
    expect(convertToRadians(convertToDegrees(0))).toEqual(0);
    expect(convertToRadians(convertToDegrees(Math.PI * 0.14))).toEqual(
      Math.PI * 0.14
    );
    expect(convertToRadians(convertToDegrees(Math.PI))).toEqual(Math.PI);
    expect(convertToRadians(convertToDegrees(Math.PI * 2.5))).toEqual(
      Math.PI * 2.5
    );
  });
});
