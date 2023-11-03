import { useEffect, useState } from 'react';
import { BtnListItem } from './../index';
import { WidthIcon } from './WithIcon';

export interface ChildListProps {
  children: BtnListItem[];
  selectChildIdx: number;
  parentId: string;
  parentIndex: number;
  menuChildItemClick: (...items: Array<any>) => any;
}

export const ChildList = (props: ChildListProps) => {
  const [selectChildIdx, setSelectChildIdx] = useState<number>(0);
  useEffect(() => {
    setSelectChildIdx(props.selectChildIdx);
  }, [props.selectChildIdx]);

  const menuChildClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <div
      className="leftOperationBarChildrens"
      onClick={(e) => {
        menuChildClick(e);
      }}
    >
      {props.children
        .filter((item) => {
          return item.show;
        })
        .map((childItem) => {
          const widthIconHeight = `${(childItem.width || 8) / 2}px`;
          let index = props.children.findIndex((item) => {
            return item.id === childItem.id;
          });
          return (
            <div
              key={childItem.id}
              className={`leftOperationBarChild ${
                index === selectChildIdx ? 'leftOperationBarChildActive' : ''
              }`}
              onClick={(e) => {
                props.menuChildItemClick(
                  childItem,
                  index,
                  props.parentIndex,
                  e,
                );
              }}
            >
              <span className="activeBradge"></span>
              <span className="leftOperationBarChildIcon">
                {props.parentId === 'width' ? (
                  <WidthIcon widthIconHeight={widthIconHeight}></WidthIcon>
                ) : (
                  childItem.icon
                )}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  minWidth: '36px',
                  textAlign: 'left',
                }}
              >
                {childItem.title}
              </span>
            </div>
          );
        })}
    </div>
  );
};
