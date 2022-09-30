import { Tooltip } from 'century';
import { FC, useEffect, useState } from 'react';
import './index.less';

import { ChildList } from './components/ChildList';
import { ColorChildList } from './components/ColorChildList';
import { MenuIcon } from './components/MenuIcon';
import { MenuTitle } from './components/MenuTitle';
import { btnList, Colors, getChildSelected, Widths } from './components/utils';

export interface BtnItemProps {
  drawingTypeChange?: (value: string) => void;
  drawingLineWidthChange?: (value: number) => void;
  drawingColorChange?: (value: string) => void;
  drawingSizeChange?: (value: number) => void;
  drawingSelectTypeChange?: (value: string) => void;
}

export interface BtnListItem {
  id: string;
  title: string;
  icon?: any;
  show: boolean;
  selectChildIdx?: number;
  children?: BtnListItem[];
  hex?: string;
  width?: number;
}

export const BtnItem: FC<BtnItemProps> = (props: BtnItemProps) => {
  const [activeId, setActiveId] = useState<string>('move'); // 主菜单是否高亮
  const [selectedId, setSelectedId] = useState<string>(''); // 子菜单显隐
  const [menuList, setMenuList] = useState<BtnListItem[]>(btnList); // 菜单列表
  useEffect(() => {
    props.drawingColorChange && props.drawingColorChange(Colors.RED);
    props.drawingLineWidthChange && props.drawingLineWidthChange(Widths.PX2);
  }, []);
  // 主菜单点击
  const menuClick = (item: BtnListItem) => {
    const childSelected = getChildSelected(item.children, activeId);
    if (childSelected) {
      setActiveId(childSelected.id);
    } else {
      setActiveId(item.id);
    }
    setSelectedId((selectedId) => {
      let id = selectedId === item.id ? '' : item.id;
      return id;
    });
    if (item.children && item.children.length > 0) {
      setCanvasStatus(item.children[item.selectChildIdx || 0]);
    } else {
      setCanvasStatus(item);
    }
  };
  // 子菜单点击
  const menuChildItemClick = (
    item: BtnListItem,
    index: number,
    parentIndex: number,
    e: any,
  ) => {
    e.stopPropagation();
    setActiveId(item.id); // 值变动 触发更新
    setMenuList((menu) => {
      menu[parentIndex].selectChildIdx = index;
      return menu;
    });
    setCanvasStatus(item);
  };
  // 设置canvas状态
  const setCanvasStatus = (item: BtnListItem) => {
    if (
      !props.drawingTypeChange ||
      !props.drawingSelectTypeChange ||
      !props.drawingColorChange ||
      !props.drawingLineWidthChange
    ) {
      return;
    }
    switch (item.id) {
      case 'move':
        props.drawingTypeChange('');
        props.drawingSelectTypeChange('');
        break;
      case 'select':
        props.drawingSelectTypeChange('multi');
        break;
      case 'cloud':
        props.drawingTypeChange('cloud');
        break;
      case 'rect':
        props.drawingTypeChange('rect');
        break;
      case 'ellipse':
        props.drawingTypeChange('arc');
        break;
      case 'anchor':
        props.drawingTypeChange('anchor');
        break;
      case 'arrow':
        props.drawingTypeChange('arrowRadius');
        break;
      case 'line':
        props.drawingTypeChange('line');
        break;
      case 'arrowDouble':
        props.drawingTypeChange('arrowDouble');
        break;
      case 'text':
        props.drawingTypeChange('text');
        break;
      case 'red':
      case 'orange':
      case 'yellow':
      case 'green':
      case 'blue':
      case 'black':
        props.drawingColorChange(item.hex || Colors.RED);
        break;
      case '2px':
      case '4px':
      case '8px':
      case '16px':
      case '24px':
        props.drawingLineWidthChange(item.width || Widths.PX2);
        break;
      default:
        break;
    }
  };
  return (
    <>
      {menuList
        .filter((item) => {
          return item.show;
        })
        .map((item) => {
          const hasChild = item.children && item.children.length > 0;
          const childIds = (item.children || []).map((child) => {
            return child.id;
          });
          const activeFlag =
            item.id === activeId ||
            Array.prototype.includes.call(childIds, activeId);
          let index = menuList.findIndex((menuItem) => {
            return menuItem.id === item.id;
          });
          return (
            <Tooltip key={item.title} title={MenuTitle(item)} placement="left">
              <div
                className={`leftOperationBarBtn ${
                  activeFlag ? 'leftOperationBarBtnActive' : ''
                }`}
                onClick={() => {
                  menuClick(item);
                }}
              >
                <MenuIcon {...item}></MenuIcon>
                {hasChild ? <p className="cornerMark"></p> : <></>}
                {item.id === selectedId &&
                  item.children &&
                  item.children.length > 0 &&
                  (item.id === 'color' ? (
                    <ColorChildList
                      children={item.children}
                      selectChildIdx={item.selectChildIdx || 0}
                      parentId={item.id}
                      parentIndex={index}
                      menuChildItemClick={menuChildItemClick}
                    ></ColorChildList>
                  ) : (
                    <ChildList
                      children={item.children}
                      selectChildIdx={item.selectChildIdx || 0}
                      parentId={item.id}
                      parentIndex={index}
                      menuChildItemClick={menuChildItemClick}
                    ></ChildList>
                  ))}
              </div>
            </Tooltip>
          );
        })}
    </>
  );
};
