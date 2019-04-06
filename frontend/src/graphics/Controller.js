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

  attachEvents() {
    window.addEventListener('mousedown', event => {
      const x = event.pageX - this.canvas.offsetLeft;
      const y = event.pageY - this.canvas.offsetTop;
      this.template.pressMouse(x, y);
      this.render();
    });
    window.addEventListener('mousemove', event => {
      this.template.moveMouse(event.movementX, event.movementY);
      this.render();
    });
    window.addEventListener('mouseup', event => {
      this.template.liftMouse();
      this.render();
    });
  }
}
