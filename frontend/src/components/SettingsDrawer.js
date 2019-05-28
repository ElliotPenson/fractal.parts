import React from 'react';
import { Drawer } from 'antd';

function SettingsDrawer({ visible, onClose }) {
  return (
    <Drawer
      title="Settings"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      No settings (yet).
    </Drawer>
  );
}

export default SettingsDrawer;
