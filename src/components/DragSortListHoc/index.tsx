import { DeleteSvg } from '@/components';
import { HolderOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import styles from './index.less';
import comStyles from './../common.less';
import { fieldListDefault } from './../config';
import { FieldListItem } from './../type';

const DragHandle: any = SortableHandle(() => (
  <HolderOutlined
    className={comStyles.fieldMove}
    style={{ cursor: 'grab', color: '#999' }}
  />
));

const SorListItem: any = SortableElement(
  ({
    index,
    item,
    idxObj,
    delField,
  }: {
    index: number;
    item: FieldListItem;
    idxObj: {
      // 普通类型传递不过来
      index: number;
    };
    delField: (index: number) => void;
  }) => (
    <div className={comStyles.fieldItem}>
      <div className={comStyles.fieldName}>{item.fieldName}</div>
      <div className={comStyles.fieldOpts}>
        <DragHandle />
        <DeleteSvg
          className={comStyles.fieldDel}
          onClick={() => {
            delField(idxObj.index, index);
          }}
        ></DeleteSvg>
      </div>
    </div>
  ),
  { withRef: true },
);

const DragContainer: any = SortableContainer(
  ({
    FieldList,
    delField,
  }: {
    FieldList: FieldListItem[];
    delField: (index: number) => void;
  }) => {
    return (
      <div>
        {FieldList.map((field, index) => {
          return (
            <>
              {/* @ts-ignore */}
              <SorListItem
                key={index}
                index={index}
                idxObj={{ index }}
                item={field}
                delField={delField}
              />
            </>
          );
        })}
      </div>
    );
  },
);

export interface DragSortListProps {}

export const DragSortList = (props: DragSortListProps) => {
  const [fieldList, setFieldList] = useState<FieldListItem[]>(fieldListDefault);

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    console.log(oldIndex, newIndex);
  };

  const delField = (index: number, idx: number) => {
    console.log(index, idx);
    // setFieldList((fieldList) => {
    //   return fieldList.filter((i, idx) => {
    //     return idx !== index;
    //   });
    // });
  };
  return (
    <div className={comStyles.DragSortContainer}>
      <p>react-sortable-hoc 拖拽排序</p>
      <div className={comStyles.fieldItem}>
        <div
          className={comStyles.fieldName}
          style={{ backgroundColor: 'unset' }}
        >
          名称
        </div>
        <div className={comStyles.fieldOpts}>操作</div>
      </div>
      <DragContainer
        pressDelay={100} // 按下的延迟时间 默认为0  此时会吞食点击事件
        useDragHandle={true} // 是否开启拖拽手柄 默认是false
        FieldList={fieldList}
        onSortEnd={onSortEnd}
        delField={delField}
      />
    </div>
  );
};

export default DragSortList;
