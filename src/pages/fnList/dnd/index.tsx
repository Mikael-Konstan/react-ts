import { CSSProperties, FC, useState } from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { Link } from '@/components';
import DropDnd from '@/components/DropDnd';

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
      <h1>
        <Link href="https://react-dnd.github.io/react-dnd/docs/overview">
          React Dnd
        </Link>
        Component
      </h1>
      <div>
        <Button onClick={jumpToStyle}>跳转 传参 接参</Button>
      </div>
      <DropDnd></DropDnd>
    </div>
  );
};

export default DropDndComp;
