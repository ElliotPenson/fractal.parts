import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import { notification, Typography } from 'antd';

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
    try {
      const { data, status } = await get(this.parseKey());
      this.setState({ fractal: data, status });
      if (this.justPublished()) {
        this.displaySuccess();
      }
    } catch (error) {
      this.setState({ status: error.response.status });
    }
  }

  parseKey() {
    const { pathname } = this.props.location;
    return pathname.slice(1);
  }

  justPublished() {
    const { state } = this.props.location;
    return state && state.justPublished;
  }

  displaySuccess() {
    const key = this.parseKey();
    notification.success({
      message: 'Successfully published!',
      description: `Your fractal is permanently available at fractal.parts/${key}.`,
      duration: null // don't close automatically.
    });
  }

  render() {
    const { fractal, status } = this.state;
    if (status === 404) {
      return <NotFound />;
    } else if (!fractal) {
      return null;
    } else {
      const { title, created_at, views } = fractal;
      return (
        <div className="View">
          <Title>{title}</Title>
          <p>
            Created <TimeAgo date={created_at} live={false} />. Viewed {views}{' '}
            time{views === 1 ? '' : 's'}.
          </p>
          <Attractor
            width={window.innerWidth}
            height={window.innerHeight}
            fractal={fractal}
          />
        </div>
      );
    }
  }
}

export default View;
