import { correct } from '../Path';

describe('correct', () => {
  it('adds 0.5 when line width is odd', () => {
    const lineWidths = [1, 3, 5];
    for (const lineWidth of lineWidths) {
      const [x, y] = [1, 2];
      expect(correct(x, y, lineWidth)).toEqual([x + 0.5, y + 0.5]);
    }
  });

  it('does not change x/y when line width is even', () => {
    const lineWidths = [0, 2, 4];
    for (const lineWidth of lineWidths) {
      const [x, y] = [1, 2];
      expect(correct(x, y, lineWidth)).toEqual([x, y]);
    }
  });
});
