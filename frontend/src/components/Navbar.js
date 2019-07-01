import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const github = 'https://github.com/ElliotPenson/fractal.parts';

function Navbar() {
  return (
    <nav>
      <Link to="/" className="home">
        fractal.parts
      </Link>
      <Link to="/browse">browse</Link>
      <Link to="/create">create</Link>
      <a href={github}>code</a>
    </nav>
  );
}

export default Navbar;
