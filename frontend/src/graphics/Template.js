import { reverse } from './utilities';

export class Template {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.shapes = [];
    this.clipboard = null;
  }

  add(shape) {
    this.shapes.push(shape);
  }

  delete() {
    this.shapes = this.shapes.filter(shape => !shape.isClicked);
  }

  draw() {
    this.clear();
    this.shapes.forEach(shape => shape.draw(this.context));
  }

  clear() {
    const { context, canvas } = this;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  copy() {
    const target = this.shapes.find(shape => shape.isClicked);
    if (target) {
      this.clipboard = target.clone();
    }
  }

  paste() {
    if (this.clipboard) {
      this.add(this.clipboard);
      this.clipboard = this.clipboard.clone();
    }
  }

  cut() {
    this.copy();
    this.delete();
  }

  pressMouse(x, y) {
    return reverse(this.shapes).reduce((consumed, shape) => {
      return shape.pressMouse(x, y, consumed);
    }, false);
  }

  liftMouse() {
    this.shapes.forEach(shape => shape.liftMouse());
  }

  moveMouse(deltaX, deltaY, x, y) {
    this.shapes.forEach(shape => shape.moveMouse(deltaX, deltaY, x, y));
  }
}
