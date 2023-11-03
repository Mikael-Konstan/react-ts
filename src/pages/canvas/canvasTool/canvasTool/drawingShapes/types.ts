import { PointsItem } from './../type';
export interface anchorParams {
  x: number;
  y: number;
  anchorSvg: HTMLImageElement;
  iconSize?: number;
  bigSizeFlag?: boolean; // 放大flag
  [field: string]: any;
}
export interface TextParams {
  text: string;
  x: number;
  y: number;
  fontColor?: string;
  fontWeight?: string;
  fontSize?: number;
  fontFamily?: string;
  canvasWidth?: number;
  version?: string;
  paintVersion?: boolean;
  mousePosi?: PointsItem | null;
  [field: string]: any;
}

export interface TextFrameParams {
  x: number;
  y: number;
  fontSize?: number;
  strokeStyle?: string;
  rows?: number;
  [field: string]: any;
}

export interface RectParams {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth?: number;
  fillStyle?: string;
  [field: string]: any;
}

export interface ArcParams extends RectParams {}

export interface ArcFrameParams {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  [field: string]: any;
}

export interface ArrowTriangleParams {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  headlen?: number;
  fillStyle?: string;
  [field: string]: any;
}

export interface LineParams {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineWidth?: number;
  fillStyle?: string;
  [field: string]: any;
}

export interface ArrowRadiusParams extends LineParams {}

export interface ArrowDoubleParams extends LineParams {}

export interface CloudParams {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fillStyle?: string;
  [field: string]: any;
}

export interface BtnParams {
  x: number;
  y: number;
  detailSvg: HTMLImageElement;
  editSvg: HTMLImageElement;
  deleteSvg: HTMLImageElement;
  paintVersion?: boolean;
  version?: string;
  curVersion?: boolean;
  [field: string]: any;
}

export type ShapesParams =
  | TextParams
  | RectParams
  | ArcParams
  | ArrowTriangleParams
  | LineParams
  | ArrowRadiusParams
  | ArrowDoubleParams
  | CloudParams;

export interface PointParams {
  x: number;
  y: number;
}

export interface allParams {
  type: string;
  text: string;
  x: number;
  y: number;
  fontColor: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  rows: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
  iconSize: number;
  version: string;
}

export interface SvgMaps {
  [key: string]: HTMLImageElement;
}
