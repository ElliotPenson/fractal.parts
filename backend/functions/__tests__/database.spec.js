const { parseSort } = require('../database');

describe('parseSort', () => {
  it('returns asc by default', () => {
    const [_, direction] = parseSort('views');
    expect(direction).toEqual('asc');
  });

  it('returns "asc" for a "+" prefix', () => {
    const [_, direction] = parseSort('+views');
    expect(direction).toEqual('asc');
  });

  it('returns "desc" for a "-" prefix', () => {
    const [_, direction] = parseSort('-views');
    expect(direction).toEqual('desc');
  });

  it('removes the "+" prefix', () => {
    const [column, _] = parseSort('+views');
    expect(column).toEqual('views');
  });

  it('removes the "-" prefix', () => {
    const [column, _] = parseSort('-views');
    expect(column).toEqual('views');
  });
});
