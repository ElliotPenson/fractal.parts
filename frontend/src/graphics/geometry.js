import { abs, cos, distance, sin, sum } from 'mathjs';

export class Rectangle {
  /**
   * Create a new rectangle.
   * @param {number} x - The center's x.
   * @param {number} y - The center's y.
   * @param {number} width - Distance in pixels.
   * @param {number} height - Distance in pixels.
   */
  constructor(x, y, width, height, rotation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
  }

  isTouching(x, y) {
    return isInside({ x, y }, this);
  }

  get top() {
    const { height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: this.x + sin(rotation) * hypotenuse,
      y: this.y - cos(rotation) * hypotenuse
    };
  }

  get left() {
    const { width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: this.x - cos(rotation) * hypotenuse,
      y: this.y - sin(rotation) * hypotenuse
    };
  }

  get right() {
    const { width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: this.x + cos(rotation) * hypotenuse,
      y: this.y + sin(rotation) * hypotenuse
    };
  }

  get bottom() {
    const { height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: this.x - sin(rotation) * hypotenuse,
      y: this.y + cos(rotation) * hypotenuse
    };
  }

  get topLeft() {
    const { left, height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: left.x + sin(rotation) * hypotenuse,
      y: left.y - cos(rotation) * hypotenuse
    };
  }

  get topRight() {
    const { top, width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: top.x + cos(rotation) * hypotenuse,
      y: top.y + sin(rotation) * hypotenuse
    };
  }

  get bottomRight() {
    const { right, height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: right.x - sin(rotation) * hypotenuse,
      y: right.y + cos(rotation) * hypotenuse
    };
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
  const width = distance([topLeft.x, topLeft.y], [topRight.x, topRight.y]);
  const height = distance(
    [topRight.x, topRight.y],
    [bottomRight.x, bottomRight.y]
  );
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

export function convertToRadians(degrees) {
  return (Math.PI / 180) * degrees;
}

export function convertToDegrees(radians) {
  return (180 / Math.PI) * radians;
}
