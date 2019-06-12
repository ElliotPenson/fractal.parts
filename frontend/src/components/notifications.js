import React from 'react';
import { Button, message, Modal, notification, Tabs } from 'antd';

import YesNo from './YesNo';

export function ask(message, description, onYes) {
  const key = makeKey();
  const btn = <YesNo onYes={onYes} onNo={() => notification.close(key)} />;
  notification.open({ key, message, description, duration: null, btn });
}

export function success(message, description) {
  notification.success({ message, description, duration: null });
}

function makeKey() {
  return `notification-${Date.now()}`;
}
