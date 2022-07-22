import { FC, ReactNode } from 'react';
import { useDrag } from 'react-dnd';

interface DragHookProps {
  dragItem: any;
  dropType: string;
  children?: ReactNode;
  showCopyIcon?: boolean;
}

export const DragHook: FC<DragHookProps> = ({
  dragItem,
  dropType,
  children,
  showCopyIcon,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dropType,
      options: {
        dropEffect: showCopyIcon ? 'copy' : 'move',
      },
      // 设置脱拽的item
      item: dragItem,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      // end: (item, monitor) => {},
    }),
    [showCopyIcon],
  );

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {children}
    </div>
  );
};
