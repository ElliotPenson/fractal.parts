const { makeKey } = require('../create');

describe('makeKey', () => {
  it('removes whitespace', () => {
    expect(makeKey('   key')).toEqual('key');
    expect(makeKey('   key ')).toEqual('key');
    expect(makeKey('   key   ')).toEqual('key');
  });

  it('converts to lowercase', () => {
    expect(makeKey('KEY')).toEqual('key');
    expect(makeKey('LonGkEy')).toEqual('longkey');
  });

  it('removes special characters', () => {
    expect(makeKey('(key)')).toEqual('key');
    expect(makeKey('key!!')).toEqual('key');
    expect(makeKey('%*$&(*key$%^&(')).toEqual('key');
  });

  it('replaces inner spaces with dashes', () => {
    expect(makeKey('this is a title')).toEqual('this-is-a-title');
    expect(makeKey('My Beautiful Fractal')).toEqual('my-beautiful-fractal');
  });
});
