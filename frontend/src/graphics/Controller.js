import { Template } from './Template';
import { Rectangle } from './Rectangle';
import { colors } from './colors';

export class Controller {
  constructor(canvas) {
    this.canvas = canvas;
    this.template = new Template(canvas);
    this.render();
    this.attachListeners();
    this.colors = colors();
  }

  render() {
    this.template.draw();
  }

  add() {
    // TODO: Move colors into the Template class.
    const color = this.colors.next().value;
    const shape = new Rectangle(100, 100, 150, 150, color);
    this.template.add(shape);
    this.render();
  }

  attachListeners() {
    this.on('mousedown', event => {
      const { x, y } = findPosition(event, this.canvas);
      this.template.pressMouse(x, y);
    });
    this.on('mousemove', event => {
      this.template.moveMouse(event.movementX, event.movementY);
    });
    this.on('mouseup', () => {
      this.template.liftMouse();
    });
    this.on('keydown', event => {
      if (isDeletion(event.key)) {
        this.template.delete();
      }
    });
    this.on('copy', () => this.template.copy());
    this.on('paste', () => this.template.paste());
    this.on('cut', () => this.template.cut());
  }

  on(eventType, reaction) {
    window.addEventListener(eventType, event => {
      reaction(event);
      this.render();
    });
  }
}

function isDeletion(key) {
  return ['backspace', 'clear', 'delete', 'del'].includes(key.toLowerCase());
}

function findPosition(event, canvas) {
  const x = event.pageX - canvas.offsetLeft;
  const y = event.pageY - canvas.offsetTop;
  return { x, y };
}
