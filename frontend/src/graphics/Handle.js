import { atan2, round } from 'mathjs';

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
    let { x, y } = this.center;
    [x, y] = [round(x), round(y)];
    context.fillStyle = fillColor;
    context.fillRect(x - size * 0.5, y - size * 0.5, size, size);
    context.lineWidth = 1;
    context.strokeStyle = strokeColor;
    context.strokeRect(x - size * 0.5 + 0.5, y - size * 0.5 + 0.5, size, size);
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
    let { x: centerX, y: centerY } = this.center;
    return (
      x <= centerX + size &&
      x >= centerX - size &&
      y <= centerY + size &&
      y >= centerY - size
    );
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
  get center() {
    return this.parent.left;
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
  get center() {
    return this.parent.right;
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
  get center() {
    return this.parent.top;
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
  get center() {
    return this.parent.bottom;
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
  get center() {
    return this.parent.topLeft;
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
  get center() {
    return this.parent.topRight;
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
  get center() {
    return this.parent.bottomLeft;
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
  get center() {
    return this.parent.bottomRight;
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

  get center() {
    const { parent, offset } = this;
    return { x: parent.top.x, y: parent.top.y - offset };
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
