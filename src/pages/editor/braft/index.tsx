import { FC, useState } from 'react';
import { EditorState } from 'braft-editor';
import { ArticleLayout } from '@/components';
import { BraftEditor, Link } from '@/components';

import styles from './index.less';

interface BraftProps {}

export const Braft: FC<BraftProps> = (props) => {
  const [wordText, setWordText] = useState<string>('');

  const onChange = (rawString: string, editorState: EditorState) => {
    const htmlString = editorState.toHTML();
    setWordText(htmlString);
  };
  return (
    <ArticleLayout title="富文本编辑器 - Braft">
      <div className={styles.Braft}>
        <Link href="https://www.yuque.com/braft-editor/be/lzwpnr">
          Braft文档
        </Link>
        <div className={styles.BraftEditorContainer}>
          <BraftEditor onChange={onChange}></BraftEditor>
        </div>

        <div
          className={styles.BraftPreviewContainer}
          dangerouslySetInnerHTML={{ __html: wordText }}
        ></div>
      </div>
    </ArticleLayout>
  );
};

export default Braft;
