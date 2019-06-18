import { cos, sin } from 'mathjs';

import { Cursor } from './Cursor';
import { inferGuides } from './Guide';
import { Handle } from './Handle';
import { isInside } from './geometry';

export class Shape {
  constructor(x, y, width, height, color, rotation = 0, outline = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.rotation = rotation;
    this.isFocused = false;
    this.isDragging = false;
    this.outline = outline;
    this.handles = Handle.build(this);
    this.guides = [];
  }

  get top() {
    const { height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: this.x + sin(rotation) * hypotenuse,
      y: this.y - cos(rotation) * hypotenuse
    };
  }

  get left() {
    const { width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: this.x - cos(rotation) * hypotenuse,
      y: this.y - sin(rotation) * hypotenuse
    };
  }

  get right() {
    const { width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: this.x + cos(rotation) * hypotenuse,
      y: this.y + sin(rotation) * hypotenuse
    };
  }

  get bottom() {
    const { height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: this.x - sin(rotation) * hypotenuse,
      y: this.y + cos(rotation) * hypotenuse
    };
  }

  get topLeft() {
    const { left, height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: left.x + sin(rotation) * hypotenuse,
      y: left.y - cos(rotation) * hypotenuse
    };
  }

  get topRight() {
    const { top, width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: top.x + cos(rotation) * hypotenuse,
      y: top.y + sin(rotation) * hypotenuse
    };
  }

  get bottomRight() {
    const { right, height, rotation } = this;
    const hypotenuse = 0.5 * height;
    return {
      x: right.x - sin(rotation) * hypotenuse,
      y: right.y + cos(rotation) * hypotenuse
    };
  }

  get bottomLeft() {
    const { bottom, width, rotation } = this;
    const hypotenuse = 0.5 * width;
    return {
      x: bottom.x - cos(rotation) * hypotenuse,
      y: bottom.y - sin(rotation) * hypotenuse
    };
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
    const path = pathRectangle(this);
    context.fillStyle = this.color;
    context.fill(path);
    if (this.outline) {
      context.lineWidth = 2;
      context.strokeStyle = '#D9D9D9';
      context.stroke(path);
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
    return new Shape(x, y, width, height, color, rotation, outline);
  }

  isTouching(x, y) {
    return isInside({ x, y }, this);
  }

  toJSON() {
    const { x, y, width, height, color, rotation } = this;
    return { x, y, width, height, color, rotation };
  }

  static fromJSON({ x, y, width, height, color, rotation }) {
    return new Shape(x, y, width, height, color, rotation);
  }
}

export class Base extends Shape {
  constructor(x, y, width, height) {
    super(x, y, width, height, 'white', 0, true);
  }
}

function pathRectangle({ topLeft, topRight, bottomLeft, bottomRight }) {
  const path = new Path2D();
  path.moveTo(topLeft.x, topLeft.y);
  path.lineTo(topRight.x, topRight.y);
  path.lineTo(bottomRight.x, bottomRight.y);
  path.lineTo(bottomLeft.x, bottomLeft.y);
  path.lineTo(topLeft.x, topLeft.y);
  return path;
}
