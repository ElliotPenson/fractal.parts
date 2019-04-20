import { Cursor, useCursor, rotateCursor } from '../Cursor';

describe('useCursor', () => {
  it('sets the cursor as a style on the given element', () => {
    const element = { style: {} };
    useCursor(element, Cursor.MOVE);
    expect(element.style.cursor).toEqual(Cursor.MOVE);
  });

  it('throws an error if no cursor is given', () => {
    const element = { style: {} };
    expect(() => useCursor(element)).toThrowError();
    expect(() => useCursor(element, null)).toThrowError();
    expect(() => useCursor(element, Cursor.FAKE)).toThrowError();
  });
});

describe('rotateCursor', () => {
  it('does not change cursors with no rotation', () => {
    expect(rotateCursor(Cursor.EW_RESIZE)).toEqual(Cursor.EW_RESIZE);
    expect(rotateCursor(Cursor.NS_RESIZE)).toEqual(Cursor.NS_RESIZE);
    expect(rotateCursor(Cursor.NESW_RESIZE)).toEqual(Cursor.NESW_RESIZE);
    expect(rotateCursor(Cursor.NWSE_RESIZE)).toEqual(Cursor.NWSE_RESIZE);
  });

  it('cycles through resize cursors', () => {
    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI * 0.25)).toEqual(
      Cursor.NESW_RESIZE
    );
    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI * 0.5)).toEqual(
      Cursor.EW_RESIZE
    );
    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI * 0.75)).toEqual(
      Cursor.NWSE_RESIZE
    );
    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI)).toEqual(Cursor.NS_RESIZE);

    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI * 1.25)).toEqual(
      Cursor.NESW_RESIZE
    );
    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI * 1.5)).toEqual(
      Cursor.EW_RESIZE
    );
    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI * 1.75)).toEqual(
      Cursor.NWSE_RESIZE
    );
    expect(rotateCursor(Cursor.NS_RESIZE, Math.PI * 2)).toEqual(
      Cursor.NS_RESIZE
    );
  });
});
