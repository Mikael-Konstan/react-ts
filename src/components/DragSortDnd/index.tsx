import { DeleteSvg } from '@/components';
import { HolderOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import comStyles from './../common.less';
import { fieldListDefault } from './../config';
import { FieldListItem } from './../type';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
//@ts-ignore
import { cloneDeep } from 'lodash';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface DragSortDndItemProps {}

export const DragSortDndItem = (props: any) => {
  const { index = '', changePosition = () => {}, children } = props;
  const ref: any = useRef(null);
  // 因为没有定义收集函数，所以返回值数组第一项不要
  const [, drop] = useDrop({
    accept: 'DragDropBox', // 只对useDrag的type的值为DragDropBox时才做出反应
    hover: (item: any, monitor: any) => {
      // 这里用节流可能会导致拖动排序不灵敏
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return; // 如果回到自己的坑，那就什么都不做
      changePosition(dragIndex, hoverIndex); // 调用传入的方法完成交换
      item.index = hoverIndex; // 将当前当前移动到Box的index赋值给当前拖动的box，不然会出现两个盒子疯狂抖动！
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DragDropBox',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // css样式需要
    }),
    canDrag: (monitor) => {
      console.log(monitor);

      return true;
    },
  }));
  const changeRef = drag(drop(ref));
  return (
    // ref 这样处理可以使得这个组件既可以被拖动也可以接受拖动
    <div
      //@ts-ignore
      ref={changeRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="dragBox"
    >
      {children}
    </div>
  );
};

export interface DragSortDndProps {}

export const DragSortDnd = (props: any) => {
  const [fieldList, setFieldList] = useState<FieldListItem[]>(fieldListDefault);
  const changePosition = (dragIndex: any, hoverIndex: any) => {
    const data = cloneDeep(fieldList);
    const temp = data[dragIndex];
    // 交换位置
    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = temp;
    console.log('交换完成---', data);
    setFieldList(data);
  };
  return (
    <div>
      <p>React-Dnd 拖拽排序</p>
      <DndProvider backend={HTML5Backend}>
        {fieldList.length > 0 ? (
          <div>
            {fieldList.map((item: any, index: any) => {
              return (
                <DragSortDndItem
                  rowKey={item?.id}
                  index={index}
                  id={item?.id}
                  changePosition={changePosition}
                >
                  <div key={item?.id} className={comStyles.fieldItem}>
                    <div className={comStyles.fieldName}>{item.fieldName}</div>
                    <div className={comStyles.fieldOpts}>
                      <HolderOutlined className={comStyles.fieldMove} />
                    </div>
                  </div>
                </DragSortDndItem>
              );
            })}
          </div>
        ) : null}
      </DndProvider>
    </div>
  );
};

export default DragSortDnd;
