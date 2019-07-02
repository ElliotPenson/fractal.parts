import React from 'react';
import { Skeleton } from 'antd';

function FractalSkeleton({ size }) {
  const avatar = { shape: 'square', size };
  return <Skeleton active avatar={avatar} paragraph={false} title={false} />;
}

export default FractalSkeleton;
