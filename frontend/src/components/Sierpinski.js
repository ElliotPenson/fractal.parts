import React, { Component } from 'react';

import Attractor from './Attractor';

const renderMethod = 'progressive';
const sierpinskiTriangle = {
  parent: { x: 0, y: 0, width: 10, height: 10, rotation: 0 },
  children: [
    { x: 2.5, y: 0, width: 5, height: 5, rotation: 0 },
    { x: 0, y: 5, width: 5, height: 5, rotation: 0 },
    { x: 5, y: 5, width: 5, height: 5, rotation: 0 }
  ]
};

class Sierpinski extends Component {
  constructor() {
    super();
    this.state = {
      iterations: 7,
      reducingIterations: true
    };
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  update() {
    const { iterations } = this.state;
    const delay = [0, 400, 150, 100, 100, 100, 100, 4000][iterations];
    this.timer = setTimeout(() => {
      this.step();
      this.update();
    }, delay);
  }

  step() {
    this.setState(({ iterations, reducingIterations }) => {
      if (reducingIterations) {
        iterations -= 1;
        reducingIterations = iterations !== 1;
      } else {
        iterations += 1;
        reducingIterations = iterations === 7;
      }
      return { iterations: iterations % 8, reducingIterations };
    });
  }

  getFractal() {
    let { iterations } = this.state;
    const { parent, children } = sierpinskiTriangle;
    iterations = Math.round(iterations);
    return {
      body: { settings: { iterations, renderMethod }, parent, children }
    };
  }

  render() {
    const fractal = this.getFractal();
    return <Attractor fractal={fractal} width={250} height={250} />;
  }
}

export default Sierpinski;
