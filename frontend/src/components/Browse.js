import React, { Component } from 'react';
import Card from './Card';
import { Col, Row, Pagination, Select } from 'antd';

import { list } from '../api';

const pageSize = 6;

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, sort: '-views', total: 0, fractals: [] };
  }

  async componentDidMount() {
    const { page, sort } = this.state;
    await this.fetch(page, sort);
  }

  async fetch(page, sort) {
    try {
      const { data } = await list(sort, pageSize * (page - 1), pageSize);
      this.setState({ total: data.total, fractals: data.items });
    } catch (error) {
      console.error(error);
    }
  }

  handlePage = page => {
    this.fetch(page, this.state.sort);
    this.setState({ page });
  };

  render() {
    const { fractals, total } = this.state;
    return (
      <div className="Browse">
        <Select
          value={this.state.sort}
          onChange={sort => this.setState({ sort })}
        >
          <Select.Option value="-views">Most Views</Select.Option>
          <Select.Option value="newest">Newest</Select.Option>
          <Select.Option value="oldest">Oldest</Select.Option>
        </Select>
        <Row>
          {fractals.map(fractal => {
            return (
              <Col key={fractal.key} sm={24} md={12} lg={8}>
                <Card fractal={fractal} />
              </Col>
            );
          })}
        </Row>
        <Pagination
          defaultCurrent={this.state.page}
          defaultPageSize={pageSize}
          total={total}
          onChange={this.handlePage}
        />
      </div>
    );
  }
}

export default Browse;
