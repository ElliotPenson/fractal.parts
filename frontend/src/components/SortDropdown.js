import React from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';

export const Sort = Object.freeze({
  MOST_VIEWS: '-views',
  LEAST_VIEWS: 'views',
  NEWEST: '-created_at',
  OLDEST: 'created_at'
});

const text = {
  [Sort.MOST_VIEWS]: 'Most Viewed',
  [Sort.LEAST_VIEWS]: 'Least Viewed',
  [Sort.NEWEST]: 'Newest',
  [Sort.OLDEST]: 'Oldest'
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
    <Dropdown overlay={menu} trigger={['click', 'hover']}>
      <Button size="large">
        {text[value]}
        <Icon type="down" />
      </Button>
    </Dropdown>
  );
}

export default SortDropdown;
