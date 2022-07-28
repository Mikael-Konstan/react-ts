import { FC, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tooltip } from 'antd';
import { TargetBox } from './TargetBox';
import { DropTypes } from './DropTypes';
import { IconPng } from '@/components';
import { DragHook } from '@/utils/hooks';
import { FieldTypeEnum } from '@/utils/enum';
import { FieldListItem } from '@/utils/type';
import styles from './Container.less';
import './Container.less';

export const ICONMAP = {
  date: <IconPng type="date" size={16}></IconPng>,
  number: <IconPng type="number" size={16}></IconPng>,
  other: <IconPng type="other" size={16}></IconPng>,
  word: <IconPng type="word" size={16}></IconPng>,
};

export const Container: FC = () => {
  const [dragItem, setDragItem] = useState<FieldListItem>();
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
  useEffect(() => {
    console.log(dragItem);
  }, [dragItem]);
  return (
    <DndProvider backend={HTML5Backend}>
      {/* backend 全局只能有一个 项目放根元素 这里是为了显示存在感 */}
      <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
        <div style={{ float: 'left', width: '210px', padding: '16px' }}>
          {fieldList.map((item, idx) => {
            return (
              <DragHook
                dragItem={item}
                dropType={DropTypes.BOX}
                showCopyIcon={item.showCopyIcon}
                key={idx + ''}
              >
                <Tooltip title={item.title} placement="rightTop">
                  <div className={`${styles.dragItem} ${item.type}`}>
                    {ICONMAP[item.type]}
                    <span className={styles.dragTitle}>{item.title}</span>
                  </div>
                </Tooltip>
              </DragHook>
            );
          })}
        </div>
        <div style={{ float: 'left' }}>
          <TargetBox setDragItem={setDragItem} />
        </div>
      </div>
    </DndProvider>
  );
};
