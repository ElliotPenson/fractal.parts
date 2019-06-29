const eventTypes = [
  ['touchstart', 'mousedown'],
  ['touchend', 'mouseup'],
  ['touchmove', 'mousemove']
];

const listeners = {};

/**
 * Set touch event listeners that emit mouse events.
 * @param {HTMLCanvasElement} canvas
 */
export function enableTouch(canvas) {
  for (const [touchEventType, mouseEventType] of eventTypes) {
    const listener = makeListener(mouseEventType, canvas);
    listeners[touchEventType] = listener;
    window.addEventListener(touchEventType, listener, { passive: false });
  }
}

export function disableTouch(canvas) {
  for (const eventType of Object.keys(listeners)) {
    const listener = listeners[eventType];
    window.removeEventListener(eventType, listener);
  }
}

function makeListener(mouseEventType, canvas) {
  return event => {
    const mouseEvent = new MouseEvent(mouseEventType, findPosition(event));
    window.dispatchEvent(mouseEvent);
    if (event.target === canvas) {
      // Stop other events (like scroll) from propagating.
      event.preventDefault();
    }
  };
}

function findPosition(touchEvent) {
  const { touches } = touchEvent;
  if (touches.length > 0) {
    const { clientX, clientY } = touches[0];
    return { clientX, clientY };
  } else {
    return {};
  }
}
