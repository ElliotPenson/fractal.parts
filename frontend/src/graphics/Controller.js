import { Template } from './Template';
import { Rectangle } from './Shape';

export class Controller {
  constructor(canvas) {
    this.canvas = canvas;
    this.template = new Template(canvas);
    this.render();
    this.attachEvents();
  }

  add() {
    const shape = new Rectangle(100, 100, 100, 100);
    this.template.add(shape);
    this.render();
  }

  render() {
    this.template.draw();
  }
}
