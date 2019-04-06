const color = 'rgb(0, 116, 217, 0.8)';

export class Shape {
  constructor() {
    this.isClicked = false;
    this.isDragging = false;
  }

  draw(context) {
    throw new Error('Not implemented');
  }

  clone() {
    throw new Error('Not implemented');
  }

  pressMouse(x, y, consumed) {
    if (!consumed && this.isTouching(x, y)) {
      this.isClicked = true;
      this.isDragging = true;
      return true;
    } else {
      this.isClicked = false;
      return consumed;
    }
  }

  liftMouse() {
    this.isDragging = false;
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.x += deltaX;
      this.y += deltaY;
    }
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
    this.drawFill(context);
    if (this.isClicked) {
      this.drawOutline(context);
    }
  }

  drawFill(context) {
    const { x, y, width, height } = this;
    context.fillStyle = color;
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
