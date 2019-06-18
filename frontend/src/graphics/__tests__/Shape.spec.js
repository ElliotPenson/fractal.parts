import { Shape } from '../Shape.js';

describe('Shape', () => {
  describe('topLeft', () => {
    const shape = new Shape(5, 5, 10, 10);
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
    const shape = new Shape(5, 5, 10, 10);
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
    const shape = new Shape(5, 5, 10, 10);
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
    const shape = new Shape(5, 5, 10, 10);
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
    const shape = new Shape(5, 5, 10, 10);
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
    const shape = new Shape(5, 5, 10, 10);
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
    const shape = new Shape(5, 5, 10, 10);
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
    const shape = new Shape(5, 5, 10, 10);
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

  describe('clone', () => {
    it('duplicates properties', () => {
      const shape = new Shape(0, 1, 2, 3, 'color', 4, true);
      const copy = shape.clone();
      expect(copy.x).toEqual(shape.x);
      expect(copy.y).toEqual(shape.y);
      expect(copy.width).toEqual(shape.width);
      expect(copy.height).toEqual(shape.height);
      expect(copy.color).toEqual(shape.color);
      expect(copy.rotation).toEqual(shape.rotation);
      expect(copy.outline).toEqual(shape.outline);
    });
  });

  describe('pressMouse', () => {
    const shape = new Shape(5, 5, 10, 10);
    it('focuses the shape when the click is within bounds', () => {
      shape.pressMouse(7, 7);
      expect(shape.isFocused).toBe(true);
    });

    it('deselects the shape when the click is out of bounds', () => {
      shape.isFocused = true;
      shape.pressMouse(100, 100);
      expect(shape.isFocused).toBe(false);
    });
  });

  describe('liftMouse', () => {
    it('turns off shape dragging', () => {
      const shape = new Shape(0, 0, 10, 10);
      shape.isDragging = true;
      shape.liftMouse();
      expect(shape.isDragging).toBe(false);
    });

    it('corrects negative width and height values', () => {
      const shape = new Shape(5, 5, -10, -20);
      shape.liftMouse();
      expect(shape.width).toBeGreaterThan(0);
      expect(shape.height).toBeGreaterThan(0);
    });
  });

  describe('moveMouse', () => {
    const [x, y] = [0, 0];
    const [deltaX, deltaY] = [100, 200];
    it('moves the shape', () => {
      const shape = new Shape(x, y, 10, 10);
      shape.isDragging = true;
      shape.moveMouse(deltaX, deltaY, x + deltaX, y + deltaY, [shape]);
      expect(shape.x).toEqual(x + deltaX);
      expect(shape.y).toEqual(y + deltaY);
    });

    it('does not affect the shape if isDragging is false ', () => {
      const shape = new Shape(x, y, 10, 10);
      shape.isDragging = false;
      shape.moveMouse(deltaX, deltaY, x + deltaX, y + deltaY, [shape]);
      expect(shape.x).toEqual(x);
      expect(shape.y).toEqual(y);
    });
  });

  describe('isTouching', () => {
    const shape = new Shape(100, 100, 100, 100);
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
});
