import {
  moveToOrigin,
  resizeToCanvas,
  setIterations,
  scale,
  shift
} from '../standardization';
import { RenderMethod } from '../attractor';

describe('standardize', () => {
  it('moves and resizes the fractal', () => {
    // TODO
  });
});

describe('moveToOrigin', () => {
  it('does not change any shapes if already at the origin', () => {
    const fractal = {
      parent: { x: 0, y: 0, width: 100, height: 100 },
      children: [
        { x: 10, y: 10, width: 50, height: 50 },
        { x: 10, y: 0, width: 50, height: 50 }
      ]
    };
    expect(moveToOrigin(fractal)).toEqual(fractal);
  });

  it('sets the parent x/y to 0/0', () => {
    const fractal = {
      parent: { x: 10, y: 20, width: 100, height: 100 },
      children: []
    };
    const newFractal = moveToOrigin(fractal);
    expect(newFractal.parent.x).toBe(0);
    expect(newFractal.parent.y).toBe(0);
  });

  it('moves the children the same distance as the parent', () => {
    const fractal = {
      parent: { x: 10, y: 20, width: 100, height: 100 },
      children: [{ x: 30, y: 30, width: 50, height: 50 }]
    };
    const newFractal = moveToOrigin(fractal);
    expect(newFractal.children[0].x).toBe(20);
    expect(newFractal.children[0].y).toBe(10);
  });
});

describe('resizeToCanvas', () => {
  const canvas = { width: 10, height: 10 };
  const children = [];
  it('reduces width when too large for a canvas', () => {
    const fractal = { parent: { x: 0, y: 0, width: 20, height: 10 }, children };
    const newFractal = resizeToCanvas(fractal, canvas);
    expect(newFractal.parent.width).toBe(canvas.width);
    expect(newFractal.parent.height).toBe(5);
  });

  it('reduces height when too large for a canvas', () => {
    const fractal = { parent: { x: 0, y: 0, width: 10, height: 20 }, children };
    const newFractal = resizeToCanvas(fractal, canvas);
    expect(newFractal.parent.width).toBe(5);
    expect(newFractal.parent.height).toBe(canvas.height);
  });

  it('increases width when too small for a canvas', () => {
    const fractal = { parent: { x: 0, y: 0, width: 5, height: 2 }, children };
    const newFractal = resizeToCanvas(fractal, canvas);
    expect(newFractal.parent.width).toBe(canvas.width);
    expect(newFractal.parent.height).toBe(4);
  });

  it('increases height when too small for a canvas', () => {
    const fractal = { parent: { x: 0, y: 0, width: 2, height: 5 }, children };
    const newFractal = resizeToCanvas(fractal, canvas);
    expect(newFractal.parent.width).toBe(4);
    expect(newFractal.parent.height).toBe(canvas.height);
  });

  it('also adjust children x, y, width, and height', () => {
    const fractal = {
      parent: { x: 0, y: 0, width: 5, height: 5 },
      children: [{ x: 5, y: 10, width: 1, height: 2 }]
    };
    const newFractal = resizeToCanvas(fractal, canvas);
    expect(newFractal.children[0].x).toBe(10);
    expect(newFractal.children[0].y).toBe(20);
    expect(newFractal.children[0].width).toBe(2);
    expect(newFractal.children[0].height).toBe(4);
  });
});

describe('setIterations', () => {
  it('constrains all render methods', () => {
    for (const method in RenderMethod) {
      const renderMethod = RenderMethod[method];
      const fractal = { settings: { iterations: 1000000000, renderMethod } };
      const newFractal = setIterations(fractal);
      expect(newFractal.settings.iterations).toBeLessThan(
        fractal.settings.iterations
      );
    }
  });
});

describe('scale', () => {
  const shape = { x: 1, y: 2, width: 3, height: 4 };
  it('does not change the shape when given a factor of 1', () => {
    expect(scale(shape, 1)).toEqual(shape);
  });

  it('multiplies x, y, width, and height by the factor', () => {
    const factor = 3;
    const newShape = scale(shape, factor);
    expect(newShape.x).toEqual(shape.x * factor);
    expect(newShape.y).toEqual(shape.y * factor);
    expect(newShape.width).toEqual(shape.width * factor);
    expect(newShape.height).toEqual(shape.height * factor);
  });
});

describe('shift', () => {
  const shape = { x: 1, y: 2, width: 3, height: 4 };
  it('does not change the shape when given 0/0', () => {
    expect(shift(shape, 0, 0)).toEqual(shape);
  });

  it('adds the given deltas', () => {
    const [dx, dy] = [10, 20];
    const newShape = shift(shape, dx, dy);
    expect(newShape.x).toEqual(shape.x + dx);
    expect(newShape.y).toEqual(shape.y + dy);
  });
});
