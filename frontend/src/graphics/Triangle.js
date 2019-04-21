import { Shape } from './Shape';

export class Triangle extends Shape {
  drawBody(context) {
    const { x, y, width, height } = this;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(x + 0.5 * width, y);
    context.lineTo(x + width, y + height);
    context.lineTo(x, y + height);
    context.fill();
  }

  clone() {
    return new Triangle(
      this.x,
      this.y,
      this.width,
      this.height,
      this.color,
      this.rotation
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
