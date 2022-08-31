import { DeleteSvg, Link } from '@/components';
import { HolderOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './index.less';
import comStyles from './../common.less';
import { fieldListDefault } from '@/components/config';
import { FieldListItem } from '@/utils/type';
import { DragSortListHocComp } from '@/components/DragSortListHocComp';

export interface DragSortListProps {}

export const DragSortListHoc = (props: DragSortListProps) => {
  const [fieldList, setFieldList] = useState<FieldListItem[]>(fieldListDefault);

  const delField = (index: number) => {
    console.log(index);
    setFieldList((fieldList) => {
      return fieldList.filter((i, idx) => {
        return idx !== index;
      });
    });
  };

  const DragHandle = () => (
    <HolderOutlined
      className={comStyles.fieldMove}
      style={{ cursor: 'grab', color: '#999' }}
    />
  );

  const DragItem = ({
    item,
    idxObj,
    DragHandle,
  }: {
    item: FieldListItem;
    idxObj: { index: number };
    DragHandle?: any;
  }) => {
    return (
      <div className={comStyles.fieldItem}>
        <div className={comStyles.fieldName}>{item.title}</div>
        <div className={comStyles.fieldOpts}>
          {DragHandle && <DragHandle />}
          <DeleteSvg
            className={comStyles.fieldDel}
            onClick={() => {
              delField(idxObj.index);
            }}
          ></DeleteSvg>
        </div>
      </div>
    );
  };

  return (
    <div className={comStyles.ModalContainer}>
      <p>
        <Link href="https://www.5axxw.com/wiki/content/hrpw3t">
          react-sortable-hoc
        </Link>
        拖拽排序
      </p>
      <div className={comStyles.fieldItem}>
        <div
          className={comStyles.fieldName}
          style={{ backgroundColor: 'unset' }}
        >
          名称
        </div>
        <div className={comStyles.fieldOpts}>操作</div>
      </div>
      <DragSortListHocComp
        sortList={fieldList}
        setSortList={(sortList) => {
          setFieldList(sortList);
        }}
        DragItem={DragItem}
        DragHandle={DragHandle}
      />
    </div>
  );
};

export default DragSortListHoc;
