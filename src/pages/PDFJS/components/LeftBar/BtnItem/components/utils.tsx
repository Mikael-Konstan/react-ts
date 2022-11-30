import { DownOutlined } from '@ant-design/icons';
import {
  ColorSvg,
  RectSvg,
  MoveSvg,
  SelectSvg,
  CloudSvg,
  EllipseSvg,
  AnchorSvg,
  ArrowSvg,
  ArrowDoubleSvg,
  LineSvg,
  TextSvg,
} from './../../../icon';
import { BtnListItem } from './../index';

export enum Colors {
  RED = '#E02020',
  ORANGE = '#FA6400',
  YELLOW = '#F7B500',
  GREEN = '#6DD400',
  BLUE = '#0091FF',
  BLACK = '#000000',
}

export enum Widths {
  PX2 = 2,
  PX4 = 4,
  PX8 = 8,
  PX16 = 16,
  PX24 = 24,
}

export const getChildSelected = (
  children: BtnListItem[] | undefined,
  activeId: string,
) => {
  return (
    children &&
    children.find((item) => {
      return item.id === activeId;
    })
  );
};

// 菜单数据
export const btnList: BtnListItem[] = [
  {
    id: 'move',
    title: '移动',
    icon: <MoveSvg type="icon-yidong1" />,
    show: true,
    selectChildIdx: 0,
    children: [
      {
        id: 'move',
        title: '移动',
        icon: <MoveSvg type="icon-yidong1" />,
        show: true,
      },
      {
        id: 'select',
        title: '选择',
        icon: <SelectSvg type="icon-xuanze" />,
        show: true,
      },
    ],
  },
  {
    id: 'rect',
    title: '矩形',
    icon: <RectSvg type="icon-juxing" />,
    show: true,
    selectChildIdx: 1,
    children: [
      {
        id: 'cloud',
        title: '云线',
        icon: <CloudSvg type="icon-yunxian" />,
        show: true,
      },
      {
        id: 'rect',
        title: '矩形',
        icon: <RectSvg type="icon-juxing" />,
        show: true,
      },
      {
        id: 'ellipse',
        title: '椭圆',
        icon: <EllipseSvg type="icon-tuoyuan" />,
        show: true,
      },
    ],
  },
  {
    id: 'anchor',
    title: '图钉',
    icon: <AnchorSvg type="icon-tuding2" />,
    show: true,
    selectChildIdx: 0,
    children: [],
  },
  {
    id: 'arrow',
    title: 'Arrow',
    icon: <ArrowSvg type="icon-jiantou" />,
    show: true,
    selectChildIdx: 0,
    children: [
      {
        id: 'arrow',
        title: '箭头',
        icon: <ArrowSvg type="icon-jiantou" />,
        show: true,
      },
      {
        id: 'line',
        title: '直线',
        icon: <LineSvg type="icon-zhixian" />,
        show: true,
      },
      {
        id: 'arrowDouble',
        title: '双箭头',
        icon: <ArrowDoubleSvg type="icon-shuangjiantou" />,
        show: true,
      },
    ],
  },
  {
    id: 'text',
    title: '文本',
    icon: <TextSvg type="icon-Text" />,
    show: true,
    selectChildIdx: 0,
    children: [],
  },
  {
    id: 'distance',
    title: 'Distance',
    icon: <RectSvg></RectSvg>,
    show: false,
    selectChildIdx: 0,
    children: [],
  },
  {
    id: 'color',
    title: '红色',
    icon: <ColorSvg />,
    show: true,
    selectChildIdx: 0,
    children: [
      {
        id: 'red',
        title: '红色',
        show: true,
        hex: Colors.RED,
      },
      {
        id: 'orange',
        title: '橙色',
        show: true,
        hex: Colors.ORANGE,
      },
      {
        id: 'yellow',
        title: '黄色',
        show: true,
        hex: Colors.YELLOW,
      },
      {
        id: 'green',
        title: '绿色',
        show: true,
        hex: Colors.GREEN,
      },
      {
        id: 'blue',
        title: '蓝色',
        show: true,
        hex: Colors.BLUE,
      },
      {
        id: 'black',
        title: '黑色',
        show: true,
        hex: Colors.BLACK,
      },
    ],
  },
  {
    id: 'width',
    title: '8px',
    icon: <RectSvg></RectSvg>,
    show: true,
    selectChildIdx: 0,
    children: [
      {
        id: '2px',
        title: '2px',
        show: true,
        width: Widths.PX2,
      },
      {
        id: '4px',
        title: '4px',
        show: true,
        width: Widths.PX4,
      },
      {
        id: '8px',
        title: '8px',
        show: true,
        width: Widths.PX8,
      },
      {
        id: '16px',
        title: '16px',
        show: true,
        width: Widths.PX16,
      },
      {
        id: '24px',
        title: '24px',
        show: true,
        width: Widths.PX24,
      },
    ],
  },
];
