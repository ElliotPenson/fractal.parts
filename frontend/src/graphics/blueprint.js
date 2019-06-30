import { standardize } from './standardization';
import { Rectangle } from './geometry';

export function draw(canvas, context, fractal) {
  fractal = standardize(fractal, canvas);
  for (const child of fractal.children) {
    drawShape(child, context);
  }
}

function drawShape(shape, context) {
  const { path } = getRectangle(shape);
  context.fillStyle = shape.color;
  context.strokeStyle = shape.color;
  path.fill(context);
  path.stroke(context);
}

function getRectangle({ x, y, width, height, rotation }) {
  const [centerX, centerY] = findCenter(x, y, width, height);
  return new Rectangle(centerX, centerY, width, height, rotation);
}

function findCenter(x, y, width, height) {
  return [x + 0.5 * width, y + 0.5 * height];
}
