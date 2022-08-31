import { useState, useEffect, useRef } from 'react';
import { Tree, Switch } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import styles from './index.less';
import comStyles from '@/pages/common.less';
import { getDataListApiResItem } from '@/services/fnList/type';
import { AntdTree } from '@/components';

const MyTree = () => {
  return (
    <div>
      <h1>MyTree</h1>
      <div className={comStyles.ModalContainer}>
        <AntdTree />
      </div>
    </div>
  );
};

export default MyTree;
