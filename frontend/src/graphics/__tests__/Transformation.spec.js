import { Transformation } from '../Transformation';

const context = {
  setTransform: jest.fn(),
  resetTransform: jest.fn()
};

describe('Transformation', () => {
  describe('getters', () => {
    it('should return the values given in the constructor', () => {
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

  describe('equal', () => {
    it('should return false for different transformations', () => {
      const transformation1 = new Transformation(10, 20, 30, 40, 50, 60);
      const transformation2 = new Transformation(1, 2, 3, 4, 5, 6);
      expect(transformation1.equals(transformation2)).toBeFalsy();
      expect(transformation2.equals(transformation1)).toBeFalsy();
    });

    it('should return true for identical transformations', () => {
      const parameters = [10, 20, 30, 40, 50, 60];
      const transformation1 = new Transformation(...parameters);
      const transformation2 = new Transformation(...parameters);
      expect(transformation1.equals(transformation2)).toBeTruthy();
      expect(transformation2.equals(transformation1)).toBeTruthy();
    });
  });

  describe('clone', () => {
    it('should return a transformation identical to the initial transformation', () => {
      const transformation = new Transformation(10, 20, 30, 40, 50, 60);
      expect(transformation.equals(transformation.clone())).toBeTruthy();
    });
  });

  describe('multiply', () => {
    it('should ignore the identity matrix', () => {
      const transformation = new Transformation(10, 20, 30, 40, 50, 60);
      const clone = transformation.clone();
      clone.multiply(Transformation.identity());
      expect(transformation.equals(clone)).toBeTruthy();
    });
  });

  describe('solve', () => {
    it('should ignore the identity matrix', () => {
      const transformation = Transformation.identity();
      const given = [10, 20];
      expect(transformation.solve(...given)).toEqual(given);
    });
  });

  describe('decorate', () => {
    it('should call the draw function', () => {
      const draw = jest.fn();
      const transformation = new Transformation(10, 20, 30, 40, 50, 60);
      transformation.decorate(context, draw);
      expect(draw).toHaveBeenCalled();
    });
  });

  describe('identity', () => {
    it('should set x/y scale to 1', () => {
      const transformation = Transformation.identity();
      expect(transformation.xScale).toEqual(1);
      expect(transformation.yScale).toEqual(1);
    });

    it('should x/y skew and move to zero', () => {
      const transformation = Transformation.identity();
      expect(transformation.xSkew).toEqual(0);
      expect(transformation.ySkew).toEqual(0);
      expect(transformation.xMove).toEqual(0);
      expect(transformation.yMove).toEqual(0);
    });
  });
});