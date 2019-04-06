import { reverse } from './utilities';

export class Template {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.shapes = [];
  }

  add(shape) {
    this.shapes.push(shape);
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

  pressMouse(x, y) {
    return reverse(this.shapes).reduce((consumed, shape) => {
      return shape.pressMouse(x, y, consumed);
    }, false);
  }

  liftMouse() {
    this.shapes.forEach(shape => shape.liftMouse());
  }

  moveMouse(deltaX, deltaY) {
    this.shapes.forEach(shape => shape.moveMouse(deltaX, deltaY));
  }
}
