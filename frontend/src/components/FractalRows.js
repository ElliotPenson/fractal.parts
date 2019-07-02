import React from 'react';
import { Col, Row } from 'antd';

import Card from './Card';

function FractalRows({ key, fractals }) {
  return (
    <Row key={key}>
      {fractals.map(fractal => {
        return (
          <Col key={fractal.key} sm={24} md={12} lg={8}>
            <Card fractal={fractal} />
          </Col>
        );
      })}
    </Row>
  );
}

export default FractalRows;
