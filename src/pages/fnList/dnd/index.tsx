import { CSSProperties, FC, useState } from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import DropDnd from '@/components/Drop-Dnd';

const DropDndComp = () => {
  const jumpToStyle = () => {
    // 传参
    history.push({
      pathname: '/fnList/style',
      query: {
        a: 'query test',
      },
      state: {
        b: 'state test',
      },
    });
  };
  return (
    <div>
      <h1>Drop Dnd Component</h1>
      <div>
        <Button onClick={jumpToStyle}>跳转 传参 接参</Button>
      </div>
      <DropDnd></DropDnd>
    </div>
  );
};

export default DropDndComp;
