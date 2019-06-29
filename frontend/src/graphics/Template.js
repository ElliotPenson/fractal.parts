import { Cursor, useCursor } from './Cursor';
import { Key, isDeletion, reverse, getContext } from './utilities';
import { Resizable, Base } from './Resizable';
import { colors } from './colors';
import { enableTouch, disableTouch } from './touch';

const backgroundColor = '#F8F8F8';

export class Template {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = getContext(canvas);
    this.parent = new Base(500, 500, 500, 500);
    this.shapes = [this.parent];
    this.clipboard = null;
    this.colors = colors();
    this.lastEvent = null;
  }

  get children() {
    return this.shapes.filter(shape => shape !== this.parent);
  }

  add(shape) {
    if (!shape) {
      const { value: color } = this.colors.next();
      shape = new Resizable(100, 100, 150, 150, color, 0, false);
    }
    this.shapes.push(shape);
  }

  delete() {
    this.shapes = this.shapes.filter(
      shape => shape === this.parent || !shape.isFocused
    );
  }

  draw() {
    const { context } = this;
    this.clear();
    this.shapes.forEach(shape => shape.draw(context));
  }

  clear() {
    const { context, canvas } = this;
    context.fillStyle = backgroundColor;
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

  moveMouse(deltaX, deltaY, x, y, keypress) {
    const { shapes } = this;
    shapes.forEach(shape =>
      shape.moveMouse(deltaX, deltaY, x, y, shapes, keypress)
    );
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

  makeInteractive() {
    for (const [type, listener] of this.listeners) {
      window.addEventListener(type, listener);
    }
    enableTouch(this.canvas);
  }

  removeInteractivity() {
    for (const [type, listener] of this.listeners) {
      window.removeEventListener(type, listener);
    }
    disableTouch(this.canvas);
  }

  get listeners() {
    return [
      ['mousedown', this.mouseDownListener],
      ['mousemove', this.mouseMoveListener],
      ['mouseup', this.mouseUpListener],
      ['keydown', this.keyDownListener],
      ['copy', this.copyListener],
      ['paste', this.pasteListener],
      ['cut', this.cutListener]
    ];
  }

  mouseDownListener = event => {
    const { x, y } = findPosition(event, this.canvas);
    this.lastEvent = event;
    this.pressMouse(x, y);
    this.draw();
  };

  mouseMoveListener = event => {
    const { x, y } = findPosition(event, this.canvas);
    const { deltaX, deltaY } = findMovement(event, this.lastEvent);
    this.lastEvent = event;
    this.moveMouse(deltaX, deltaY, x, y, getKeypress(event));
    this.draw();
  };

  mouseUpListener = () => {
    this.liftMouse();
    this.draw();
  };

  keyDownListener = event => {
    if (isDeletion(event.key.toLowerCase())) {
      this.delete();
    }
    this.draw();
  };

  copyListener = () => {
    this.copy();
  };

  pasteListener = () => {
    this.paste();
    this.draw();
  };

  cutListener = () => {
    this.cut();
    this.draw();
  };
}

function getKeypress(event) {
  return Object.keys(Key).find(key => event[Key[key]]);
}

function findPosition(event, canvas) {
  const { left, top } = canvas.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  return { x, y };
}

function findMovement(event, lastEvent) {
  if (lastEvent) {
    return {
      deltaX: event.clientX - lastEvent.clientX,
      deltaY: event.clientY - lastEvent.clientY
    };
  } else {
    return {};
  }
}
