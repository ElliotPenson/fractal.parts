import React, { Component } from 'react';
import { Typography } from 'antd';

import Attractor from './Attractor';
import { get } from '../api';

import './View.css';

const { Title } = Typography;

class View extends Component {
  constructor() {
    super();
    this.state = { fractal: null };
  }

  async componentDidMount() {
    const { pathname } = this.props.location;
    const key = pathname.slice(1);
    try {
      const { data } = await get(key);
      this.setState({ fractal: data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { fractal } = this.state;
    if (!fractal) {
      return null;
    }
    return (
      <div className="View">
        <Title>{fractal.title}</Title>
        <p>with {fractal.views} views</p>
        <Attractor
          width={window.innerWidth}
          height={window.innerHeight}
          fractal={fractal.body}
        />
      </div>
    );
  }
}

export default View;
