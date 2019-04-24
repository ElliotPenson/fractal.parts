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
