import { Shape } from './Shape';

export class Ellipse extends Shape {
  draw(context) {
    const { x, y, width, height } = this;
    context.fillStyle = this.color;
    context.beginPath();
    const center = { x: x + 0.5 * width, y: y + 0.5 * height };
    const radius = { x: 0.5 * width, y: 0.5 * height };
    context.ellipse(center.x, center.y, radius.x, radius.y, 0, 0, 2 * Math.PI);
    context.fill();
    super.draw(context);
  }

  clone() {
    return new Ellipse(
      this.x + 10,
      this.y + 10,
      this.width,
      this.height,
      this.color
    );
  }

  isTouching(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
