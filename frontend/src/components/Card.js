import React from 'react';
import { Link } from 'react-router-dom';

import Attractor from './Attractor';

import './Card.css';

function Card({ fractal }) {
  const { key, title, body } = fractal;
  return (
    <div className="Card">
      <Link to={`/${key}`}>
        <Attractor width={200} height={200} fractal={body} />
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

export default Card;
