import React, { Component } from 'react';
import equal from 'deep-equal';

import Canvas from './Canvas';
import FractalSkeleton from './FractalSkeleton';
import { draw } from '../graphics/blueprint.js';
import { getContext, clear } from '../graphics/utilities';

class Blueprint extends Component {
  constructor() {
    super();
    this.state = { canvas: null, context: null };
  }

  componentDidUpdate(previousProps) {
    if (!equal(previousProps, this.props)) {
      this.draw();
    }
  }

  draw = () => {
    const { canvas, context } = this.state;
    const { fractal } = this.props;
    if (context) {
      clear(canvas, context);
      draw(canvas, context, fractal.body);
    }
  };

  handleCanvas = canvas => {
    if (canvas) {
      const context = getContext(canvas);
      this.setState({ canvas, context }, this.draw);
    }
  };

  render() {
    const { fractal, width, height } = this.props;
    if (!fractal || !fractal.body || !fractal.body.parent) {
      return <FractalSkeleton size={width} />;
    }
    return <Canvas width={width} height={height} onRef={this.handleCanvas} />;
  }
}

export default Blueprint;
