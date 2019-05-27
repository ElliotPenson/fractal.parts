import React from 'react';
import { Button, Icon, Popconfirm } from 'antd';

function PublishButton({ isPublishing, onPublish }) {
  return (
    <Popconfirm
      title="Are you sure?"
      icon={
        <Icon type="info-circle" style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
      }
      onConfirm={onPublish}
      okText="Yes"
      cancelText="No"
    >
      <Button size="large" type="primary" loading={isPublishing}>
        Publish
      </Button>
    </Popconfirm>
  );
}

export default PublishButton;
