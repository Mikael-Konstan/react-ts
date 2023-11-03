import comStyles from '@/pages/common.less';
import { ArticleLayout, CodeHighLighter } from '@/components';

interface CodeHighLightProps {}

const CodeHighLight = (props: CodeHighLightProps) => {
  const code = `(num) => num + 1`;

  return (
    <ArticleLayout title="代码高亮">
      <div className={comStyles.ModalContainer}>
        <CodeHighLighter code={code} />
      </div>
    </ArticleLayout>
  );
};

export default CodeHighLight;
