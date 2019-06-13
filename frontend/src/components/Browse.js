import React, { Component } from 'react';
import { Col, Row } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import Card from './Card';
import SortDropdown, { Sort } from './SortDropdown';
import { list } from '../api';

import './Browse.css';

const pageSize = 6;

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: Sort.MOST_VIEWS,
      page: 0,
      hasMore: true,
      fractals: []
    };
  }

  fetch = async () => {
    const { sort, page } = this.state;
    try {
      const { data } = await list(sort, pageSize * page, pageSize);
      this.setState(state => ({
        page: state.page + 1,
        hasMore: data.items.length === pageSize,
        fractals: [...state.fractals, ...data.items]
      }));
    } catch (error) {
      console.error(error);
    }
  };

  handleSort = sort => {
    this.setState({ sort, page: 0, fractals: [], hasMore: true });
  };

  render() {
    const { fractals, sort, hasMore } = this.state;
    const loader = <div key="loader">Loading ...</div>;
    return (
      <div className="Browse">
        <span className="Browse-title">Browse</span> by{' '}
        <SortDropdown value={sort} onChange={this.handleSort} />
        <InfiniteScroll loadMore={this.fetch} hasMore={hasMore} loader={loader}>
          <Row>
            {fractals.map(fractal => {
              return (
                <Col key={fractal.key} sm={24} md={12} lg={8}>
                  <Card fractal={fractal} />
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Browse;
