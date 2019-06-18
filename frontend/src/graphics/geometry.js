import { abs, distance, sum } from 'mathjs';

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
