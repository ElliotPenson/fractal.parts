import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';

export const Sort = Object.freeze({
  MOST_VIEWS: '-views',
  LEAST_VIEWS: 'views',
  NEWEST: '-created_at',
  OLDEST: 'created_at'
});

const text = {
  [Sort.MOST_VIEWS]: 'most viewed',
  [Sort.LEAST_VIEWS]: 'least viewed',
  [Sort.NEWEST]: 'newest',
  [Sort.OLDEST]: 'oldest'
};

function SortDropdown({ value, onChange }) {
  const menu = (
    <Menu onClick={({ key }) => onChange(key)}>
      {Object.values(Sort).map(key => {
        return <Menu.Item key={key}>{text[key]}</Menu.Item>;
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <span>
        {text[value]}
        <Icon type="down" />
      </span>
    </Dropdown>
  );
}

export default SortDropdown;
