import { filter } from './utilities';

const threshold = 10;

export class Guide {
  constructor(movingShape, stillShape) {
    this.movingShape = movingShape;
    this.stillShape = stillShape;
  }

  draw(context) {
    throw new Error('Not implemented');
  }

  apply(shape) {
    throw new Error('Not implemented');
  }
}

class xGuide extends Guide {
  constructor(x, movingShape, stillShape) {
    super(movingShape, stillShape);
    this.x = x;
  }

  draw(context) {
    const { x, movingShape, stillShape } = this;
    const y = yRange(movingShape, stillShape);
    drawLine(x, Math.min(...y), x, Math.max(...y), context);
  }
}

class yGuide extends Guide {
  constructor(y, movingShape, stillShape) {
    super(movingShape, stillShape);
    this.y = y;
  }

  draw(context) {
    const { y, movingShape, stillShape } = this;
    const x = xRange(movingShape, stillShape);
    drawLine(Math.min(...x), y, Math.max(...x), y, context);
  }
}

class LeftGuide extends xGuide {
  get displacement() {
    return this.x - this.movingShape.x;
  }

  apply(shape) {
    shape.x = this.x;
  }
}

class XCenterGuide extends xGuide {
  get displacement() {
    return this.x - this.movingShape.center.x;
  }

  apply(shape) {
    shape.x = this.x - shape.width / 2;
  }
}

class RightGuide extends xGuide {
  get displacement() {
    return this.x - this.movingShape.right;
  }

  apply(shape) {
    shape.x = this.x - shape.width;
  }
}

class TopGuide extends yGuide {
  get displacement() {
    return this.y - this.movingShape.y;
  }

  apply(shape) {
    shape.y = this.y;
  }
}

class YCenterGuide extends yGuide {
  get displacement() {
    return this.y - this.movingShape.center.y;
  }

  apply(shape) {
    shape.y = this.y - shape.height / 2;
  }
}

class BottomGuide extends yGuide {
  get displacement() {
    const { y, movingShape } = this;
    return y - this.movingShape.bottom;
  }

  apply(shape) {
    shape.y = this.y - shape.height;
  }
}

export function inferGuides(shapes) {
  const moving = shapes.find(shape => shape.isDragging);
  const still = shapes.filter(shape => !shape.isDragging);
  let xGuides = closerThan(threshold, generateXGuides(moving, still));
  let yGuides = closerThan(threshold, generateYGuides(moving, still));
  return [...findClosest(xGuides), ...findClosest(yGuides)];
}

function* generateXGuides(movingShape, stillShapes) {
  for (const stillShape of stillShapes) {
    for (const x of xRange(stillShape)) {
      yield new LeftGuide(x, movingShape, stillShape);
      yield new XCenterGuide(x, movingShape, stillShape);
      yield new RightGuide(x, movingShape, stillShape);
    }
  }
}

function* generateYGuides(movingShape, stillShapes) {
  for (const stillShape of stillShapes) {
    for (const y of yRange(stillShape)) {
      yield new TopGuide(y, movingShape, stillShape);
      yield new YCenterGuide(y, movingShape, stillShape);
      yield new BottomGuide(y, movingShape, stillShape);
    }
  }
}

function closerThan(threshold, guides) {
  return filter(guide => Math.abs(guide.displacement) <= threshold, guides);
}

function findClosest(guides) {
  return Array.from(guides).reduce((closest, guide) => {
    if (closest.length === 0 || isCloser(guide, closest[0])) {
      return [guide];
    } else if (guide.displacement === closest[0].displacement) {
      return [...closest, guide];
    } else {
      return closest;
    }
  }, []);
}

function isCloser(guide1, guide2) {
  return Math.abs(guide1.displacement) < Math.abs(guide2.displacement);
}

/**
 * Find key (left, center, right) x-values in collection of Shape objects.
 * @param {[Shape]} shapes
 */
function xRange(...shapes) {
  return shapes.reduce((range, shape) => {
    const { x, width } = shape.withGuides();
    return [...range, x, x + width / 2, x + width];
  }, []);
}

/**
 * Find key (top, center, bottom) y-values in collection of Shape objects.
 * @param {[Shape]} shapes
 */
function yRange(...shapes) {
  return shapes.reduce((range, shape) => {
    const { y, height } = shape.withGuides();
    return [...range, y, y + height / 2, y + height];
  }, []);
}

function drawLine(x1, y1, x2, y2, context) {
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(x1 + 0.5, y1 + 0.5);
  context.lineTo(x2 + 0.5, y2 + 0.5);
  context.stroke();
}
