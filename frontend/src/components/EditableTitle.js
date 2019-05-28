import React from 'react';
import { RIEInput } from 'riek';

import './EditableTitle.css';

function EditableTitle({ value, onChange }) {
  return (
    <div className="EditableTitle">
      <RIEInput
        value={value}
        change={({ title }) => onChange(title)}
        propName="title"
      />
    </div>
  );
}

export default EditableTitle;
