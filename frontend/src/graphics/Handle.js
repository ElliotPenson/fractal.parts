import * as math from 'mathjs';

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
    context.fillStyle = fillColor;
    context.fillRect(x - size * 0.5, y - size * 0.5, size, size);
    context.lineWidth = 1;
    context.fillStyle = strokeColor;
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
}

export class LeftHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x, y: parent.y + parent.height * 0.5 };
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.x = this.parent.x + deltaX;
      this.parent.width = this.parent.width - deltaX;
    }
  }
}

export class RightHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x + parent.width, y: parent.y + parent.height * 0.5 };
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.width = this.parent.width + deltaX;
    }
  }
}

export class TopHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x + parent.width * 0.5, y: parent.y };
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.y = this.parent.y + deltaY;
      this.parent.height = this.parent.height - deltaY;
    }
  }
}

export class BottomHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x + parent.width * 0.5, y: parent.y + parent.height };
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.height = this.parent.height + deltaY;
    }
  }
}

export class UpperLeftHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x, y: parent.y };
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

export class UpperRightHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x + parent.width, y: parent.y };
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.y = this.parent.y + deltaY;
      this.parent.height = this.parent.height - deltaY;
      this.parent.width = this.parent.width + deltaX;
    }
  }
}

export class LowerLeftHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x, y: parent.y + parent.height };
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.x = this.parent.x + deltaX;
      this.parent.width = this.parent.width - deltaX;
      this.parent.height = this.parent.height + deltaY;
    }
  }
}

export class LowerRightHandle extends Handle {
  get center() {
    const { parent } = this;
    return { x: parent.x + parent.width, y: parent.y + parent.height };
  }

  moveMouse(deltaX, deltaY) {
    if (this.isDragging) {
      this.parent.width = this.parent.width + deltaX;
      this.parent.height = this.parent.height + deltaY;
    }
  }
}

export class RotationHandle extends Handle {
  constructor(parent, offset = 25) {
    super(parent);
    this.offset = offset;
  }

  get center() {
    const { parent, offset } = this;
    return { x: parent.x + parent.width * 0.5, y: parent.y - offset };
  }

  moveMouse(deltaX, deltaY, x, y) {
    if (this.isDragging) {
      const [centerX, centerY] = this.parent.center;
      const opposite = x - centerX;
      const adjacent = centerY - y;
      this.parent.rotation = math.atan2(opposite, adjacent);
    }
  }
}
