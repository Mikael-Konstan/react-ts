import { CSSProperties, FC, useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { FieldTypeEnum } from '@/utils/enum';
import { FieldListItem } from '@/utils/type';
import { AddFieldModal, useAddFieldModal } from '@/components';

const CodeMirrorMark = () => {
  const addField = useAddFieldModal();
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
  // 添加字段
  const addFieldClick = () => {
    addField.show(fieldList, '');
  };
  // 添加字段 确认
  const AddFieldConfirm = (fieldFormula: string, formulaConfig: string) => {
    console.log(fieldFormula, formulaConfig);
  };
  return (
    <div>
      <h1>CodeMirror Mark</h1>
      <div>
        <Button onClick={addFieldClick}>CodeMirror 标签</Button>
      </div>
      <AddFieldModal {...addField.getProps(AddFieldConfirm)}></AddFieldModal>
    </div>
  );
};

export default CodeMirrorMark;
