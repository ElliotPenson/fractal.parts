import React, { Component } from 'react';

import Canvas from './Canvas';
import { clear, draw } from '../graphics/attractor';
import { getContext } from '../graphics/utilities';

class Attractor extends Component {
  constructor() {
    super();
    this.state = { canvas: null, context: null };
  }

  handleCanvas = canvas => {
    if (canvas) {
      const context = getContext(canvas);
      this.setState({ canvas, context });
    }
  };

  render() {
    const { fractal, width, height } = this.props;
    const { canvas, context } = this.state;
    if (!fractal || !fractal.body || !fractal.body.parent) {
      return null;
    }
    if (context) {
      clear(canvas, context);
      draw(canvas, context, fractal.body);
    }
    return <Canvas width={width} height={height} onRef={this.handleCanvas} />;
  }
}

export default Attractor;
