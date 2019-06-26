import React, { Component } from 'react';

import Attractor from './Attractor';
import { fitToRange } from '../graphics/utilities';

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
    this.gen = oscillate(1, 7);
    this.state = { iterations: this.gen.next().value };
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
    const delay = [0, 400, 150, 100, 100, 100, 100, 3000][iterations];
    this.timer = setTimeout(() => {
      this.setState({ iterations: this.gen.next().value }, () => this.update());
    }, delay);
  }

  findSize() {
    const margin = 150;
    const [min, max] = [100, 350];
    return fitToRange(window.innerWidth - margin, [min, max]);
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
    const size = this.findSize();
    return <Attractor fractal={fractal} width={size} height={size} />;
  }
}

export function* oscillate(min, max) {
  let current = max;
  let reducing = true;
  while (true) {
    yield current;
    if (reducing) {
      current--;
      reducing = current !== min;
    } else {
      current++;
      reducing = current === max;
    }
  }
}

export default Sierpinski;
