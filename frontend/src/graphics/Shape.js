import { Cursor } from './Cursor';
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
  }

  get center() {
    const { x, y, width, height } = this;
    return [x + width / 2, y + height / 2];
  }

  get cursor() {
    return Cursor.MOVE;
  }

  get transformation() {
    return Transformation.fromShape(this);
  }

  draw(context) {
    this.transformation.decorate(context, () => {
      this.drawBody(context);
      if (this.isFocused) {
        this.handles.forEach(handle => handle.draw(context));
      }
    });
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
  }

  moveMouse(deltaX, deltaY, x, y) {
    if (this.isDragging) {
      this.isFocused = false;
      this.shift(deltaX, deltaY);
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
