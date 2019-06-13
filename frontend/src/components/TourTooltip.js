import React, { Component } from 'react';
import { Button } from 'antd';

import './TourTooltip.css';

function TourTooltip({ step, tooltipProps, backProps, primaryProps }) {
  return (
    <div className="TourTooltip" {...tooltipProps}>
      <div className="TourTooltip-body">{step.content}</div>
      <div className="TourTooltip-buttons">
        <Button {...backProps}>{backProps.title}</Button>
        <Button type="primary" {...primaryProps}>
          {primaryProps.title}
        </Button>
      </div>
    </div>
  );
}

export default TourTooltip;
