import { CSSProperties, FC, useState } from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { FieldTypeEnum } from '@/utils/enum';
import { FieldListItem } from '@/utils/type';
import DropDnd from '@/components/Drop-Dnd';

const DropDndComp = () => {
  const fieldList: FieldListItem[] = [
    {
      id: 'word',
      title: '文本',
      type: FieldTypeEnum.WORD,
      showCopyIcon: true,
    },
    {
      id: 'date',
      title: '日期',
      type: FieldTypeEnum.DATE,
    },
    {
      id: 'number',
      title: '数字',
      type: FieldTypeEnum.NUMBER,
    },
    {
      id: 'other',
      title: '其他',
      type: FieldTypeEnum.OTHER,
    },
  ];
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
