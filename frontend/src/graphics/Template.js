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

  handle(event) {
    reverse(this.shapes).forEach(shape => shape.handle(event));
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
}
