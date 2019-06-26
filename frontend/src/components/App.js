import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

import Sierpinski from './Sierpinski';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-fractal">
          <Sierpinski />
        </div>
        <p>View and design beautiful fractals.</p>
        <Row>
          <Col span={12}>
            <Link to="/browse">
              <Button size="large">Browse</Button>
            </Link>
          </Col>
          <Col span={12}>
            <Link to="/create">
              <Button type="primary" size="large">
                Create
              </Button>
            </Link>
          </Col>
        </Row>
      </header>
    </div>
  );
}

export default App;
