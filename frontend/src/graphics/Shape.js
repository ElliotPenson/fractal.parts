import { Cursor } from './Cursor';
import { inferGuides } from './Guide';
import { Transformation } from './Transformation';
import { Handle } from './Handle';

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

  drawBody(context) {
    context.save();
    if (this.outline) {
      this.drawOutline(context);
    }
    this.drawRectangle(context);
    context.restore();
  }

  drawRectangle(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  drawOutline(context) {
    context.lineWidth = 2;
    context.strokeStyle = '#D9D9D9';
    context.strokeRect(this.x, this.y, this.width, this.height);
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
    [deltaX, deltaY] = this.transformation.localizeDelta(deltaX, deltaY, x, y);
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

  clone() {
    const { x, y, width, height, color, rotation, outline } = this;
    return new Shape(x, y, width, height, color, rotation, outline);
  }

  isTouching(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
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
