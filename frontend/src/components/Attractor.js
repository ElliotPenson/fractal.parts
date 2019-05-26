import React from 'react';

import Canvas from './Canvas';
import { draw } from '../graphics/attractor';

function Attractor({ width, height, fractal }) {
  if (fractal) {
    return (
      <div className="Attractor">
        <Canvas
          width={width}
          height={height}
          onRef={canvas => canvas && draw(canvas, fractal)}
        />
      </div>
    );
  } else {
    return <div />;
  }
}

export default Attractor;
