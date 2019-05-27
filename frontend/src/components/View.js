import React, { Component } from 'react';
import { Typography } from 'antd';

import NotFound from './NotFound';
import Attractor from './Attractor';
import { get } from '../api';

import './View.css';

const { Title } = Typography;

class View extends Component {
  constructor() {
    super();
    this.state = { fractal: null, status: null };
  }

  async componentDidMount() {
    const { pathname } = this.props.location;
    const key = pathname.slice(1);
    try {
      const { data, status } = await get(key);
      this.setState({ fractal: data, status });
    } catch (error) {
      const { status } = error.response;
      this.setState({ status });
    }
  }

  render() {
    const { fractal, status } = this.state;
    if (status === 404) {
      return <NotFound />;
    } else if (!fractal) {
      return null;
    } else {
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
}

export default View;
