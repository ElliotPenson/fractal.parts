import { cos, deepEqual, matrix, multiply, sin, transpose } from 'mathjs';

export class Transformation {
  constructor(xScale, yScale, xSkew, ySkew, xMove, yMove) {
    this.matrix = matrix([
      [xScale, ySkew, xMove],
      [xSkew, yScale, yMove],
      [0, 0, 1]
    ]);
  }

  get xScale() {
    return this.matrix.get([0, 0]);
  }

  get yScale() {
    return this.matrix.get([1, 1]);
  }

  get xSkew() {
    return this.matrix.get([1, 0]);
  }

  get ySkew() {
    return this.matrix.get([0, 1]);
  }

  get xMove() {
    return this.matrix.get([0, 2]);
  }

  get yMove() {
    return this.matrix.get([1, 2]);
  }

  /**
   * Build the identity transformation (i.e. the transformation 'I' such that Ix
   * = x for all x).
   * @returns {Transformation}
   */
  static identity() {
    return new Transformation(1, 1, 0, 0, 0, 0);
  }

  /**
   * Build a transformation from a 3x3 matrix.
   * @param {math.Matrix} matrix
   * @returns {Transformation}
   */
  static fromMatrix(matrix) {
    const transformation = new Transformation();
    transformation.matrix = matrix;
    return transformation;
  }

  /**
   * Non-destructively perform the matrix multiplication AB = C.
   * @param {Transformation} transformation
   * @returns {Transformation}
   */
  multiply(transformation) {
    const matrix = multiply(this.matrix, transformation.matrix);
    return Transformation.fromMatrix(matrix);
  }

  /**
   * Compute the linear combination Ax = b.
   * @param {number} x
   * @param {number} y
   * @returns {number[]} [x, y]
   */
  solve(x, y) {
    const vector = transpose([x, y, 1]);
    const prime = multiply(this.matrix, vector);
    return prime.toArray().slice(0, -1);
  }

  /**
   * Apply this transformation to an HTML canvas before an arbitrary function.
   * @param {CanvasRenderingContext2D} context
   * @param {function} draw
   */
  decorate(context, draw) {
    const { xScale, yScale, xSkew, ySkew, xMove, yMove } = this;
    context.save();
    context.transform(xScale, xSkew, ySkew, yScale, xMove, yMove);
    draw();
    context.restore();
  }

  equals(transformation) {
    return deepEqual(this.matrix, transformation.matrix);
  }

  clone() {
    const { xScale, yScale, xSkew, ySkew, xMove, yMove } = this;
    return new Transformation(xScale, yScale, xSkew, ySkew, xMove, yMove);
  }
}

/**
 * Combine a series of transformation matrices with multiplication.
 * @param {Transformation[]} transformations
 * @returns {Transformation}
 */
export function compose(...transformations) {
  return transformations.reduce((composition, transformation) => {
    return composition.multiply(transformation);
  }, Transformation.identity());
}

/**
 * Create a transformation matrix that moves points.
 * @param {number} dx
 * @param {number} dy
 * @returns {Transformation}
 */
export function translate(dx, dy) {
  return new Transformation(1, 1, 0, 0, dx, dy);
}

/**
 * Create a transformation matrix that scales by the given delta values.
 * @param {number} x
 * @param {number} y
 */
export function scale(x, y) {
  return new Transformation(x, y, 0, 0, 0, 0);
}

/**
 * Create a transformation matrix that rotates clockwise.
 * @param {number} radians - Angle of rotation.
 * @returns {Transformation}
 */
export function rotate(radians) {
  const [xScale, yScale] = [cos(radians), cos(radians)];
  const [xSkew, ySkew] = [sin(radians), -sin(radians)];
  return new Transformation(xScale, yScale, xSkew, ySkew, 0, 0);
}

/**
 * Create a transformation matrix that rotates clockwise at a given origin.
 * @param {number} radians
 * @param {number} x
 * @param {number} y
 * @returns {Transformation}
 */
export function rotateAt(radians, x, y) {
  return compose(
    translate(x, y),
    rotate(radians),
    translate(-x, -y)
  );
}

/**
 * Represent the difference between two shapes as a transformation matrix.
 * @param {Rectangle} parent
 * @param {Rectangle} child
 * @returns {Transformation}
 */
export function findTransformation(parent, child) {
  return compose(
    findMovement(parent, child),
    findRotation(parent, child),
    findScale(parent, child)
  );
}

export function findMovement(parent, child) {
  return translate(child.x - parent.x, child.y - parent.y);
}

export function findRotation(parent, child) {
  const rotation = child.rotation - parent.rotation;
  return rotateAt(rotation, child.width / 2, child.height / 2);
}

export function findScale(parent, child) {
  return scale(child.width / parent.width, child.height / parent.height);
}
