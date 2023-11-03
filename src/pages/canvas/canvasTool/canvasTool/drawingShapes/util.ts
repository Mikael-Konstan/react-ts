import {
  defaultScale,
  defaultShapeStyle,
  pointAry,
  rectAry,
} from './../config';
import { allParams } from './types';

// 获取缩放后坐标
export const getCurParams = function (
  type: string,
  scaleCur: number,
  params: any,
): allParams {
  let obj: allParams = {
    x: 0,
    y: 0,
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    version: '',
    ...defaultShapeStyle,
    ...params,
  };
  if (Array.prototype.includes.call(rectAry, type)) {
    obj.fromX = (params.fromX * scaleCur) / defaultScale;
    obj.fromY = (params.fromY * scaleCur) / defaultScale;
    obj.toX = (params.toX * scaleCur) / defaultScale;
    obj.toY = (params.toY * scaleCur) / defaultScale;
  }
  if (Array.prototype.includes.call(pointAry, type)) {
    obj.x = (params.x * scaleCur) / defaultScale;
    obj.y = (params.y * scaleCur) / defaultScale;
  }
  return obj;
};

// 获取中心坐标点
export const getCenter = function (x1: number, x2: number) {
  return x1 + (x2 - x1) / 2;
};
