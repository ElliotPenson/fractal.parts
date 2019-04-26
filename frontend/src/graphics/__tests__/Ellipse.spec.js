import { Ellipse } from '../Ellipse';

const context = {
  beginPath: jest.fn(),
  ellipse: jest.fn(),
  fill: jest.fn()
};

describe('Ellipse', () => {
  describe('drawBody', () => {
    it('creates a path', () => {
      const ellipse = new Ellipse(0, 0, 10, 10);
      ellipse.drawBody(context);
      expect(context.beginPath).toHaveBeenCalled();
    });

    it('sets the color', () => {
      const color = 'red';
      const ellipse = new Ellipse(0, 0, 10, 10, color);
      ellipse.drawBody(context);
      expect(context.fillStyle).toEqual(color);
    });
  });

  describe('clone', () => {
    it('duplicates properties', () => {
      const ellipse = new Ellipse(0, 1, 2, 3, 'color', 4);
      const copy = ellipse.clone();
      expect(ellipse.x).toEqual(copy.x);
      expect(ellipse.y).toEqual(copy.y);
      expect(ellipse.width).toEqual(copy.width);
      expect(ellipse.height).toEqual(copy.height);
      expect(ellipse.color).toEqual(copy.color);
      expect(ellipse.rotation).toEqual(copy.rotation);
    });
  });
});
