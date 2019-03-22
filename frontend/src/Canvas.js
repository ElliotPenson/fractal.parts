import React, { Component } from 'react';

import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleRef(element) {
    if (element) {
      const context = element.getContext('2d');
      this.props.onContext(context);
    }
  }

  render() {
    console.log(this.props);
    const { width, height } = this.props;
    return <canvas {...{ width, height }} ref={this.handleRef} />;
  }
}

export default Canvas;
