import { Cursor } from './Cursor';
import { inferGuides } from './Guide';
import { Transformation } from './Transformation';
import { Handle } from './Handle';

export class Shape {
  constructor(x, y, width, height, color = 'black', rotation = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.rotation = rotation;
    this.isFocused = false;
    this.isDragging = false;
    this.handles = Handle.build(this);
    this.guides = [];
  }

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.y + this.height;
  }

  get center() {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
  }

  get cursor() {
    return Cursor.MOVE;
  }

  get transformation() {
    return Transformation.fromShape(this);
  }

  draw(context) {
    this.transformation.decorate(context, () => {
      this.withGuides().drawBody(context);
      if (this.isFocused) {
        this.drawHandles(context);
      }
    });
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
    [x, y] = this.transformation.localize(x, y);
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
  }

  consumeGuides() {
    this.guides.forEach(guide => guide.apply(this));
    this.guides = [];
  }

  moveMouse(deltaX, deltaY, x, y, shapes) {
    if (this.isDragging) {
      this.isFocused = false;
      this.shift(deltaX, deltaY);
      this.guides = inferGuides(shapes);
    }
    this.handles.forEach(handle => handle.moveMouse(deltaX, deltaY, x, y));
  }

  findAt(x, y) {
    [x, y] = this.transformation.localize(x, y);
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

  drawBody(context) {
    throw new Error('Not implemented');
  }

  clone() {
    throw new Error('Not implemented');
  }

  isTouching(x, y) {
    throw new Error('Not implemented');
  }
}
