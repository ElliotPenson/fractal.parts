import {
  LeftHandle,
  RightHandle,
  TopHandle,
  BottomHandle,
  UpperLeftHandle,
  UpperRightHandle,
  LowerLeftHandle,
  LowerRightHandle
} from './Handle';

export class Shape {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isClicked = false;
    this.isDragging = false;
    this.handles = this.createHandles();
  }

  draw(context) {
    if (this.isClicked) {
      this.handles.forEach(handle => handle.draw(context));
    }
  }

  clone() {
    throw new Error('Not implemented');
  }

  pressMouse(x, y, consumed) {
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

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.x += deltaX;
      this.y += deltaY;
    }
    this.handles.forEach(handle => handle.moveMouse(deltaX, deltaY));
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
      new LowerRightHandle(this)
    ];
  }
}
