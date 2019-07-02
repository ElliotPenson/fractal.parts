import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Navbar from './Navbar';
import FractalRows from './FractalRows';
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

  makeLoader() {
    const fractals = [...Array(3)].map((_, index) => `fractal${index}`);
    return <FractalRows key={this.state.page} fractals={fractals} />;
  }

  render() {
    const { fractals, sort, hasMore } = this.state;
    return (
      <div className="Browse">
        <Navbar />
        <div className="Browse-body">
          <div className="Browse-header">
            <h1>Browse</h1>
            <SortDropdown value={sort} onChange={this.handleSort} />
          </div>
          <InfiniteScroll
            loadMore={this.fetch}
            hasMore={hasMore}
            loader={this.makeLoader()}
            threshold={500}
          >
            <FractalRows fractals={fractals} />
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default Browse;
