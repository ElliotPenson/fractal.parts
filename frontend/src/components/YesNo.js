import React from 'react';
import { Button } from 'antd';

import './YesNo.css';

function YesNo({ onYes, onNo }) {
  return (
    <div className="YesNo">
      <Button onClick={onNo}>No</Button>
      <Button onClick={onYes} type="primary">
        Yes
      </Button>
    </div>
  );
}

export default YesNo;
