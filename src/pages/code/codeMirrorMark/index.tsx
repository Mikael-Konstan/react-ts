import { Button } from 'antd';
import { AddFieldModal, useAddFieldModal, Link } from '@/components';
import { fieldListDefault } from '@/components/config';
import { ArticleLayout } from '@/components';

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
    <ArticleLayout title="CodeMirror 代码编辑">
      <Link href="https://codemirror.net/5/doc/manual.html#mark_shared">
        CodeMirror 插件文档
      </Link>
      <Button onClick={addFieldClick}>CodeMirror 公式编辑</Button>
      <AddFieldModal {...addField.getProps(AddFieldConfirm)}></AddFieldModal>
    </ArticleLayout>
  );
};

export default CodeMirrorMark;
