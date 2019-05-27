import React, { Component } from 'react';
import { Typography, Icon } from 'antd';

import './NotFound.css';

const { Title } = Typography;

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Icon type="file-exclamation" />
        <Title>Not Found.</Title>
      </div>
    );
  }
}

export default NotFound;
