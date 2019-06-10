import React from 'react';
import { InputNumber } from 'antd';

import { ITERATION_RANGE } from '../graphics/attractor';

function IterationsInput({ value, renderMethod, onChange }) {
  const [min, max] = ITERATION_RANGE[renderMethod];
  return (
    <InputNumber
      style={{ width: '100%' }}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  );
}

export default IterationsInput;
