export class Shape {
  constructor(color) {
    this.color = color;
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
