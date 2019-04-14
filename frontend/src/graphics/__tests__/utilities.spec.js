import { reverse, convertToRadians } from '../utilities';

describe('reverse', () => {
  it('should ignore the empty array', () => {
    expect(reverse([])).toEqual([]);
  });

  it('should reverse an array', () => {
    expect(reverse([1])).toEqual([1]);
    expect(reverse([1, 2])).toEqual([2, 1]);
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
    expect(reverse([1, 1, 3])).toEqual([3, 1, 1]);
  });
});

describe('convertToRadians', () => {
  it('should return zero radians for zero degrees', () => {
    expect(convertToRadians(0)).toEqual(0);
  });

  it('should return π/2 for 90 degrees', () => {
    expect(convertToRadians(90)).toEqual(Math.PI / 2);
  });

  it('should return π for 180 degrees', () => {
    expect(convertToRadians(180)).toEqual(Math.PI);
  });
});
