import React, { Component } from 'react';

class Create extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillRect(100, 100, 200, 200);
  }

  render() {
    return (
      <div className="Create">
        <p>Create fractal</p>
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

export default Create;
