import React from 'react';
import { Skeleton } from 'antd';

function FractalSkeleton({ className, size }) {
  const avatar = { shape: 'square', size };
  return (
    <Skeleton
      active
      className={className}
      avatar={avatar}
      paragraph={false}
      title={false}
    />
  );
}

export default FractalSkeleton;
