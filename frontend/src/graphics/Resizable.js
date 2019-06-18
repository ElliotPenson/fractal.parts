import { Cursor } from './Cursor';
import { inferGuides } from './Guide';
import { Handle } from './Handle';
import { Rectangle } from './geometry';

export class Resizable extends Rectangle {
  constructor(x, y, width, height, color, rotation = 0, outline = false) {
    super(x, y, width, height, rotation);
    this.color = color;
    this.isFocused = false;
    this.isDragging = false;
    this.outline = outline;
    this.handles = Handle.build(this);
    this.guides = [];
  }

  get cursor() {
    return Cursor.MOVE;
  }

  draw(context) {
    this.withGuides().drawBody(context);
    if (this.isFocused) {
      this.drawHandles(context);
    }
  }

  drawBody(context) {
    context.save();
    context.fillStyle = this.color;
    context.fill(this.path);
    if (this.outline) {
      context.lineWidth = 2;
      context.strokeStyle = '#D9D9D9';
      context.stroke(this.path);
    }
    context.restore();
  }

  drawHandles(context) {
    this.handles.forEach(handle => handle.draw(context));
  }

  drawGuides(context) {
    this.guides.forEach(guide => guide.draw(context));
  }

  withGuides() {
    const shape = this.clone();
    this.guides.forEach(guide => guide.apply(shape));
    return shape;
  }

  pressMouse(x, y, consumed) {
    if (consumed) {
      this.isFocused = false;
    } else {
      consumed = this.handles.reduce((consumed, shape) => {
        return shape.pressMouse(x, y, consumed);
      }, consumed);

      if (consumed) {
        // Click on handle.
        this.isFocused = true;
      } else if (this.isTouching(x, y)) {
        // Click on shape.
        this.isFocused = true;
        this.isDragging = true;
        consumed = true;
      } else {
        // Nothing clicked.
        this.isFocused = false;
      }
    }
    return consumed;
  }

  liftMouse() {
    if (this.isDragging) {
      this.isFocused = true;
    }
    this.isDragging = false;
    this.handles.forEach(handle => handle.liftMouse());
    this.consumeGuides();
    this.correctNegatives();
  }

  /**
   * Flip the sign of negative width/height values to ensure that shape size is
   * always positive. Adjust x/y so the shape doesn't move.
   */
  correctNegatives() {
    if (this.width < 0) {
      this.x += this.width;
      this.width = -this.width;
    }
    if (this.height < 0) {
      this.y += this.height;
      this.height = -this.height;
    }
  }

  consumeGuides() {
    this.guides.forEach(guide => guide.apply(this));
    this.guides = [];
  }

  moveMouse(deltaX, deltaY, x, y, shapes, keypress) {
    if (this.isDragging) {
      this.isFocused = false;
      this.shift(deltaX, deltaY);
      this.setGuides(shapes, keypress);
    }
    this.handles.forEach(handle => handle.moveMouse(deltaX, deltaY, x, y));
  }

  setGuides(shapes, keypress = false) {
    if (keypress) {
      this.guides = [];
    } else {
      this.guides = inferGuides(shapes);
    }
  }

  findAt(x, y) {
    const handle = this.handles.find(handle => handle.isTouching(x, y));
    if (handle) {
      return handle;
    } else if (this.isTouching(x, y)) {
      return this;
    } else {
      return null;
    }
  }

  shift(deltaX = 10, deltaY = 10) {
    this.x += deltaX;
    this.y += deltaY;
  }

  clone() {
    const { x, y, width, height, color, rotation, outline } = this;
    return new Resizable(x, y, width, height, color, rotation, outline);
  }

  toJSON() {
    const { x, y, width, height, color, rotation } = this;
    return { x, y, width, height, color, rotation };
  }

  static fromJSON({ x, y, width, height, color, rotation }) {
    return new Resizable(x, y, width, height, color, rotation);
  }
}

export class Base extends Resizable {
  constructor(x, y, width, height) {
    super(x, y, width, height, 'white', 0, true);
  }
}
