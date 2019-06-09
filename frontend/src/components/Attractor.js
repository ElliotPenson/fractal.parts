import React, { Component } from 'react';

import Canvas from './Canvas';
import { draw } from '../graphics/attractor';
import { getContext } from '../graphics/utilities';

class Attractor extends Component {
  constructor() {
    super();
    this.state = { context: null };
  }

  handleCanvas = canvas => {
    const context = getContext(canvas);
    this.setState({ context });
  };

  render() {
    const { fractal, width, height } = this.props;
    const { context } = this.state;
    if (!fractal) {
      return null;
    }
    if (context) {
      draw(context, fractal);
    }
    return <Canvas width={width} height={height} onRef={this.handleCanvas} />;
  }
}

export default Attractor;
