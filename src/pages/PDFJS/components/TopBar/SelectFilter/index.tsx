import { MessageBusContext } from '@/components';
import { TextOverFlow } from '@/components/TextOverFlow';
import { FileInfoContext, fileVisionListItem } from '@/pages/PDFJS/context';
import { Button, Checkbox } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import styles from './index.less';

interface SelectFilterProps {
  filterVisible: boolean;
  filterVisibleToggle: () => void;
  onCheckAllChange?: (checkAll: boolean) => void;
}

export const SelectFilter: FC<SelectFilterProps> = (
  props: SelectFilterProps,
) => {
  const messageBus = useContext(MessageBusContext);
  const [fileVisionList, setFileVisionList] = useState<fileVisionListItem[]>(
    [],
  );
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const fileInfo = useContext(FileInfoContext);

  useEffect(() => {
    if (props.filterVisible && fileInfo.fileVisionList) {
      setFileVisionList(JSON.parse(JSON.stringify(fileInfo.fileVisionList)));
    }
  }, [props.filterVisible, fileInfo.fileVisionList]);

  useEffect(() => {
    let indeterminate = false;
    let checkAll = true;
    fileVisionList.forEach((item) => {
      if (item.checked) {
        indeterminate = true;
      } else {
        checkAll = false;
      }
      return item;
    });

    if (checkAll) {
      indeterminate = false;
    }
    setCheckAll(checkAll);
    props.onCheckAllChange && props.onCheckAllChange(checkAll);
    setIndeterminate(indeterminate);
  }, [fileVisionList]);

  const onChange = (e: any, index: number) => {
    setFileVisionList((fileVisionList) => {
      const list = fileVisionList.map((item) => item);
      list[index].checked = e.target.checked;
      return list;
    });
  };

  const onCheckAllChange = (e: any) => {
    setCheckAll(e.target.checked);
    props.onCheckAllChange && props.onCheckAllChange(e.target.checked);
    setFileVisionList((fileVisionList) => {
      return fileVisionList.map((item) => {
        return {
          ...item,
          checked: e.target.checked,
        };
      });
    });
  };

  const Cancel = () => {
    props.filterVisibleToggle();
  };
  const OK = () => {
    Cancel();
    messageBus.emit('setFileInfo', { fileVisionList });
  };

  return (
    <div className={styles.SelectFilterContainer}>
      <div className={`scrollbarStyle ${styles.checkBoxs}`}>
        <div className={styles.checkBoxContainer}>
          <Checkbox
            checked={checkAll}
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
          />
          <span className={styles.checkBoxLabel}>全选</span>
        </div>

        {fileVisionList.map((item, index) => {
          return (
            <div key={item.code} className={styles.checkBoxContainer}>
              <Checkbox
                checked={item.checked}
                onChange={(e) => onChange(e, index)}
              />
              <span className={styles.checkBoxLabel}>
                <TextOverFlow
                  title={
                    (item.name || '') + (index === 0 ? '（在用版本）' : '')
                  }
                  placement="left"
                />
              </span>
            </div>
          );
        })}
      </div>
      <div className={styles.btns}>
        <Button type="link" onClick={Cancel}>
          取消
        </Button>
        <Button type="primary" onClick={OK}>
          确定
        </Button>
      </div>
    </div>
  );
};
