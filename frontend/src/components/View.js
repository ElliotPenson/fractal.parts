import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import { Switch, Typography } from 'antd';

import NotFound from './NotFound';
import Attractor from './Attractor';
import Blueprint from './Blueprint';
import { success } from './notifications';
import { get } from '../api';

import './View.css';

const { Title } = Typography;

class View extends Component {
  constructor() {
    super();
    this.state = { fractal: null, status: null, showBlueprint: false };
  }

  async componentDidMount() {
    try {
      const { data, status } = await get(this.parseKey());
      this.setState({ fractal: data, status });
      if (this.justPublished()) {
        this.displaySuccess();
      }
    } catch (error) {
      console.log(error);
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
    success(
      'Successfully published!',
      `Your fractal is permanently available at fractal.parts/${key}.`
    );
  }

  render() {
    const { fractal, status } = this.state;
    if (status === 404) {
      return <NotFound />;
    } else if (!fractal) {
      return null;
    } else {
      const { title, created_at, views } = fractal;
      const width = window.innerWidth - 500;
      const height = window.innerHeight - 500;
      return (
        <div className="View">
          <div className="View-header">
            <div className="View-title">
              <Title>{title}</Title>
              <p>
                Created <TimeAgo date={created_at} live={false} />. Viewed{' '}
                {views} time
                {views === 1 ? '' : 's'}.
              </p>
            </div>
            <Switch
              checkedChildren="Attractor"
              unCheckedChildren="Template"
              checked={!this.state.showBlueprint}
              onChange={() =>
                this.setState(({ showBlueprint }) => ({
                  showBlueprint: !showBlueprint
                }))
              }
            />
          </div>
          <div className={this.state.showBlueprint ? 'hide' : ''}>
            <Attractor width={width} height={height} fractal={fractal} />
          </div>
          <div className={this.state.showBlueprint ? '' : 'hide'}>
            <Blueprint width={width} height={height} fractal={fractal} />
          </div>
        </div>
      );
    }
  }
}

export default View;
