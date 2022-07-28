import { FC, useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import braftEditor, { EditorState } from 'braft-editor';
import 'braft-editor/dist/index.css';
import './index.less';
import { colors, fontSizes, menus } from './config';

const BraftEditorComp: any = braftEditor;
const rawStringInit = '';
const editorStateInit = braftEditor.createEditorState(rawStringInit);

interface BraftEditorProps {
  rawString?: string;
  onChange?: (rawString: string, editorState: EditorState) => void;
}

export const BraftEditor: FC<BraftEditorProps> = (props) => {
  const [editorState, setEditorState] = useState<EditorState>(editorStateInit);
  const [FontSizes, setFontSizes] = useState<number[]>([]);
  const [Colors, setColors] = useState<string[]>([]);
  const [rawStringOld, SetRawStringOld] = useState<string>(rawStringInit);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    setFontSizes(fontSizes);
    setColors(colors);
  }, []);

  useEffect(() => {
    if (!!props.rawString) {
      const editorState = braftEditor.createEditorState(props.rawString);
      setEditorState(editorState);
      SetRawStringOld(props.rawString);
    }
  }, [props.rawString]);

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      const rawString = editorState.toRAW();
      if (rawString === rawStringOld) return;
      props.onChange && props.onChange(rawString, editorState);
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [editorState, rawStringOld]);

  const handleEditorChange = (editorState: EditorState) => {
    let len = 0;
    const { blocks } = editorState.toRAW(true);
    if (blocks && Array.isArray(blocks)) {
      blocks.forEach((item: any) => {
        len += (item?.text || '').length;
      });
      if (len > 500) return message.warning('不能超过500个文字');
    }
    setEditorState(editorState);
  };

  return (
    <BraftEditorComp
      value={editorState}
      className="BraftEditor"
      ref={editorContainerRef}
      controls={menus}
      fontSizes={FontSizes}
      colors={Colors}
      onChange={handleEditorChange}
    />
  );
};
