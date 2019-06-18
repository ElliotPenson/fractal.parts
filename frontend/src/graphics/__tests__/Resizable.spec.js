import { Resizable } from '../Resizable';

describe('Resizable', () => {
  describe('clone', () => {
    it('duplicates properties', () => {
      const shape = new Resizable(0, 1, 2, 3, 'color', 4, true);
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
    const shape = new Resizable(5, 5, 10, 10);
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
      const shape = new Resizable(0, 0, 10, 10);
      shape.isDragging = true;
      shape.liftMouse();
      expect(shape.isDragging).toBe(false);
    });

    it('corrects negative width and height values', () => {
      const shape = new Resizable(5, 5, -10, -20);
      shape.liftMouse();
      expect(shape.width).toBeGreaterThan(0);
      expect(shape.height).toBeGreaterThan(0);
    });
  });

  describe('moveMouse', () => {
    const [x, y] = [0, 0];
    const [deltaX, deltaY] = [100, 200];
    it('moves the shape', () => {
      const shape = new Resizable(x, y, 10, 10);
      shape.isDragging = true;
      shape.moveMouse(deltaX, deltaY, x + deltaX, y + deltaY, [shape]);
      expect(shape.x).toEqual(x + deltaX);
      expect(shape.y).toEqual(y + deltaY);
    });

    it('does not affect the shape if isDragging is false ', () => {
      const shape = new Resizable(x, y, 10, 10);
      shape.isDragging = false;
      shape.moveMouse(deltaX, deltaY, x + deltaX, y + deltaY, [shape]);
      expect(shape.x).toEqual(x);
      expect(shape.y).toEqual(y);
    });
  });
});
