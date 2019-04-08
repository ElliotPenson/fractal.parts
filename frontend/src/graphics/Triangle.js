import { Shape } from './Shape';

export class Triangle extends Shape {
  draw(context) {
    const { x, y, width, height } = this;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(x + 0.5 * width, y);
    context.lineTo(x + width, y + height);
    context.lineTo(x, y + height);
    context.fill();
    super.draw(context);
  }

  clone() {
    return new Triangle(
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
