import { abs, cos, sin, sqrt, square, sum } from 'mathjs';

export class Rectangle {
  /**
   * Create a new rectangle.
   * @param {number} x - The center's x.
   * @param {number} y - The center's y.
   * @param {number} width - Distance in pixels.
   * @param {number} height - Distance in pixels.
   */
  constructor(x, y, width, height, rotation = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
  }

  isTouching(x, y) {
    return isInside({ x, y }, this);
  }

  get center() {
    const { x, y } = this;
    return { x, y };
  }

  set top(point) {
    const { bottom, bottomRight, height, rotation } = this;
    const newHeight = distanceToLine(point, bottom, bottomRight);
    const displacement = newHeight - height;
    this.height = newHeight;
    this.x += sin(rotation) * (displacement / 2);
    this.y -= cos(rotation) * (displacement / 2);
  }

  get top() {
    const { height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: this.x + sin(rotation) * hypotenuse,
      y: this.y - cos(rotation) * hypotenuse
    };
  }

  set left(point) {
    const { right, topRight, width, rotation } = this;
    const newWidth = distanceToLine(point, right, topRight);
    const displacement = newWidth - width;
    this.width = newWidth;
    this.x -= cos(rotation) * (displacement / 2);
    this.y -= sin(rotation) * (displacement / 2);
  }

  get left() {
    const { width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: this.x - cos(rotation) * hypotenuse,
      y: this.y - sin(rotation) * hypotenuse
    };
  }

  set right(point) {
    const { left, topLeft, width, rotation } = this;
    const newWidth = distanceToLine(point, left, topLeft);
    const displacement = newWidth - width;
    this.width = newWidth;
    this.x += cos(rotation) * (displacement / 2);
    this.y += sin(rotation) * (displacement / 2);
  }

  get right() {
    const { width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: this.x + cos(rotation) * hypotenuse,
      y: this.y + sin(rotation) * hypotenuse
    };
  }

  set bottom(point) {
    const { top, topRight, height, rotation } = this;
    const newHeight = distanceToLine(point, top, topRight);
    const displacement = newHeight - height;
    this.height = newHeight;
    this.x -= sin(rotation) * (displacement / 2);
    this.y += cos(rotation) * (displacement / 2);
  }

  get bottom() {
    const { height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: this.x - sin(rotation) * hypotenuse,
      y: this.y + cos(rotation) * hypotenuse
    };
  }

  set topLeft(point) {
    this.top = point;
    this.left = point;
  }

  get topLeft() {
    const { left, height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: left.x + sin(rotation) * hypotenuse,
      y: left.y - cos(rotation) * hypotenuse
    };
  }

  set topRight(point) {
    this.top = point;
    this.right = point;
  }

  get topRight() {
    const { top, width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: top.x + cos(rotation) * hypotenuse,
      y: top.y + sin(rotation) * hypotenuse
    };
  }

  set bottomRight(point) {
    this.bottom = point;
    this.right = point;
  }

  get bottomRight() {
    const { right, height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: right.x - sin(rotation) * hypotenuse,
      y: right.y + cos(rotation) * hypotenuse
    };
  }

  set bottomLeft(point) {
    this.bottom = point;
    this.left = point;
  }

  get bottomLeft() {
    const { bottom, width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: bottom.x - cos(rotation) * hypotenuse,
      y: bottom.y - sin(rotation) * hypotenuse
    };
  }

  get path() {
    const { topLeft, topRight, bottomLeft, bottomRight } = this;
    const path = new Path2D();
    path.moveTo(topLeft.x, topLeft.y);
    path.lineTo(topRight.x, topRight.y);
    path.lineTo(bottomRight.x, bottomRight.y);
    path.lineTo(bottomLeft.x, bottomLeft.y);
    path.lineTo(topLeft.x, topLeft.y);
    return path;
  }

  clone() {
    const { x, y, width, height, rotation } = this;
    return new Rectangle(x, y, width, height, rotation);
  }
}

/**
 * Check if a point lies inside a rectangle
 */
export function isInside(point, corners) {
  const { topLeft, topRight, bottomLeft, bottomRight } = corners;
  const triangles = [
    findTriangleArea(topLeft, point, bottomRight),
    findTriangleArea(bottomRight, point, bottomLeft),
    findTriangleArea(bottomLeft, point, topRight),
    findTriangleArea(point, topRight, topLeft)
  ];
  return sum(...triangles) <= findRectangleArea(corners);
}

/**
 * Calculate rectangle with euclidean distance and width * height.
 */
function findRectangleArea({ topLeft, topRight, bottomRight }) {
  const width = distance(topLeft, topRight);
  const height = distance(topRight, bottomRight);
  return width * height;
}

/**
 * Calculate triangle area using the shoelace formula.
 */
function findTriangleArea(cornerA, cornerB, cornerC) {
  const determinant =
    cornerA.x * cornerB.y +
    cornerB.x * cornerC.y +
    cornerC.x * cornerA.y -
    cornerB.x * cornerA.y -
    cornerC.x * cornerB.y -
    cornerA.x * cornerC.y;
  return 0.5 * abs(determinant);
}

/**
 * Find the euclidean distance between two points.
 * @param {{ x: number, y: number }} pointA
 * @param {{ x: number, y: number }} pointB
 */
export function distance(pointA, pointB) {
  return sqrt(square(pointB.x - pointA.x) + square(pointB.y - pointA.y));
}

/**
 * Find the shortest distance from a point to any point on a line.
 * @param {{ x: number, y: number }} lineA
 * @param {{ x: number, y: number }} lineB
 * @param {{ x: number, y: number }} point
 */
export function distanceToLine(point, lineA, lineB) {
  const numerator =
    (lineB.y - lineA.y) * point.x -
    (lineB.x - lineA.x) * point.y +
    lineB.x * lineA.y -
    lineB.y * lineA.x;
  const denominator = distance(lineA, lineB);
  return abs(numerator) / denominator;
}

export function convertToRadians(degrees) {
  return (Math.PI / 180) * degrees;
}

export function convertToDegrees(radians) {
  return (180 / Math.PI) * radians;
}
