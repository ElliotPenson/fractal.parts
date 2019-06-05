import * as math from 'mathjs';

export class Transformation {
  constructor(xScale, yScale, xSkew, ySkew, xMove, yMove) {
    this.matrix = math.matrix([
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

  equals(transformation) {
    return math.deepEqual(this.matrix, transformation.matrix);
  }

  clone() {
    const { xScale, yScale, xSkew, ySkew, xMove, yMove } = this;
    return new Transformation(xScale, yScale, xSkew, ySkew, xMove, yMove);
  }

  /**
   * Destructively perform the matrix multiplication AB = C.
   * @param {Transformation} transformation
   */
  multiply(transformation) {
    this.matrix = math.multiply(this.matrix, transformation.matrix);
  }

  /**
   * Compute the linear combination Ax = b.
   * @param {number} x
   * @param {number} y
   * @param {boolean} inverse - If true, A^{-1}x is calculated. This parameter
   *   lets one reverse a linear combination.
   * @returns {Array}
   */
  solve(x, y, inverse = false) {
    const vector = math.transpose([x, y, 1]);
    let { matrix } = this;
    if (inverse) {
      matrix = math.inv(matrix);
    }
    const prime = math.multiply(matrix, vector);
    return prime.toArray().slice(0, -1);
  }

  /**
   * Destructively perform a movement transformation.
   * @param {number} dx
   * @param {number} dy
   */
  translate(dx, dy) {
    const translation = new Transformation(1, 1, 0, 0, dx, dy);
    this.multiply(translation);
  }

  /**
   * Destructively perform a clockwise rotation transformation.
   * @param {number} radians - Angle of rotation.
   */
  rotate(radians) {
    const [xScale, yScale] = [math.cos(radians), math.cos(radians)];
    const [xSkew, ySkew] = [math.sin(radians), -math.sin(radians)];
    const rotation = new Transformation(xScale, yScale, xSkew, ySkew, 0, 0);
    this.multiply(rotation);
  }

  /**
   * Destructively perform a clockwise rotation at a given origin.
   * @param {number} radians
   * @param {number} x
   * @param {number} y
   */
  rotateAt(radians, x, y) {
    this.translate(x, y);
    this.rotate(radians);
    this.translate(-x, -y);
  }

  scale(x, y) {
    const translation = new Transformation(x, y, 0, 0, 0, 0);
    this.multiply(translation);
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

  /**
   * Undo this transformation's linear combination (e.g. Ax = b -> x = A^{-1}b)
   * @param {number} x
   * @param {number} y
   */
  localize(x, y) {
    return this.solve(x, y, true);
  }

  /**
   * Build the identity transformation (e.g. the transformation 'I' such that
   * Ix = x for all x).
   * @returns {Transformation}
   */
  static identity() {
    return new Transformation(1, 1, 0, 0, 0, 0);
  }

  /**
   * Build a Transformation using shape properties.
   * @param {Shape} shape
   * @returns {Transformation}
   */
  static fromShape(shape) {
    const { x, y } = shape.center;
    const { rotation } = shape;
    const transformation = Transformation.identity();
    transformation.rotateAt(rotation, x, y);
    return transformation;
  }

  /**
   * Represent the difference between two shapes as a transformation matrix.
   * @param {Shape} parent
   * @param {Shape} child
   * @returns {Transformation}
   */
  static betweenShapes(parent, child) {
    [parent, child] = moveToOrigin(parent, child);
    const transformation = Transformation.identity();
    const xScale = child.width / parent.width;
    const yScale = child.height / parent.height;
    transformation.translate(child.x - parent.x, child.y - parent.y);
    transformation.rotateAt(
      child.rotation - parent.rotation,
      xScale * (parent.width / 2),
      yScale * (parent.height / 2)
    );
    transformation.scale(xScale, yScale);
    return transformation;
  }
}

function moveToOrigin(parent, child) {
  const { x, y } = parent;
  parent = { ...parent, x: 0, y: 0 };
  child = { ...child, x: child.x - x, y: child.y - y };
  return [parent, child];
}
