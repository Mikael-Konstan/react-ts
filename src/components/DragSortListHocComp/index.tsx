import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

interface DragSortListHocCompProps {
  sortList: any[];
  setSortList: (sortList: any[]) => void;
  DragItem: (props: any) => JSX.Element;
  DragHandle?: (props: any) => JSX.Element;
  pressDelay?: number;
  useDragHandle?: boolean;
  onSortEnd?: ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => void;
  [key: string]: any;
}

const DragSortListHocComp = (props: DragSortListHocCompProps) => {
  const onSortEndDefault = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    // console.log(oldIndex, newIndex);
    if (
      oldIndex !== newIndex &&
      oldIndex !== undefined &&
      newIndex !== undefined
    ) {
      if (
        Array.isArray(props.sortList) &&
        props.sortList.length > 0 &&
        props.setSortList
      ) {
        const list = props.sortList.map((i) => i);
        if (oldIndex > newIndex) {
          list.splice(oldIndex, 1);
          list.splice(newIndex, 0, props.sortList[oldIndex]);
        } else {
          list.splice(newIndex + 1, 0, props.sortList[oldIndex]);
          list.splice(oldIndex, 1);
        }
        props.setSortList(list);
      }
    }
  };

  const DragContainerDefaultProps = {
    pressDelay: 60, // 按下的延迟时间 默认为0  此时会吞食点击事件
    useDragHandle: true, // 是否开启拖拽手柄 默认是false
    onSortEnd: onSortEndDefault,
    ...props,
  };

  const DragItem: any = SortableElement(props.DragItem);

  const DragContainerJSX: any = SortableContainer(() => {
    let DragHandleJSX: any = null;
    if (!!props.DragHandle) {
      DragHandleJSX = SortableHandle(props.DragHandle);
    }
    return (
      <div className="DragContainer">
        {props.sortList.map((item, index) => {
          return (
            <DragItem
              key={item.id || index}
              index={index}
              DragHandle={DragHandleJSX}
              idxObj={{ index }}
              item={item}
            ></DragItem>
          );
        })}
      </div>
    );
  });

  return <DragContainerJSX {...DragContainerDefaultProps}></DragContainerJSX>;
};

export { DragSortListHocComp, DragSortListHocCompProps };
