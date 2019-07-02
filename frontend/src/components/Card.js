import React from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

import Attractor from './Attractor';

import './Card.css';

function Card({ fractal }) {
  const { key, title } = fractal;
  return (
    <div className="Card">
      <Link to={`/${key}`} disabled={!title}>
        <Attractor
          className="Card-attractor"
          width={200}
          height={200}
          fractal={fractal}
        />
        <Skeleton active loading={!title} title={false} paragraph={{ rows: 1 }}>
          <h2>{title}</h2>
        </Skeleton>
      </Link>
    </div>
  );
}

export default Card;
