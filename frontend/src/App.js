import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>This is fractal.parts.</h2>
          <Row>
            <Col span={12}>
              <Link to="/create">
                <Button type="primary">Create</Button>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="/browse">
                <Button>Browse</Button>
              </Link>
            </Col>
          </Row>
        </header>
      </div>
    );
  }
}

export default App;
