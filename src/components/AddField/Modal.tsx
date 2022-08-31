import { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Modal.less';
import { FieldListItem } from '@/utils/type';
import { FieldTypeEnum } from '@/utils/enum';
import { strReplace } from '@/utils/tools';
import { CodeMirrorReact, MarkPosiItem, CodeMirrorDatas } from '../CodeMirror';

export interface SumListItem {
  id: string;
  title: string;
  tips1: string;
  tips2: string;
  example: string;
  formula: string;
}

export interface AddFieldModalProps {
  tableField: FieldListItem[];
  formulaConfig: string; // CodeMirror回显值
  visible: boolean;
  handleOnOk: (
    fieldFormula: string, // 公式
    formulaConfig: string, // 公式回显配置
  ) => void;
  handleOnCancel: () => void;
}
export function AddFieldModal(props: AddFieldModalProps) {
  const [fieldFormula, setFieldFormula] = useState<string>('');
  const [formulaConfig, setFormulaConfig] = useState<string>('');
  const [codeMirrorInit, setCodeMirrorInit] = useState<string>('');
  const [keyWord, setKeyWord] = useState<string>('');
  const [sunName, setSunName] = useState<string>('');
  const [fieldActive, setFieldActive] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const sumList: SumListItem[] = [
    {
      id: 'DateFormat',
      title: 'DateFormat',
      tips1: 'DateFormat函数可以返回指定格式的日期',
      tips2: '用法: DateFormat(日期，日期格式)。',
      example: '示例: DateFormat(2022-01-01, "yyyy-MM-dd")，返回:202201',
      formula: 'DateFormat()',
    },
    {
      id: 'WeekNum',
      title: 'WeekNum',
      tips1: 'WeekNum函数可以返回日期所在年的周数',
      tips2: '用法: WeekNum(日期)。',
      example: '示例: WeekNum(2022-01-01)，返回:1',
      formula: 'WeekNum()',
    },
    {
      id: 'Now',
      title: 'Now',
      tips1: 'Now函数可以返回当前服务器系统时间',
      tips2: '用法: Now()。',
      example: '示例: Now()，返回:2022/05/28 11:01:21',
      formula: 'Now()',
    },
  ];
  const [codeMirrorData, setCodeMirrorData] = useState<{
    type: string;
    value: FieldListItem | SumListItem;
  }>({
    type: 'sum' + new Date().getTime(),
    value: sumList[active],
  });
  useEffect(() => {
    if (props.visible) {
      setFieldFormula('');
      const {
        value = '',
        valueArr = [],
        marksPosi = [],
      } = JSON.parse(props.formulaConfig || '{}');
      const formula = getFormula(valueArr, marksPosi);
      setFieldFormula(formula);
      setFormulaConfig(props.formulaConfig);
      setCodeMirrorInit(value);
      setKeyWord('');
      setSunName('');
      setFieldActive(0);
      setActive(0);
    }
    setRefreshFlag(props.visible);
  }, [props.visible]);
  const getFormula = (valueArr: string[], marksPosi: MarkPosiItem[]) => {
    const resullt = valueArr.map((i) => i);
    marksPosi.forEach((item) => {
      let index = item.from.line;
      resullt[index] = strReplace(
        valueArr[index],
        item.from.ch,
        item.to.ch,
        '${' + `${item.fieldId}` + '}',
      );
    });
    return resullt.join('');
  };
  const fieldFormulaChange = (
    editor: any,
    val: string,
    data: CodeMirrorDatas,
  ) => {
    setCodeMirrorInit(val);
    // val valueArr data.marksPosi 回显所用
    // data.valueArr data.marksPosi 获取具体公式
    const formula = getFormula(data.valueArr, data.marksPosi);
    setFieldFormula(formula);
    setFormulaConfig(
      JSON.stringify({
        value: val,
        valueArr: data.valueArr,
        marksPosi: data.marksPosi,
      }),
    );
  };
  const searchChange = (e: any) => {
    setKeyWord(e.target.value);
  };
  const sunNameChange = (e: any) => {
    setSunName(e.target.value);
  };
  const getMarks = (type: string) => {
    if (type == FieldTypeEnum.WORD) {
      return (
        <div className={`${styles.fieldMark} ${styles.wordFieldMark}`}>
          文本
        </div>
      );
    }
    if (type == FieldTypeEnum.NUMBER) {
      return (
        <div className={`${styles.fieldMark} ${styles.numberFieldMark} `}>
          数字
        </div>
      );
    }
    return (
      <div className={`${styles.fieldMark} ${styles.dateFieldMark}`}>
        时间戳
      </div>
    );
  };
  const addField = (item: FieldListItem, idx: number) => {
    setCodeMirrorData({
      type: 'field' + new Date().getTime(),
      value: props.tableField[idx],
    });
    setFieldActive(idx);
  };
  const addSum = (item: SumListItem, idx: number) => {
    setCodeMirrorData({
      type: 'sum' + new Date().getTime(),
      value: sumList[idx],
    });
    setActive(idx);
  };
  return (
    <Modal
      width={800}
      visible={props.visible}
      title="公式编辑"
      onOk={() => {
        props.handleOnOk(fieldFormula, formulaConfig);
      }}
      onCancel={() => {
        setCodeMirrorInit('');
        props.handleOnCancel();
      }}
      className={styles.AddFieldModal}
    >
      <div className={styles.AddFieldContent}>
        <div className={styles.fieldFormula}>
          <p className={styles.fieldFormulaTitle}>公式 =</p>
          <div className={styles.fieldFormulaIpt}>
            <CodeMirrorReact
              data={codeMirrorData}
              formulaConfig={formulaConfig}
              value={codeMirrorInit}
              onChange={fieldFormulaChange}
              refreshFlag={refreshFlag}
            ></CodeMirrorReact>
          </div>
        </div>
        <div className={styles.AddFieldTips}>
          <div className={styles.AddFieldTipsItem}>
            <p>可用变量</p>
            <div>
              <Input
                placeholder="搜索"
                allowClear
                className={styles.FilterIpt}
                value={keyWord}
                onChange={(e) => searchChange(e)}
                prefix={<SearchOutlined />}
              />
              <div className={styles.FieldList}>
                {props.tableField.map((item, idx) => {
                  if (keyWord !== '') {
                    const str1 = keyWord.trim().toLocaleLowerCase();
                    const str2 = item.title.trim().toLocaleLowerCase();
                    if (!str2.includes(str1)) {
                      return null;
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      className={`${fieldActive === idx ? styles.Active : ''}`}
                      onClick={() => {
                        addField(item, idx);
                      }}
                    >
                      <span>{item.title}</span>
                      {getMarks(item.type)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.AddFieldTipsItem}>
            <p>函数</p>
            <div>
              <Input
                placeholder="搜索"
                allowClear
                className={styles.FilterIpt}
                value={sunName}
                onChange={(e) => sunNameChange(e)}
                prefix={<SearchOutlined />}
              />
              <div className={styles.SumList}>
                {sumList.map((item, idx) => {
                  if (sunName !== '') {
                    const str1 = sunName.trim().toLocaleLowerCase();
                    const str2 = item.title.trim().toLocaleLowerCase();
                    if (!str2.includes(str1)) {
                      return null;
                    }
                  }
                  return (
                    <p
                      key={item.id}
                      className={`${active === idx ? styles.Active : ''}`}
                      onClick={() => {
                        addSum(item, idx);
                      }}
                    >
                      {item.title}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.AddFieldTipsItem}>
            <p>{sumList[active].title}</p>
            <div className={styles.SumTips}>
              <p className={styles.SumTips1}>{sumList[active].tips1}</p>
              <p className={styles.SumTips2}>{sumList[active].tips2}</p>
              <p className={styles.SumExample}>{sumList[active].example}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
