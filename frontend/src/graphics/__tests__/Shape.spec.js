import { Shape } from '../Shape.js';

describe('Shape', () => {
  describe('center', () => {
    it('is half width and height', () => {
      const width = 100;
      const height = 200;
      const shape = new Shape(0, 0, width, height);
      expect(shape.center.x).toEqual(width / 2);
      expect(shape.center.y).toEqual(height / 2);
    });

    it('accounts for the starting position', () => {
      const x = 100;
      const y = 100;
      const width = 100;
      const height = 200;
      const shape = new Shape(x, y, width, height);
      expect(shape.center.x).toEqual(x + width / 2);
      expect(shape.center.y).toEqual(y + height / 2);
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
    const shape = new Shape(5, 5, 10, 10, 'black');
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
      const shape = new Shape(0, 0, 10, 10, 'black');
      shape.isDragging = true;
      shape.liftMouse();
      expect(shape.isDragging).toBe(false);
    });

    it('corrects negative width and height values', () => {
      const shape = new Shape(5, 5, -10, -20, 'black');
      shape.liftMouse();
      expect(shape.width).toBeGreaterThan(0);
      expect(shape.height).toBeGreaterThan(0);
    });
  });

  describe('moveMouse', () => {
    const [x, y] = [0, 0];
    const [deltaX, deltaY] = [100, 200];
    it('moves the shape', () => {
      const shape = new Shape(x, y, 10, 10, 'black');
      shape.isDragging = true;
      shape.moveMouse(deltaX, deltaY, x + deltaX, y + deltaY, [shape]);
      expect(shape.x).toEqual(x + deltaX);
      expect(shape.y).toEqual(y + deltaY);
    });

    it('does not affect the shape if isDragging is false ', () => {
      const shape = new Shape(x, y, 10, 10, 'black');
      shape.isDragging = false;
      shape.moveMouse(deltaX, deltaY, x + deltaX, y + deltaY, [shape]);
      expect(shape.x).toEqual(x);
      expect(shape.y).toEqual(y);
    });
  });

  describe('isTouching', () => {
    const shape = new Shape(10, 10, 100, 100, 'black');
    it('returns false for positions outside the shape', () => {
      expect(shape.isTouching(0, 0)).toBe(false);
      expect(shape.isTouching(1000, 50)).toBe(false);
      expect(shape.isTouching(50, 1000)).toBe(false);
      expect(shape.isTouching(1000, 1000)).toBe(false);
    });

    it('returns true for positions inside the shape', () => {
      expect(shape.isTouching(50, 50)).toBe(true);
      expect(shape.isTouching(10, 99)).toBe(true);
    });
  });
});
