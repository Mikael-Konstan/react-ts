import { useEffect, useState } from 'react';
import { BtnListItem } from './../index';

export interface ColorChildListProps {
  children: BtnListItem[];
  selectChildIdx: number;
  parentId: string;
  parentIndex: number;
  menuChildItemClick: (...items: Array<any>) => any;
}

export const ColorChildList = (props: ColorChildListProps) => {
  const [selectChildIdx, setSelectChildIdx] = useState<number>(0);
  useEffect(() => {
    setSelectChildIdx(props.selectChildIdx);
  }, [props.selectChildIdx]);

  const menuChildClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <div
      className="leftOperationBarChildrensColor"
      onClick={(e) => {
        menuChildClick(e);
      }}
    >
      {props.children
        .filter((item) => {
          return item.show;
        })
        .map((childItem) => {
          let index = props.children.findIndex((item) => {
            return item.id === childItem.id;
          });
          return (
            <div
              key={childItem.id}
              className={`leftOperationBarChildColor ${
                index === selectChildIdx
                  ? 'leftOperationBarChildColorActive'
                  : ''
              }`}
              style={{ backgroundColor: childItem.hex }}
              onClick={(e) => {
                props.menuChildItemClick(
                  childItem,
                  index,
                  props.parentIndex,
                  e,
                );
              }}
            ></div>
          );
        })}
    </div>
  );
};
