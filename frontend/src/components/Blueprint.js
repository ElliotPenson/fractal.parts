import React, { Component } from 'react';

import Canvas from './Canvas';
import { draw } from '../graphics/blueprint.js';
import { clear, getContext } from '../graphics/utilities';

class Blueprint extends Component {
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
    if (context) {
      clear(canvas, context);
      draw(canvas, context, fractal.body);
    }
    return <Canvas width={width} height={height} onRef={this.handleCanvas} />;
  }
}

export default Blueprint;
