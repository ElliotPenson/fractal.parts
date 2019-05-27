import React, { Component } from 'react';

import Canvas from './Canvas';
import { draw } from '../graphics/attractor';

class Attractor extends Component {
  constructor() {
    super();
    this.state = { canvas: null };
  }

  render() {
    const { fractal, width, height } = this.props;
    const { canvas } = this.state;
    if (!fractal) {
      return null;
    }
    if (canvas) {
      draw(canvas, fractal);
    }
    return (
      <Canvas
        width={width}
        height={height}
        onRef={canvas => this.setState({ canvas })}
      />
    );
  }
}

export default Attractor;
