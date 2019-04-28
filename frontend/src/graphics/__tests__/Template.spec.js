import { Template } from '../Template.js';
import { Rectangle } from '../Rectangle.js';

const context = {
  fillRect: jest.fn(),
  scale: jest.fn(),
  save: jest.fn(),
  transform: jest.fn(),
  restore: jest.fn()
};
const canvas = { getContext: () => context, style: {} };

describe('Template', () => {
  describe('add', () => {
    it('increases the number of shapes', () => {
      const template = new Template(canvas);
      const before = template.shapes.length;
      template.add(new Rectangle());
      const after = template.shapes.length;
      expect(after).toBeGreaterThan(before);
    });
  });

  describe('delete', () => {
    it('removes the focused shape', () => {
      const template = new Template(canvas);
      template.add(new Rectangle(0, 0, 100, 100));
      const before = template.shapes.length;
      template.pressMouse(50, 50);
      template.delete();
      const after = template.shapes.length;
      expect(before).toBeGreaterThan(after);
    });

    it('does nothing if no shape is focused', () => {
      const template = new Template(canvas);
      template.add(new Rectangle(0, 0, 100, 100));
      const before = template.shapes.length;
      template.delete();
      const after = template.shapes.length;
      expect(before).toEqual(after);
    });
  });

  describe('draw', () => {
    it("calls each shape's draw function", () => {
      const template = new Template(canvas);
      const shapes = [
        { draw: jest.fn(), drawGuides: jest.fn() },
        { draw: jest.fn(), drawGuides: jest.fn() },
        { draw: jest.fn(), drawGuides: jest.fn() }
      ];
      shapes.forEach(shape => template.add(shape));
      template.draw();
      for (const shape of shapes) {
        expect(shape.draw).toHaveBeenCalled();
        expect(shape.drawGuides).toHaveBeenCalled();
      }
    });
  });

  describe('copy/paste', () => {
    it('adds another shape to the template', () => {
      const template = new Template(canvas);
      const shapes = [
        new Rectangle(0, 0, 10, 10),
        new Rectangle(20, 20, 100, 100),
        new Rectangle(200, 100, 2, 3)
      ];
      shapes.forEach(shape => template.add(shape));
      const before = template.shapes.length;
      template.pressMouse(5, 5);
      template.copy();
      template.paste();
      const after = template.shapes.length;
      expect(before).toBeLessThan(after);
    });
  });
});
