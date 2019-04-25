import { Template } from '../Template.js';
import { Rectangle } from '../Rectangle.js';

const canvas = {};
const context = { fillRect: jest.fn() };

describe('Template', () => {
  describe('add', () => {
    it('increases the number of shapes', () => {
      const template = new Template(canvas, context);
      expect(template.shapes).toHaveLength(0);
      template.add(new Rectangle());
      expect(template.shapes).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('removes the focused shape', () => {
      const template = new Template(canvas, context);
      template.add(new Rectangle(0, 0, 100, 100));
      expect(template.shapes).toHaveLength(1);
      template.pressMouse(50, 50);
      template.delete();
      expect(template.shapes).toHaveLength(0);
    });

    it('does nothing if no shape is focused', () => {
      const template = new Template(canvas, context);
      template.add(new Rectangle(0, 0, 100, 100));
      expect(template.shapes).toHaveLength(1);
      template.delete();
      expect(template.shapes).toHaveLength(1);
    });
  });

  describe('draw', () => {
    it("calls each shape's draw function", () => {
      const template = new Template(canvas, context);
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
      const template = new Template(canvas, context);
      const shapes = [
        new Rectangle(0, 0, 10, 10),
        new Rectangle(20, 20, 100, 100),
        new Rectangle(200, 100, 2, 3)
      ];
      shapes.forEach(shape => template.add(shape));
      expect(template.shapes).toHaveLength(shapes.length);
      template.pressMouse(5, 5);
      template.copy();
      template.paste();
      expect(template.shapes).toHaveLength(shapes.length + 1);
    });
  });
});
