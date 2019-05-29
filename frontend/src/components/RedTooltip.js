import React from 'react';
import { Tooltip } from 'antd';

import './RedTooltip.css';

function RedTooltip({ message, visible, placement = 'bottomLeft', children }) {
  return (
    <Tooltip
      overlayClassName="RedTooltip"
      placement={placement}
      title={message}
      visible={visible}
    >
      {children}
    </Tooltip>
  );
}

export default RedTooltip;
