import { atan2, cos, round, sin } from 'mathjs';

import { Rectangle } from './geometry';
import { Cursor, rotateCursor } from './Cursor';

const size = 6;
const fillColor = 'white';
const strokeColor = 'black';

export class Handle {
  constructor(parent) {
    this.parent = parent;
    this.isDragging = false;
  }

  draw(context) {
    const { path } = this.shape;
    context.fillStyle = fillColor;
    context.fill(path);
    context.lineWidth = 1;
    context.strokeStyle = strokeColor;
    context.stroke(path);
  }

  pressMouse(x, y, consumed) {
    if (!consumed && this.isTouching(x, y)) {
      this.isDragging = true;
      consumed = true;
    }
    return consumed;
  }

  liftMouse() {
    this.isDragging = false;
  }

  isTouching(x, y) {
    return this.shape.isTouching(x, y);
  }

  static build(shape) {
    return [
      new LeftHandle(shape),
      new RightHandle(shape),
      new TopHandle(shape),
      new BottomHandle(shape),
      new TopLeftHandle(shape),
      new TopRightHandle(shape),
      new BottomLeftHandle(shape),
      new BottomRightHandle(shape),
      new RotationHandle(shape)
    ];
  }
}

class LeftHandle extends Handle {
  get shape() {
    const { left, rotation } = this.parent;
    return new Rectangle(left.x, left.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.EW_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.x = this.parent.x + deltaX;
      this.parent.width = this.parent.width - deltaX;
    }
  }
}

class RightHandle extends Handle {
  get shape() {
    const { right, rotation } = this.parent;
    return new Rectangle(right.x, right.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.EW_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY, x, y) {
    if (this.isDragging) {
      this.parent.width = this.parent.width + deltaX;
    }
  }
}

class TopHandle extends Handle {
  get shape() {
    const { top, rotation } = this.parent;
    return new Rectangle(top.x, top.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.NS_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.y = this.parent.y + deltaY;
      this.parent.height = this.parent.height - deltaY;
    }
  }
}

class BottomHandle extends Handle {
  get shape() {
    const { bottom, rotation } = this.parent;
    return new Rectangle(bottom.x, bottom.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.NS_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.height = this.parent.height + deltaY;
    }
  }
}

class TopLeftHandle extends Handle {
  get shape() {
    const { topLeft, rotation } = this.parent;
    return new Rectangle(topLeft.x, topLeft.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.NWSE_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.x = this.parent.x + deltaX;
      this.parent.y = this.parent.y + deltaY;
      this.parent.width = this.parent.width - deltaX;
      this.parent.height = this.parent.height - deltaY;
    }
  }
}

class TopRightHandle extends Handle {
  get shape() {
    const { topRight, rotation } = this.parent;
    return new Rectangle(topRight.x, topRight.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.NESW_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.y = this.parent.y + deltaY;
      this.parent.height = this.parent.height - deltaY;
      this.parent.width = this.parent.width + deltaX;
    }
  }
}

class BottomLeftHandle extends Handle {
  get shape() {
    const { bottomLeft, rotation } = this.parent;
    return new Rectangle(bottomLeft.x, bottomLeft.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.NESW_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.x = this.parent.x + deltaX;
      this.parent.width = this.parent.width - deltaX;
      this.parent.height = this.parent.height + deltaY;
    }
  }
}

class BottomRightHandle extends Handle {
  get shape() {
    const { bottomRight, rotation } = this.parent;
    return new Rectangle(bottomRight.x, bottomRight.y, size, size, rotation);
  }

  get cursor() {
    return rotateCursor(Cursor.NWSE_RESIZE, this.parent.rotation);
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.width = this.parent.width + deltaX;
      this.parent.height = this.parent.height + deltaY;
    }
  }
}

class RotationHandle extends Handle {
  constructor(parent, offset = 25) {
    super(parent);
    this.offset = offset;
  }

  get shape() {
    const { top, rotation } = this.parent;
    const x = top.x + sin(rotation) * this.offset;
    const y = top.y - cos(rotation) * this.offset;
    return new Rectangle(x, y, size, size, rotation);
  }

  get center() {
    const { parent, offset } = this;
    return {
      x: parent.top.x + sin(parent.rotation) * offset,
      y: parent.top.y - cos(parent.rotation) * offset
    };
  }

  get cursor() {
    return Cursor.CROSSHAIR;
  }

  moveMouse(deltaX, deltaY, x, y) {
    if (this.isDragging) {
      const { x: centerX, y: centerY } = this.parent;
      const opposite = x - centerX;
      const adjacent = centerY - y;
      this.parent.rotation = atan2(opposite, adjacent);
    }
  }
}
