import { FC, useState, useEffect } from 'react';
import { Controlled } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import CodeMirrorConfig from 'codemirror';
import { matchBrackets } from './addons/matchBrackets';
import { defineSimpleMode } from './addons/defineSimpleMode';
import styles from './index.less';
import { FunctionList } from './funList';
import { FieldListItem } from '@/utils/type';
import { SumListItem } from '@/components/AddField/Modal';
import './index.less';

const CodeMirror: any = CodeMirrorConfig;
const ReactCodeMirror: any = Controlled;
const _CodemirrorOptions = {
  mode: 'cusCodeMirror',
  lineNumbers: false,
  matchBrackets: true,
  autoRefresh: true,
};
matchBrackets(CodeMirror);
defineSimpleMode(CodeMirror);

export interface MarkPosiItem {
  from: CodeMirrorConfig.Position;
  to: CodeMirrorConfig.Position;
  fieldId: string;
  title: string;
}

export interface CodeMirrorDatas {
  data: any;
  valueArr: string[];
  marksPosi: MarkPosiItem[];
}

export interface CodeMirrorReactProps {
  data: {
    type: string;
    value: FieldListItem | SumListItem;
  }; // 自定义操作 插入标签 公式
  value?: string; // 初始绑定值
  onChange?: (
    editor: CodeMirrorConfig.Editor | null,
    newValue: string,
    datas: CodeMirrorDatas,
  ) => void; // 绑定值变化回调
  formulaConfig: string; // 回显 标记配置
  refreshFlag?: boolean;
  [key: string]: any;
}

export const CodeMirrorReact: FC<CodeMirrorReactProps> = (props) => {
  const [value, setValue] = useState<string>('');
  const [mirrorInstance, setMirrorInstance] =
    useState<CodeMirrorConfig.Editor | null>(null);

  useEffect(() => {
    if (!!props.data) {
      mirrorInstance?.focus();
      if (String.prototype.startsWith.call(props.data.type, 'field')) {
        insertVariable(props.data.value as FieldListItem);
      } else {
        insertVariable(props.data.value.id, true);
      }
    }
  }, [props.data]);
  useEffect(() => {
    const val = props.value || '';
    setValue((value) => {
      if (val !== value) {
        return val;
      }
      return value;
    });
  }, [props.value]);
  useEffect(() => {
    let startList: {
      regex: RegExp;
      token: string;
      next?: string;
      title: string;
    }[] = [];

    FunctionList.forEach((fun) => {
      fun.list.forEach((item) => {
        startList.push({
          regex: new RegExp(item.name),
          token: 'fun-title-style',
          title: item.name,
        });
      });
    });

    startList = startList.sort((a, b) => b.title.length - a.title.length);

    CodeMirror.defineSimpleMode('cusCodeMirror', {
      start: [
        { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: 'string' },
        {
          regex: /(function)(\s+)([a-z$][\w$]*)/,
          token: ['keyword', null, 'variable-2'],
        },
        {
          regex: /(?:function|var|return|if|for|while|else|do|this)\b/,
          token: 'keyword',
        },
        { regex: /true|false|null|undefined/, token: 'atom' },
        {
          regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
          token: 'number',
        },
        { regex: /\/\/.*/, token: 'comment' },
        { regex: /\/(?:[^\\]|\\.)*?\//, token: 'variable-3' },
        { regex: /\/\*/, token: 'comment', next: 'comment' },
        { regex: /[-+\/*=<>!]+/, token: 'operator' },
        { regex: /[\{\[\(]/, indent: true },
        { regex: /[\}\]\)]/, dedent: true },
        { regex: /[a-z$][\w$]*/, token: 'variable' },
        { regex: /<</, token: 'meta', mode: { spec: 'xml', end: />>/ } },
        ...startList,
      ],
      comment: [
        { regex: /.*?\*\//, token: 'comment', next: 'start' },
        { regex: /.*/, token: 'comment' },
      ],
      meta: {
        dontIndentStates: ['comment'],
        lineComment: '//',
      },
    });
  }, [mirrorInstance]);
  useEffect(() => {
    if (!mirrorInstance || !props.refreshFlag) return;
    const formulaConfig = JSON.parse(props.formulaConfig || '{}');
    const marksPosi: MarkPosiItem[] = formulaConfig.marksPosi || [];
    if (marksPosi.length > 0) {
      setTimeout(() => {
        marksPosi.forEach((item) => {
          tagMark(item);
        });
      }, 0);
    }
  }, [mirrorInstance, props.refreshFlag]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const { valueArr, marksPosi } = getPosiVal(mirrorInstance);
      props.onChange &&
        props.onChange(mirrorInstance, value, {
          data: null,
          valueArr,
          marksPosi,
        });
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [value, mirrorInstance]);
  // 获取回显定位值
  const getPosiVal = (mirrorInstance: CodeMirrorConfig.Editor | null) => {
    if (!mirrorInstance)
      return {
        valueArr: [],
        marksPosi: [],
      };
    const marks = mirrorInstance.getAllMarks();
    const lineCount = mirrorInstance.lineCount() || 0; // 获取行数
    const valueArr: string[] = new Array(lineCount).fill('');
    for (let i = 0; i < lineCount; i++) {
      valueArr[i] = mirrorInstance.getLine(i) || ''; // 获取所在行内容
    }
    const marksPosi = marks
      .map((x) => {
        let pos = x.find() as CodeMirrorConfig.MarkerRange;
        return {
          from: pos.from,
          to: pos.to,
          fieldId: x.attributes?.fieldId || '',
          title: x.attributes?.title || '',
        };
      })
      .filter((item) => {
        return !!item.title && !!item.fieldId;
      });
    return {
      valueArr,
      marksPosi,
    };
  };
  // 标签标记
  const tagMark = (marksPosi: MarkPosiItem) => {
    if (!mirrorInstance) return;
    const childSpan = document.createElement('span');
    childSpan.innerText = marksPosi.title;
    childSpan.className = `field-title-style ${marksPosi.fieldId}`;
    mirrorInstance.markText(marksPosi.from, marksPosi.to, {
      className: `sbani`,
      replacedWith: childSpan,
      handleMouseEvents: true,
      addToHistory: true,
      // clearOnEnter: true, // 与atomic冲突
      // readOnly: true,
      atomic: true,
      clearWhenEmpty: true,
      attributes: {
        fieldId: marksPosi.fieldId,
        title: marksPosi.title,
      },
    });
  };
  // 插入 tag标签 fn
  const insertVariable = (vari: FieldListItem | string, isFn?: boolean) => {
    try {
      if (!mirrorInstance) return;
      const addStr = typeof vari === 'string' ? vari : vari.title;
      const from = mirrorInstance.getCursor();

      mirrorInstance.replaceRange(addStr + `${isFn ? '()' : ' '}`, from);
      setTimeout(() => {
        mirrorInstance.startOperation();
        const cursorNow = mirrorInstance.getCursor();
        mirrorInstance.setCursor({
          ...cursorNow,
          ch: isFn ? cursorNow.ch - 1 : cursorNow.ch,
        });

        if (!isFn && typeof vari !== 'string') {
          tagMark({
            from,
            to: cursorNow,
            fieldId: vari.id,
            title: vari.title,
          });
        }
        mirrorInstance.endOperation();
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mirrorWrap}>
      <ReactCodeMirror
        editorDidMount={(editor: any) => {
          if (!mirrorInstance) {
            setMirrorInstance(editor);
          }
        }}
        className="CodeMirrorReact"
        value={value}
        options={_CodemirrorOptions}
        autoCursor={true}
        onBeforeChange={(editor: any, data: any, newValue: string) => {
          setValue(newValue);
        }}
      />
    </div>
  );
};
