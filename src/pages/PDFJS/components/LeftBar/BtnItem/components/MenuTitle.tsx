import { BtnListItem } from './../index';

export interface MenuTitleProps extends BtnListItem {}

// 主菜单title
export const MenuTitle = (props: MenuTitleProps) => {
  const childSelected =
    props.children && props.children[props.selectChildIdx || 0];
  if (childSelected) {
    return childSelected.title;
  } else {
    return props.title;
  }
};
