import { Shape } from './Shape';

export class Rectangle extends Shape {
  drawBody(context) {
    const { x, y, width, height } = this;
    context.fillStyle = this.color;
    context.fillRect(x, y, width, height);
  }

  clone() {
    return new Rectangle(
      this.x + 10,
      this.y + 10,
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
