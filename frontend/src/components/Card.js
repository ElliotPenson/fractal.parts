import React from 'react';
import { Link } from 'react-router-dom';

import Attractor from './Attractor';

import './Card.css';

function Card({ fractal }) {
  const { key, title, views, body } = fractal;
  return (
    <div className="Card">
      <Link to={`/${key}`}>
        <Attractor width={250} height={250} fractal={body} />
        <h2>{title}</h2> with {views} views.
      </Link>
    </div>
  );
}

export default Card;
