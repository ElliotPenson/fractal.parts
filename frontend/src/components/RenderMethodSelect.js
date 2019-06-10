import React from 'react';
import { Select } from 'antd';

import { RenderMethod } from '../graphics/attractor';

import './RenderMethodSelect.css';

function RenderMethodSelect({ value, onChange }) {
  return (
    <Select
      className="RenderMethodSelect"
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {Object.values(RenderMethod).map(renderMethod => {
        return (
          <Select.Option
            className="RenderMethodSelect"
            key={renderMethod}
            value={renderMethod}
          >
            {renderMethod}
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default RenderMethodSelect;
