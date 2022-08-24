import { CSSProperties, FC, useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import {
  DragSortModal,
  useDragSortModal,
  DragSortList,
  DragSortDnd,
} from '@/components';

const DragSort = () => {
  const dragSort = useDragSortModal();

  return (
    <div className={styles.DragSortContainer}>
      <h1>Drag Sort</h1>
      <div>
        <Button
          onClick={() => {
            dragSort.show();
          }}
        >
          Show DragSort Modal
        </Button>
        <div className={styles.DragSortListContainer}>
          <DragSortList />
        </div>
        <div className={styles.DragSortListContainer}>
          <DragSortDnd />
        </div>
      </div>
      <DragSortModal {...dragSort.getProps()} />
    </div>
  );
};

export default DragSort;
