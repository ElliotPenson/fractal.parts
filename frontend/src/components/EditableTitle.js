import React from 'react';
import { RIEInput } from 'riek';

import RedTooltip from './RedTooltip';

import './EditableTitle.css';

function EditableTitle({ value, onChange, hasError, errorMessage }) {
  return (
    <div className="EditableTitle">
      <RedTooltip message={errorMessage} visible={hasError}>
        <RIEInput
          className={hasError ? 'EditableTitle-error' : ''}
          value={value}
          validate={title => title && title.length > 0}
          change={({ title }) => onChange(title)}
          propName="title"
        />
      </RedTooltip>
    </div>
  );
}

export default EditableTitle;
