import { Cursor, useCursor } from './Cursor';
import { reverse } from './utilities';

export class Template {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.shapes = [];
    this.clipboard = null;
  }

  add(shape) {
    this.shapes.push(shape);
  }

  delete() {
    this.shapes = this.shapes.filter(shape => !shape.isFocused);
  }

  draw() {
    const { context } = this;
    this.clear();
    this.shapes.forEach(shape => shape.draw(context));
    this.shapes.forEach(shape => shape.drawGuides(context));
  }

  clear() {
    const { context, canvas } = this;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  copy() {
    const target = this.shapes.find(shape => shape.isFocused);
    if (target) {
      this.clipboard = target.clone();
      this.clipboard.shift();
    }
  }

  paste() {
    if (this.clipboard) {
      this.add(this.clipboard);
      this.clipboard = this.clipboard.clone();
      this.clipboard.shift();
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
    const { shapes } = this;
    shapes.forEach(shape => shape.moveMouse(deltaX, deltaY, x, y, shapes));
    if (!this.isDragging()) {
      this.setCursor(x, y);
    }
  }

  isDragging() {
    return this.shapes.some(
      shape =>
        shape.isDragging || shape.handles.some(handle => handle.isDragging)
    );
  }

  setCursor(x, y) {
    const element = this.findAt(x, y);
    if (element) {
      useCursor(this.canvas, element.cursor);
    } else {
      useCursor(this.canvas, Cursor.AUTO);
    }
  }

  findAt(x, y) {
    return reverse(this.shapes).reduce((toReturn, shape) => {
      return toReturn || shape.findAt(x, y);
    }, null);
  }
}
