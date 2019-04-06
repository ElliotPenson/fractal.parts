const color = 'rgb(0, 116, 217, 0.9)';

export class Shape {
  draw(context) {
    throw new Error('Not implemented');
  }
}

export class Rectangle extends Shape {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    const { x, y, width, height } = this;
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
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
