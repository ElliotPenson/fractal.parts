import { oscillate } from '../Sierpinski';

describe('oscillate', () => {
  it('starts at max', () => {
    const max = 10;
    const generator = oscillate(0, max);
    expect(generator.next().value).toEqual(max);
  });

  it('flips between min and max', () => {
    const generator = oscillate(1, 3);
    expect(generator.next().value).toEqual(3);
    expect(generator.next().value).toEqual(2);
    expect(generator.next().value).toEqual(1);
    expect(generator.next().value).toEqual(2);
    expect(generator.next().value).toEqual(3);
    expect(generator.next().value).toEqual(2);
    expect(generator.next().value).toEqual(1);
  });
});
