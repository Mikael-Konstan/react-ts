import { BtnListItem } from './../index';
import { WidthIcon } from './WithIcon';
import { ColorSvg } from './../../../icon';

export interface MenuIconProps extends BtnListItem {}

// 主菜单icon
export const MenuIcon = (props: MenuIconProps) => {
  const childSelected =
    props.children && props.children[props.selectChildIdx || 0];
  if (childSelected) {
    if (props.id === 'color') {
      return (
        <>
          <ColorSvg
            style={{ color: childSelected.hex || '#E02020' }}
          ></ColorSvg>
        </>
      );
    } else if (props.id === 'width') {
      const widthIconHeight = `${(childSelected.width || 8) / 2}px`;
      return <WidthIcon widthIconHeight={widthIconHeight}></WidthIcon>;
    } else {
      return <>{childSelected.icon}</>;
    }
  } else {
    return props.icon;
  }
};
