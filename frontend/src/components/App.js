import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Typography } from 'antd';

import './App.css';

const { Title } = Typography;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Title>fractal.parts</Title>
          <p>Design and view beautiful fractals.</p>
          <Row>
            <Col span={12}>
              <Link to="/browse">
                <Button size="large">Browse</Button>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="/create">
                <Button size="large">Create</Button>
              </Link>
            </Col>
          </Row>
        </header>
      </div>
    );
  }
}

export default App;
