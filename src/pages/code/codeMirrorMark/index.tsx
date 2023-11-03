import { CSSProperties, FC, useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { AddFieldModal, useAddFieldModal, Link } from '@/components';
import { fieldListDefault } from '@/components/config';

const CodeMirrorMark = () => {
  const addField = useAddFieldModal();
  // 添加字段
  const addFieldClick = () => {
    addField.show(fieldListDefault, '');
  };
  // 添加字段 确认
  const AddFieldConfirm = (fieldFormula: string, formulaConfig: string) => {
    console.log(fieldFormula, formulaConfig);
  };
  return (
    <div>
      <h1>
        <Link href="https://codemirror.net/5/doc/manual.html#mark_shared">
          CodeMirror
        </Link>
        Mark
      </h1>
      <div>
        <Button onClick={addFieldClick}>CodeMirror 标签</Button>
      </div>
      <AddFieldModal {...addField.getProps(AddFieldConfirm)}></AddFieldModal>
    </div>
  );
};

export default CodeMirrorMark;
