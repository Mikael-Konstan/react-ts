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

const DragItem: any = SortableElement(
  ({
    index,
    item,
    delField,
  }: {
    index: number;
    item: FieldListItem;
    delField: (index: number) => void;
  }) => (
    <div className={comStyles.fieldItem}>
      <div className={comStyles.fieldName}>{item.fieldName}</div>
      <div className={comStyles.fieldOpts}>
        <DragHandle />
        <span
          onClick={() => {
            console.log(index);
            delField(index);
          }}
          onDoubleClick={() => {
            console.log(index);
            delField(index);
          }}
        >
          <DeleteSvg
            className={comStyles.fieldDel}
            onClick={() => {
              console.log(index);
              delField(index);
            }}
          ></DeleteSvg>
        </span>
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
              <DragItem
                key={index}
                index={index}
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
  const onSortStart = (a: any) => {
    console.log(a);
    return false;
  };

  const delField = (index: number) => {
    console.log(index);
    setFieldList((fieldList) => {
      return fieldList.filter((i, idx) => {
        return idx !== index;
      });
    });
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
        FieldList={fieldList}
        onSortEnd={onSortEnd}
        // onSortStart={onSortStart}
        delField={delField}
      />
    </div>
  );
};

export default DragSortList;
