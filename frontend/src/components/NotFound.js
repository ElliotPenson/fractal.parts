import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Icon } from 'antd';

import './NotFound.css';

const { Title } = Typography;

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Icon type="file-exclamation" />
        <Title>Not Found.</Title>
        <p>
          This page does not exist. <Link to="/browse">Click here</Link> to
          browse fractals.
        </p>
      </div>
    );
  }
}

export default NotFound;
