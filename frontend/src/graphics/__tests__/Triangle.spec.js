import { Triangle } from '../Triangle';

const context = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  fill: jest.fn()
};

describe('Triangle', () => {
  describe('drawBody', () => {
    it('creates a path', () => {
      const triangle = new Triangle(0, 0, 10, 10);
      triangle.drawBody(context);
      expect(context.beginPath).toHaveBeenCalled();
    });

    it('sets the color', () => {
      const color = 'red';
      const triangle = new Triangle(0, 0, 10, 10, color);
      triangle.drawBody(context);
      expect(context.fillStyle).toEqual(color);
    });
  });

  describe('clone', () => {
    it('duplicates properties', () => {
      const triangle = new Triangle(0, 1, 2, 3, 'color', 4);
      const copy = triangle.clone();
      expect(triangle.x).toEqual(copy.x);
      expect(triangle.y).toEqual(copy.y);
      expect(triangle.width).toEqual(copy.width);
      expect(triangle.height).toEqual(copy.height);
      expect(triangle.color).toEqual(copy.color);
      expect(triangle.rotation).toEqual(copy.rotation);
    });
  });
});
