import type { CSSProperties, FC } from 'react';
import { useDrop } from 'react-dnd';
import { DropTypes } from './DropTypes';

const style: CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
};

interface TargetBoxProps {
  setDragItem?: Function;
}

export const TargetBox: FC<TargetBoxProps> = ({ setDragItem }) => {
  const [{ isActive }, drop] = useDrop(() => ({
    accept: DropTypes.BOX,
    drop: (item: any, monitor: any) => {
      setDragItem && setDragItem(item);
    },
    // hover(item: any, monitor: any) {},
    collect: (monitor: any) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={style}>
      {isActive ? 'Release to drop' : 'Drag item here'}
    </div>
  );
};
