import {
  filter,
  reverse,
  convertToRadians,
  convertToDegrees
} from '../utilities';

describe('filter', () => {
  it('creates an iterable', () => {
    expect(typeof filter()[Symbol.iterator]).toEqual('function');
  });

  it('accepts iterators', () => {
    expect(Array.from(filter(() => true, [1, 2, 3]))).toEqual([1, 2, 3]);
  });

  it('accepts generators', () => {
    const items = [1, 2, 3, 4, 5];
    const generator = function*() {
      for (const item of items) {
        yield item;
      }
    };
    expect(Array.from(filter(() => true, generator()))).toEqual(items);
  });

  it('ignores empty collections', () => {
    expect(Array.from(filter(() => true, []))).toEqual([]);
    expect(Array.from(filter(() => false, []))).toEqual([]);
  });

  it('filters elements when the predicate evaluates to false', () => {
    const all = [1, 2, 3, 4, 5, 6];
    const even = [2, 4, 6];
    const isEven = n => n % 2 === 0;
    expect(Array.from(filter(isEven, all))).toEqual(even);
  });
});

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
