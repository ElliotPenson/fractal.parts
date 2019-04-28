import { Template } from './Template';
import { Attractor } from './Attractor';
import { Rectangle } from './Rectangle';
import { colors } from './colors';

export class Controller {
  constructor() {
    this.colors = colors();
  }

  set templateCanvas(canvas) {
    this.template = new Template(canvas);
  }

  set attractorCanvas(canvas) {
    this.attractor = new Attractor(canvas);
  }

  add() {
    const color = this.colors.next().value;
    const shape = new Rectangle(100, 100, 150, 150, color);
    this.template.add(shape);
    this.template.draw();
  }

  showTemplate() {
    this.attachListeners();
    this.template.draw();
  }

  showPreview() {
    this.detachListeners();
    this.attractor.transformations = this.template.export();
    this.attractor.draw();
  }

  listenToMouseDown = event => {
    const { x, y } = findPosition(event, this.template.canvas);
    this.template.pressMouse(x, y);
    this.template.draw();
  };

  listenToMouseMove = event => {
    const { x, y } = findPosition(event, this.template.canvas);
    this.template.moveMouse(event.movementX, event.movementY, x, y);
    this.template.draw();
  };

  listenToMouseUp = event => {
    this.template.liftMouse();
    this.template.draw();
  };

  listenToKeyDown = event => {
    if (isDeletion(event.key)) {
      this.template.delete();
    }
    this.template.draw();
  };

  listenToCopy = event => {
    this.template.copy();
  };

  listenToPaste = event => {
    this.template.paste();
    this.template.draw();
  };

  listenToCut = event => {
    this.template.cut();
    this.template.draw();
  };

  get listeners() {
    return [
      ['mousedown', this.listenToMouseDown],
      ['mousemove', this.listenToMouseMove],
      ['mouseup', this.listenToMouseUp],
      ['keydown', this.listenToKeyDown],
      ['copy', this.listenToCopy],
      ['paste', this.listenToPaste],
      ['cut', this.listenToCut]
    ];
  }

  attachListeners() {
    for (const [type, listener] of this.listeners) {
      window.addEventListener(type, listener);
    }
  }

  detachListeners() {
    for (const [type, listener] of this.listeners) {
      window.removeEventListener(type, listener);
    }
  }
}

function isDeletion(key) {
  return ['backspace', 'clear', 'delete', 'del'].includes(key.toLowerCase());
}

function findPosition(event, canvas) {
  const { left, top } = canvas.getBoundingClientRect();
  const x = event.pageX - left;
  const y = event.pageY - top;
  return { x, y };
}
