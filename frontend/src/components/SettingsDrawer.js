import React from 'react';
import { Col, Drawer, Row } from 'antd';

import RenderMethodSelect from './RenderMethodSelect';

import './SettingsDrawer.css';

function SettingsDrawer({ settings, onClose, onChange, visible }) {
  const { renderMethod } = settings;
  return (
    <Drawer
      title="Settings"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Row className="SettingsDrawer-row">
        <Col className="SettingsDrawer-label" span={12}>
          Render method
        </Col>
        <Col span={12}>
          <RenderMethodSelect
            value={renderMethod}
            onChange={renderMethod => onChange({ renderMethod })}
          />
        </Col>
      </Row>
    </Drawer>
  );
}

export default SettingsDrawer;
