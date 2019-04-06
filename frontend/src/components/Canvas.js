import React, { Component } from 'react';

import './Canvas.css';

class Canvas extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { width, height, onRef } = this.props;
    return <canvas {...{ width, height }} ref={onRef} />;
  }
}

export default Canvas;
