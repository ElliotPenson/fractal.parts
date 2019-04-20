export const Cursor = Object.freeze({
  AUTO: 'auto',
  MOVE: 'move',
  CROSSHAIR: 'crosshair',
  EW_RESIZE: 'ew-resize',
  NS_RESIZE: 'ns-resize',
  NESW_RESIZE: 'nesw-resize',
  NWSE_RESIZE: 'nwse-resize'
});

const cursor_cycle = [
  Cursor.NS_RESIZE,
  Cursor.NESW_RESIZE,
  Cursor.EW_RESIZE,
  Cursor.NWSE_RESIZE
];

export function useCursor(element, cursor) {
  if (cursor) {
    element.style.cursor = cursor;
  } else {
    throw new Error('No cursor given');
  }
}

export function rotateCursor(cursor, rotation = 0) {
  if (rotation < 0) {
    return rotateCursor(cursor, rotation + Math.PI);
  }
  const jump = Math.round(rotation / (Math.PI / 4));
  const current_position = cursor_cycle.indexOf(cursor);
  return cursor_cycle[(current_position + jump) % cursor_cycle.length];
}
