import {
  Transformation,
  compose,
  translate,
  rotate,
  scale,
  findMovement,
  findRotation,
  findScale
} from '../Transformation';
import { Rectangle } from '../geometry';

const context = {
  transform: jest.fn(),
  save: jest.fn(),
  restore: jest.fn()
};

describe('Transformation', () => {
  describe('getters', () => {
    it('returns the values given in the constructor', () => {
      const given = [10, 20, 30, 40, 50, 60];
      const transformation = new Transformation(...given);
      const found = [
        transformation.xScale,
        transformation.yScale,
        transformation.xSkew,
        transformation.ySkew,
        transformation.xMove,
        transformation.yMove
      ];
      expect(found).toEqual(given);
    });
  });

  describe('identity', () => {
    it('sets x/y scale to 1', () => {
      const transformation = Transformation.identity();
      expect(transformation.xScale).toEqual(1);
      expect(transformation.yScale).toEqual(1);
    });

    it('sets x/y skew and move to zero', () => {
      const transformation = Transformation.identity();
      expect(transformation.xSkew).toEqual(0);
      expect(transformation.ySkew).toEqual(0);
      expect(transformation.xMove).toEqual(0);
      expect(transformation.yMove).toEqual(0);
    });
  });

  describe('equal', () => {
    it('returns false for different transformations', () => {
      const transformation1 = new Transformation(10, 20, 30, 40, 50, 60);
      const transformation2 = new Transformation(1, 2, 3, 4, 5, 6);
      expect(transformation1.equals(transformation2)).toBe(false);
      expect(transformation2.equals(transformation1)).toBe(false);
    });

    it('returns true for identical transformations', () => {
      const parameters = [10, 20, 30, 40, 50, 60];
      const transformation1 = new Transformation(...parameters);
      const transformation2 = new Transformation(...parameters);
      expect(transformation1.equals(transformation2)).toBe(true);
      expect(transformation2.equals(transformation1)).toBe(true);
    });
  });

  describe('clone', () => {
    it('creates a Transformation identical to the initial Transformation', () => {
      const transformation = new Transformation(10, 20, 30, 40, 50, 60);
      expect(transformation.equals(transformation.clone())).toBeTruthy();
    });
  });

  describe('multiply', () => {
    it('ignores the identity matrix', () => {
      const transformation = new Transformation(10, 20, 30, 40, 50, 60);
      const result = transformation.multiply(Transformation.identity());
      expect(transformation.equals(result)).toBeTruthy();
    });
  });

  describe('solve', () => {
    it('ignores the identity matrix', () => {
      const transformation = Transformation.identity();
      const given = [10, 20];
      expect(transformation.solve(...given)).toEqual(given);
    });

    it("adds the transformation's movement", () => {
      const [x, y] = [1, 2];
      const [xMove, yMove] = [10, 100];
      const transformation = translate(xMove, yMove);
      expect(transformation.solve(x, y)).toEqual([x + xMove, y + yMove]);
    });

    it("multiplies the transformation's scale", () => {
      const [x, y] = [1, 2];
      const [xScale, yScale] = [5, 10];
      const transformation = scale(xScale, yScale);
      expect(transformation.solve(x, y)).toEqual([x * xScale, y * yScale]);
    });
  });

  describe('decorate', () => {
    it('calls the draw function', () => {
      const draw = jest.fn();
      const transformation = new Transformation(10, 20, 30, 40, 50, 60);
      transformation.decorate(context, draw);
      expect(draw).toHaveBeenCalled();
    });
  });
});

describe('compose', () => {
  it('ignores identity matrices', () => {
    const composition = compose(
      Transformation.identity(),
      Transformation.identity(),
      Transformation.identity()
    );
    expect(composition.equals(Transformation.identity())).toBe(true);
  });

  it('combines matrices with multiplication', () => {
    const [xMove, yMove, xScale, yScale] = [1, 2, 3, 4];
    const composition = compose(
      translate(xMove, yMove),
      scale(xScale, yScale)
    );
    const expected = new Transformation(xScale, yScale, 0, 0, xMove, yMove);
    expect(composition.equals(expected)).toBe(true);
  });
});

describe('translate', () => {
  it('creates a transformation with an xMove and yMove', () => {
    const [xMove, yMove] = [10, 100];
    const transformation = translate(xMove, yMove);
    expect(transformation.xMove).toEqual(xMove);
    expect(transformation.yMove).toEqual(yMove);
  });

  it('sets scale to 1', () => {
    const transformation = translate(2, 3);
    expect(transformation.xScale).toEqual(1);
    expect(transformation.yScale).toEqual(1);
  });
});

describe('rotate', () => {
  it('gives the identity matrix when rotation is zero', () => {
    const transformation = rotate(0);
    expect(transformation.equals(Transformation.identity())).toBe(true);
  });
});

describe('findMovement', () => {
  it('returns the identity matrix for identical shapes', () => {
    const shape = new Rectangle(50, 100, 25, 30);
    const transformation = findMovement(shape, shape.clone());
    expect(transformation.equals(Transformation.identity())).toBe(true);
  });

  it('ignores rotation', () => {
    const shape = new Rectangle(50, 100, 25, 30);
    const clone = shape.clone();
    clone.rotation = 3;
    const transformation = findMovement(shape, clone);
    expect(transformation.equals(Transformation.identity())).toBe(true);
  });

  it('captures positive movement', () => {
    const parent = new Rectangle(0, 0, 10, 10);
    const child = new Rectangle(10, 15, 10, 10);
    const transformation = findMovement(parent, child);
    expect(transformation.xMove).toEqual(10);
    expect(transformation.yMove).toEqual(15);
  });

  it('captures negative movement', () => {
    const parent = new Rectangle(100, 50, 10, 10);
    const child = new Rectangle(10, 10, 10, 10);
    const transformation = findMovement(parent, child);
    expect(transformation.xMove).toEqual(-90);
    expect(transformation.yMove).toEqual(-40);
  });
});

describe('findRotation', () => {
  it('gives the identity matrix when neither shape is rotated', () => {
    const parent = new Rectangle(0, 0, 10, 10, 0);
    const child = new Rectangle(10, 10, 20, 20, 0);
    const transformation = findRotation(parent, child);
    expect(transformation.equals(Transformation.identity())).toBe(true);
  });

  it('gives the identity matrix when shapes have the same rotation', () => {
    const rotation = 2.5;
    const parent = new Rectangle(0, 0, 10, 10, rotation);
    const child = new Rectangle(10, 10, 20, 20, rotation);
    const transformation = findRotation(parent, child);
    expect(transformation.equals(Transformation.identity())).toBe(true);
  });
});

describe('findScale', () => {
  it('returns the identity matrix for identical shapes', () => {
    const shape = new Rectangle(50, 100, 25, 30);
    const transformation = findScale(shape, shape.clone());
    expect(transformation.equals(Transformation.identity())).toBe(true);
  });
});

// describe('betweenShapes', () => {
//   it('returns the identity matrix between identical shapes', () => {
//     const shape = new Rectangle(1, 2, 3, 4);
//     const transformation = Transformation.betweenShapes(shape, shape.clone());
//     expect(transformation.equals(Transformation.identity())).toBeTruthy();
//   });

//   it('moves as a function of shape displacement', () => {
//     const parent = new Rectangle(1, 2, 1, 1);
//     const child = new Rectangle(10, 200, 1, 1);
//     const transformation = Transformation.betweenShapes(parent, child);
//     expect(transformation.xMove).toEqual(child.x - parent.x);
//     expect(transformation.yMove).toEqual(child.y - parent.y);
//   });

//   it('scales as a function of shape size', () => {
//     const parent = new Rectangle(1, 1, 1, 1);
//     const child = new Rectangle(1, 1, 10, 100);
//     const transformation = Transformation.betweenShapes(parent, child);
//     expect(transformation.xScale).toEqual(child.width / parent.width);
//     expect(transformation.yScale).toEqual(child.height / parent.height);
//   });
// });
