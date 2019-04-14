import { reverse, convertToRadians, convertToDegrees } from '../utilities';

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

  it('should be reversed with convertToDegrees', () => {
    expect(convertToDegrees(convertToRadians(0))).toEqual(0);
    expect(convertToDegrees(convertToRadians(10))).toEqual(10);
    expect(convertToDegrees(convertToRadians(90))).toEqual(90);
    expect(convertToDegrees(convertToRadians(103))).toEqual(103);
  });
});

describe('convertToDegrees', () => {
  it('should return zero degrees for zero radians', () => {
    expect(convertToDegrees(0)).toEqual(0);
  });

  it('should return 90 degrees for π/2', () => {
    expect(convertToDegrees(Math.PI / 2)).toEqual(90);
  });

  it('should return 180 degrees for π', () => {
    expect(convertToDegrees(Math.PI)).toEqual(180);
  });

  it('should be reversed with convertToRadians', () => {
    expect(convertToRadians(convertToDegrees(0))).toEqual(0);
    expect(convertToRadians(convertToDegrees(Math.PI * 0.14))).toEqual(
      Math.PI * 0.14
    );
    expect(convertToRadians(convertToDegrees(Math.PI))).toEqual(Math.PI);
    expect(convertToRadians(convertToDegrees(Math.PI * 2.5))).toEqual(
      Math.PI * 2.5
    );
  });
});
