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

export function convertToRadians(degrees) {
  return (Math.PI / 180) * degrees;
}

export function convertToDegrees(radians) {
  return (180 / Math.PI) * radians;
}

/**
 * Find the ration of device pixels to CSS pixels. Default to 1 if not found.
 * @returns {number}
 */
export function getPixelRatio(context) {
  return (
    window.devicePixelRatio ||
    window.webkitDevicePixelRatio ||
    window.mozDevicePixelRatio ||
    1
  );
}
