import { DrawingTypeEnum, SelectTypeEnum } from './enum';

export const defaultShapeStyle = {
  fontColor: '#f40',
  fontSize: 16,
  strokeStyle: '#f40',
  fillStyle: '#f40',
  fontWeight: '500',
  fontFamily: 'serif',
  lineWidth: 2,
  iconSize: 100, // 铆钉大小(scale为1时)
};

export const radiusAngle = Math.PI / 2;

export const drawingTypes = [
  DrawingTypeEnum.TEXT,
  DrawingTypeEnum.RECT,
  DrawingTypeEnum.ARC,
  DrawingTypeEnum.ARROWTRIANGLE,
  DrawingTypeEnum.LINE,
  DrawingTypeEnum.ARROWRADIUS,
  DrawingTypeEnum.ARROWDOUBLE,
  DrawingTypeEnum.CLOUD,
  DrawingTypeEnum.ANCHOR,
];

export const defaultDrawingType = '';

export const selectTypes = [SelectTypeEnum.MULTI, SelectTypeEnum.LASSO];

export const defaultSelectType = '';

export const cloudRX = 6;
export const cloudRY = 4;

export const pointR = 3;

// 设置数据原始比例为1
export const defaultScale = 1;

export const rectAry = [
  DrawingTypeEnum.RECT,
  DrawingTypeEnum.ARC,
  'arcFrame',
  DrawingTypeEnum.LINE,
  DrawingTypeEnum.ARROWRADIUS,
  DrawingTypeEnum.ARROWDOUBLE,
  DrawingTypeEnum.CLOUD,
];

export const pointAry = [
  DrawingTypeEnum.TEXT,
  'arcPoint',
  SelectTypeEnum.MULTI,
  SelectTypeEnum.LASSO,
];

export const transparentWidth = 14;

export const TextIptDefaultStyle = {
  overflow: 'hidden',
  resize: 'none',
  backgroundColor: 'transparent',
  borderColor: '#f40',
  borderWidth: 1,
  padding: 4,
  width: 180,
  maxWidth: 180,
  wordWrap: 'break-word',
  outline: 'none',
  display: 'none',
  position: 'fixed',
  zIndex: '999999',
  top: 0,
  left: 0,
  fontColor: 'unset',
  fontSize: 'unset',
  fontFamily: 'unset',
  fontWeight: 'unset',
};

export const fileSize = 100; // img标签原始大小 计算使用
