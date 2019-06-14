const { validate } = require('../validation');

describe('validate', () => {
  it('returns true when a title and body are given', () => {
    const fractal = { title: 'example', body: '' };
    expect(validate(fractal)).toBeTruthy();
  });

  it('requires a title', () => {
    const fractal = { body: '' };
    expect(validate(fractal)).toBeFalsy();
  });

  it('requires a body', () => {
    const fractal = { title: 'abc' };
    expect(validate(fractal)).toBeFalsy();
  });

  it('requires a title with at least one alphanumeric character', () => {
    const titles = ['', '    ', '!', '%^&$(%'];
    for (const title of titles) {
      const fractal = { title, body: '' };
      expect(validate(fractal)).toBeFalsy();
    }
  });

  it('restricts the length of the title', () => {
    const longTitle = 'text'.repeat(100000);
    const fractal = { title: longTitle, body: '' };
    expect(validate(fractal)).toBeFalsy();
  });

  it('restricts the length of the title', () => {
    const longBody = 'text'.repeat(1000000);
    const fractal = { title: 'title', body: longBody };
    expect(validate(fractal)).toBeFalsy();
  });
});
