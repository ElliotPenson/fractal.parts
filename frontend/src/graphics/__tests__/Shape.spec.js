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
      const shape = new Shape(0, 1, 2, 3, 'color', 4);
      const copy = shape.clone();
      expect(shape.x).toEqual(shape.x);
      expect(shape.y).toEqual(shape.y);
      expect(shape.width).toEqual(shape.width);
      expect(shape.height).toEqual(shape.height);
      expect(shape.color).toEqual(shape.color);
      expect(shape.rotation).toEqual(shape.rotation);
    });
  });
});
