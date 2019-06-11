const eventTypes = [
  ['touchstart', 'mousedown'],
  ['touchend', 'mouseup'],
  ['touchmove', 'mousemove']
];

const listeners = {};
let lastPosition = null;

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
    const mouseEvent = buildMouseEvent(event, mouseEventType);
    window.dispatchEvent(mouseEvent);
    if (event.target === canvas) {
      event.preventDefault(); // prevent scrolling
    }
    const position = findPosition(event);
    lastPosition = { ...position };
  };
}

function buildMouseEvent(touchEvent, mouseEventType) {
  return new MouseEvent(mouseEventType, {
    ...findPosition(touchEvent),
    ...findMovement(touchEvent)
  });
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

function findMovement(touchEvent) {
  if (lastPosition) {
    const currentPosition = findPosition(touchEvent);
    console.log(currentPosition.clientX - lastPosition.clientX);
    return {
      movementX: currentPosition.clientX - lastPosition.clientX,
      movementY: currentPosition.clientY - lastPosition.clientY
    };
  } else {
    return {};
  }
}
