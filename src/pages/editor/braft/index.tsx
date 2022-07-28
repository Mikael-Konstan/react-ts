import { FC, useEffect, useState } from 'react';
import { EditorState } from 'braft-editor';
import { BraftEditor } from '@/components';

import styles from './index.less';

interface BraftProps {}

export const Braft: FC<BraftProps> = (props) => {
  const [wordText, setWordText] = useState<string>('');

  const onChange = (rawString: string, editorState: EditorState) => {
    const htmlString = editorState.toHTML();
    setWordText(htmlString);
  };
  return (
    <div className={styles.Braft}>
      <h1>Braft</h1>
      <div className={styles.BraftEditorContainer}>
        <BraftEditor onChange={onChange}></BraftEditor>
      </div>

      <div
        className={styles.BraftPreviewContainer}
        dangerouslySetInnerHTML={{ __html: wordText }}
      ></div>
    </div>
  );
};

export default Braft;
