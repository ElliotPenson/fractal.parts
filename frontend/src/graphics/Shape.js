import { Cursor } from './Cursor';
import { Transformation } from './Transformation';
import {
  LeftHandle,
  RightHandle,
  TopHandle,
  BottomHandle,
  UpperLeftHandle,
  UpperRightHandle,
  LowerLeftHandle,
  LowerRightHandle,
  RotationHandle
} from './Handle';

export class Shape {
  constructor(x, y, width, height, color = 'black', rotation = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.rotation = rotation;
    this.isClicked = false;
    this.isDragging = false;
    this.handles = this.createHandles();
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
      if (this.isClicked) {
        this.handles.forEach(handle => handle.draw(context));
      }
    });
  }

  pressMouse(x, y, consumed) {
    [x, y] = this.transformation.localize(x, y);
    if (consumed) {
      this.isClicked = false;
    } else {
      consumed = this.handles.reduce((consumed, shape) => {
        return shape.pressMouse(x, y, consumed);
      }, consumed);

      if (consumed) {
        // Click on handle.
        this.isClicked = true;
      } else if (this.isTouching(x, y)) {
        // Click on shape.
        this.isClicked = true;
        this.isDragging = true;
        consumed = true;
      } else {
        // Nothing clicked.
        this.isClicked = false;
      }
    }
    return consumed;
  }

  liftMouse() {
    this.isDragging = false;
    this.handles.forEach(handle => handle.liftMouse());
  }

  moveMouse(deltaX, deltaY, x, y) {
    if (this.isDragging) {
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

  createHandles() {
    return [
      new LeftHandle(this),
      new RightHandle(this),
      new TopHandle(this),
      new BottomHandle(this),
      new UpperLeftHandle(this),
      new UpperRightHandle(this),
      new LowerLeftHandle(this),
      new LowerRightHandle(this),
      new RotationHandle(this)
    ];
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
