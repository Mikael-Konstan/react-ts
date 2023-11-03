import { useState, useEffect, useRef } from 'react';
import { Tree, Switch } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import styles from './index.less';
import comStyles from '@/pages/common.less';
import { getDataListApiResItem } from '@/services/fnList/type';
import { ArticleLayout, AntdTree } from '@/components';

const MyTree = () => {
  return (
    <ArticleLayout title="树组件">
      <AntdTree />
    </ArticleLayout>
  );
};

export default MyTree;
