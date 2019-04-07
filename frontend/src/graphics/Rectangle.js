import { Shape } from './Shape';

export class Rectangle extends Shape {
  constructor(x, y, width, height, color) {
    super(color);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    this.drawFill(context);
    if (this.isClicked) {
      this.drawOutline(context);
    }
  }

  drawFill(context) {
    const { x, y, width, height } = this;
    context.fillStyle = this.color;
    context.fillRect(x, y, width, height);
  }

  drawOutline(context) {
    const { x, y, width, height } = this;
    context.lineWidth = 2;
    context.fillStyle = 'black';
    context.strokeRect(x, y, width, height);
  }

  clone() {
    return new Rectangle(this.x + 10, this.y + 10, this.width, this.width);
  }

  isTouching(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.height &&
      y >= this.y &&
      y <= this.y + this.width
    );
  }
}
