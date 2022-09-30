import {
  BtnEnum,
  CrossTypeEnum,
  DrawingTypeEnum,
  SelectTypeEnum,
} from './enum';

export type BooleanToggle = 'true' | 'false' | boolean;

export type CanvasInit = (() => any) | null | undefined;

export type CanvasTextIpt = HTMLTextAreaElement | null | undefined;

export type ShapesChange =
  | ((type: string, val?: any) => any)
  | null
  | undefined;

export type Ready = ((Core: any) => any) | null | undefined;

export type EventCB = (...items: Array<any>) => any;

export type DrawIngStatus = 'readying' | 'pending';

export type DrawingType =
  | DrawingTypeEnum.PEN
  | DrawingTypeEnum.TEXT
  | DrawingTypeEnum.RECT
  | DrawingTypeEnum.ARC
  | DrawingTypeEnum.ARROWTRIANGLE
  | DrawingTypeEnum.LINE
  | DrawingTypeEnum.ARROWRADIUS
  | DrawingTypeEnum.ARROWDOUBLE
  | DrawingTypeEnum.CLOUD
  | DrawingTypeEnum.ANCHOR;

export interface ShapesDataTextParams {
  type: DrawingTypeEnum.TEXT;
  text: string;
  x: number;
  y: number;
  fontColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  rows?: number;
  show?: boolean;
}

export interface ShapesDataRectParams {
  type: DrawingTypeEnum.RECT;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth?: number;
  fillStyle?: string;
}

export interface ShapesDataArcParams {
  type: DrawingTypeEnum.ARC;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth?: number;
  fillStyle?: string;
}

export interface ShapesDataArrowParams {
  type:
    | DrawingTypeEnum.ARROWTRIANGLE
    | DrawingTypeEnum.LINE
    | DrawingTypeEnum.ARROWRADIUS
    | DrawingTypeEnum.ARROWDOUBLE;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth?: number;
  fillStyle?: string;
}

export interface ShapesDataCloudParams {
  type: DrawingTypeEnum.CLOUD;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fillStyle?: string;
}

export interface ShapesDataAnchorParams {
  type: DrawingTypeEnum.ANCHOR;
  x: number;
  y: number;
  iconSize?: number;
}

export type ShapesDataParams =
  | ShapesDataTextParams
  | ShapesDataRectParams
  | ShapesDataArcParams
  | ShapesDataArrowParams
  | ShapesDataCloudParams
  | ShapesDataAnchorParams;

export interface ShapesDataPen {
  type: DrawingTypeEnum.PEN;
  points: Array<Array<number>>;
  lineWidth: number;
  fillStyle: string;
  code: string;
  [field: string]: any;
}

export interface ShapesDataText {
  type: DrawingTypeEnum.TEXT;
  text: string;
  x: number;
  y: number;
  fontColor: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  rows: number;
  code: string;
  versionId?: string;
  [field: string]: any;
}

export interface ShapesDataRect {
  type: DrawingTypeEnum.RECT;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth: number;
  fillStyle: string;
  code: string;
  versionId?: string;
  [field: string]: any;
}

export interface ShapesDataArc {
  type: DrawingTypeEnum.ARC;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth: number;
  fillStyle: string;
  code: string;
  versionId?: string;
  [field: string]: any;
}

export interface ShapesDataArrow {
  type:
    | DrawingTypeEnum.ARROWTRIANGLE
    | DrawingTypeEnum.LINE
    | DrawingTypeEnum.ARROWRADIUS
    | DrawingTypeEnum.ARROWDOUBLE;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth: number;
  fillStyle: string;
  code: string;
  versionId?: string;
  [field: string]: any;
}

export interface ShapesDataCloud {
  type: DrawingTypeEnum.CLOUD;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fillStyle: string;
  code: string;
  scale: number;
  versionId?: string;
  [field: string]: any;
}

export interface ShapesDataAnchor {
  type: DrawingTypeEnum.ANCHOR;
  x: number;
  y: number;
  iconSize: number;
  code: string;
  versionId?: string;
  [field: string]: any;
}

export type ShapesDataItem =
  | ShapesDataText
  | ShapesDataRect
  | ShapesDataArc
  | ShapesDataArrow
  | ShapesDataCloud
  | ShapesDataAnchor;

export type ShapesData = Array<ShapesDataItem>;

export interface selectTarget {
  type: DrawingType;
  text?: string;
  x?: number;
  y?: number;
  fontColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  rows?: number;
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
  fillStyle?: string;
}

export interface PointsItem {
  x: number;
  y: number;
}

export interface Offset extends PointsItem {}

export interface PointData {
  // 自定义图案定位点 数据
  pointTarget: ShapesDataItem | null;
  pointCode: string;
  points: Array<PointsItem>;
  originPoints: Array<PointsItem>;
}

export interface DefaultShapeStyle {
  fontColor: string;
  fontSize: number;
  fillStyle: string;
  fontWeight: string;
  fontFamily: string;
  lineWidth: number;
}

export interface ShapeStyle {
  fontColor?: string;
  fontSize?: number;
  fillStyle?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineWidth?: number;
}

export type SelectType =
  | SelectTypeEnum.MULTI
  | SelectTypeEnum.LASSO
  | SelectTypeEnum.CLUSTERSELECT;

export type CrossType =
  | CrossTypeEnum.BOTH
  | CrossTypeEnum.CONTENT
  | CrossTypeEnum.LINE;

export type BtnType = BtnEnum.DETAIL | BtnEnum.EDIT | BtnEnum.DELETE;
