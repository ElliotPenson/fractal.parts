/**
 * Enumerated keyboard keys. The values in this object correspond with DOM event
 * attributes.
 */
export const Key = Object.freeze({
  BACKSPACE: 'backspace',
  CLEAR: 'clear',
  DELETE: 'delete',
  DEL: 'del',
  CONTROL: 'ctrlKey',
  ALT: 'altKey',
  SHIFT: 'shiftKey',
  META: 'metaKey'
});

export function isDeletion(key) {
  return [Key.BACKSPACE, Key.CLEAR, Key.DELETE, Key.DEL].includes(key);
}

/**
 * Lazily remove all items from a collection where predicate returns false.
 * @param {function} predicate
 * @param {Iterator|Generator} generator
 * @returns {Generator} A new generator
 */
export function* filter(predicate, generator) {
  for (const item of generator) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function reverse(array) {
  return array.slice(0).reverse();
}

export function getContext(canvas) {
  const context = canvas.getContext('2d');
  correctPixels(canvas, context);
  return context;
}

/**
 * Avoid a blurry canvas on HiDPI (retina) displays. Scale up to
 * devicePixelRatio then scale down with CSS.
 */
function correctPixels(canvas, context) {
  const { width, height } = canvas;
  const pixelRatio = getPixelRatio();
  canvas.width *= pixelRatio;
  canvas.height *= pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.scale(pixelRatio, pixelRatio);
}

/**
 * Find the 'actual' pixel width/height of a canvas. This function reverses any
 * scaling done for retina displays.
 * @param {HTMLCanvasElement} canvas
 * @returns {{ width: number, height: number }}
 */
export function getCanvasSize(canvas) {
  const { width, height } = canvas;
  const pixelRatio = getPixelRatio();
  return {
    width: width / pixelRatio,
    height: height / pixelRatio
  };
}

/**
 * Find the ration of device pixels to CSS pixels. Default to 1 if not found.
 * @returns {number}
 */
function getPixelRatio() {
  return (
    window.devicePixelRatio ||
    window.webkitDevicePixelRatio ||
    window.mozDevicePixelRatio ||
    1
  );
}
