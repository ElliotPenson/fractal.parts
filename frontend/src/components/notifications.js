import React from 'react';
import { notification } from 'antd';

import { preventWelcome } from '../cookies';
import YesNo from './YesNo';

const duration = null; // don't close

/**
 * Display a message to new users. Save a cookie to prevent additional welcomes.
 */
export function welcome(message, description, onYes) {
  if (!preventWelcome.get()) {
    ask(message, description, onYes, () => preventWelcome.on());
  }
}

/**
 * Show a dialog box that asks the user a yes/no question.
 */
export function ask(message, description, onYes, onClose) {
  const key = makeKey();
  const close = () => {
    notification.close(key);
    onClose();
  };
  const btn = (
    <YesNo
      onYes={() => {
        close();
        onYes();
      }}
      onNo={close}
    />
  );
  notification.open({ key, message, description, duration, btn });
}

/**
 * Display a green notification.
 */
export function success(message, description) {
  notification.success({ message, description, duration: null });
}

function makeKey() {
  return `notification-${Date.now()}`;
}
