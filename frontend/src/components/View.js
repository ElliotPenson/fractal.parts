import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import { Skeleton, Switch } from 'antd';

import Navbar from './Navbar';
import NotFound from './NotFound';
import Attractor from './Attractor';
import Blueprint from './Blueprint';
import { success } from './notifications';
import { get } from '../api';

import './View.css';

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
    } else {
      const { title, created_at, views } = fractal || {};
      const width = window.innerWidth - 500;
      const height = window.innerHeight - 500;
      return (
        <div className="View">
          <Navbar />
          <div className="View-body">
            <div className="View-header">
              <Skeleton
                active
                loading={fractal == null}
                paragraph={{ rows: 1 }}
              >
                <div className="View-title">
                  <h1>{title}</h1>
                  <p>
                    Created <TimeAgo date={created_at} live={false} />. Viewed{' '}
                    {views} time
                    {views === 1 ? '' : 's'}.
                  </p>
                </div>

                <Switch
                  loading={fractal == null}
                  checkedChildren="Attractor"
                  unCheckedChildren="Template"
                  checked={!this.state.showBlueprint}
                  onChange={() =>
                    this.setState(({ showBlueprint }) => ({
                      showBlueprint: !showBlueprint
                    }))
                  }
                />
              </Skeleton>
            </div>
            <div className={this.state.showBlueprint ? 'hide' : ''}>
              <Attractor width={width} height={height} fractal={fractal} />
            </div>
            <div className={this.state.showBlueprint ? '' : 'hide'}>
              <Blueprint width={width} height={height} fractal={fractal} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default View;
