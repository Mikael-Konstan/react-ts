import { radiusAngle, transparentWidth } from './../config';
import { DrawingTypeEnum } from './../enum';
import {
  ArrowDoubleParams,
  ArrowRadiusParams,
  ArrowTriangleParams,
  LineParams,
} from './types';
import { getCurParams } from './util';

// 单个箭头 微信版
export const arrowTriangle = function arrowTriangle(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  arrowTriangleParams: ArrowTriangleParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY, fillStyle } = getCurParams(
    DrawingTypeEnum.ARROWTRIANGLE,
    scaleCur,
    arrowTriangleParams,
  );
  const headlen = 12;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.lineWidth = 1; // 宽度
  ctx.strokeStyle = fillStyle; // 线条颜色
  ctx.fillStyle = fillStyle; // 填充色
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(
    Math.ceil(toX - headlen * Math.cos(angle - Math.PI / 6)),
    Math.ceil(toY - headlen * Math.sin(angle - Math.PI / 6)),
  );
  ctx.lineTo(toX, toY);
  ctx.lineTo(
    Math.ceil(toX - headlen * Math.cos(angle + Math.PI / 6)),
    Math.ceil(toY - headlen * Math.sin(angle + Math.PI / 6)),
  );
  ctx.lineTo(fromX, fromY);

  ctx.moveTo(
    Math.ceil(toX - 2 * headlen * Math.cos(angle - Math.PI / 6)),
    Math.ceil(toY - 2 * headlen * Math.sin(angle - Math.PI / 6)),
  );
  ctx.lineTo(toX, toY);
  ctx.lineTo(
    Math.ceil(toX - 2 * headlen * Math.cos(angle + Math.PI / 6)),
    Math.ceil(toY - 2 * headlen * Math.sin(angle + Math.PI / 6)),
  );
  ctx.lineTo(
    Math.ceil(toX - headlen * Math.cos(angle)),
    Math.ceil(toY - headlen * Math.sin(angle)),
  );

  ctx.fill();
  ctx.stroke();
};

// 直线(弧度端点)
export const line = function line(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  lineParams: LineParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY, lineWidth, strokeStyle, fillStyle } =
    getCurParams(DrawingTypeEnum.LINE, scaleCur, lineParams);
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  // 圆弧数据
  const w = lineWidth / 2;
  const len = w / Math.tan(radiusAngle);
  ctx.beginPath();
  ctx.lineWidth = 2; // 宽度
  ctx.strokeStyle = strokeStyle; // 线条颜色
  ctx.fillStyle = fillStyle; // 填充色
  // form第一个角
  ctx.moveTo(
    fromX - w * Math.cos(angle + Math.PI / 2),
    fromY - w * Math.sin(angle + Math.PI / 2),
  );
  // to第一个角
  ctx.lineTo(
    toX - w * Math.cos(angle + Math.PI / 2),
    toY - w * Math.sin(angle + Math.PI / 2),
  );
  // 目标点圆弧
  ctx.arc(
    toX - len * Math.cos(angle),
    toY - len * Math.sin(angle),
    w / Math.sin(radiusAngle),
    angle - radiusAngle,
    angle + radiusAngle,
    false,
  );
  // to第二个角
  ctx.moveTo(
    toX - w * Math.cos(angle - Math.PI / 2),
    toY - w * Math.sin(angle - Math.PI / 2),
  );
  // form第二个角
  ctx.lineTo(
    fromX - w * Math.cos(angle - Math.PI / 2),
    fromY - w * Math.sin(angle - Math.PI / 2),
  );
  // 起始点圆弧
  ctx.arc(
    fromX - len * Math.cos(angle),
    fromY - len * Math.sin(angle),
    w / Math.sin(radiusAngle),
    angle + radiusAngle,
    angle - radiusAngle,
    false,
  );
  ctx.fill();
  ctx.stroke();
};

// 单向箭头(弧度端点)
export const arrowRadius = function arrowRadius(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  arrowRadiusParams: ArrowRadiusParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY, lineWidth, fillStyle } = getCurParams(
    DrawingTypeEnum.ARROWRADIUS,
    scaleCur,
    arrowRadiusParams,
  );
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  // 圆弧数据
  const w = lineWidth / 2;
  const len = w / Math.tan(radiusAngle);
  const headlen = 1.6 * lineWidth;
  const headlen2 = w / Math.cos((5 * Math.PI) / 12);
  ctx.beginPath();
  ctx.lineWidth = 1; // 宽度
  ctx.strokeStyle = fillStyle; // 线条颜色
  ctx.fillStyle = fillStyle; // 填充色
  // form 1
  ctx.moveTo(
    fromX - w * Math.cos(angle + Math.PI / 2),
    fromY - w * Math.sin(angle + Math.PI / 2),
  );
  // 起始点圆弧
  ctx.arc(
    fromX - len * Math.cos(angle),
    fromY - len * Math.sin(angle),
    w / Math.sin(radiusAngle),
    angle + radiusAngle,
    angle - radiusAngle,
    false,
  );
  // form 2
  ctx.moveTo(
    fromX - w * Math.cos(angle - Math.PI / 2),
    fromY - w * Math.sin(angle - Math.PI / 2),
  );
  // 目标点箭头
  // to 2
  ctx.lineTo(
    toX - headlen2 * Math.cos(angle - Math.PI / 12),
    toY - headlen2 * Math.sin(angle - Math.PI / 12),
  );
  ctx.lineTo(
    toX - 2 * headlen * Math.cos(angle - Math.PI / 6),
    toY - 2 * headlen * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(toX + headlen * Math.cos(angle), toY + headlen * Math.sin(angle));
  ctx.lineTo(
    toX - 2 * headlen * Math.cos(angle + Math.PI / 6),
    toY - 2 * headlen * Math.sin(angle + Math.PI / 6),
  );
  // to 1
  ctx.lineTo(
    toX - headlen2 * Math.cos(angle + Math.PI / 12),
    toY - headlen2 * Math.sin(angle + Math.PI / 12),
  );
  // 回到第一个点闭合图案
  ctx.lineTo(
    fromX - w * Math.cos(angle + Math.PI / 2),
    fromY - w * Math.sin(angle + Math.PI / 2),
  );
  ctx.fill();
  ctx.stroke();
};

// 双向箭头
export const arrowDouble = function arrowDouble(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  arrowDoubleParams: ArrowDoubleParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY, lineWidth, fillStyle } = getCurParams(
    DrawingTypeEnum.ARROWDOUBLE,
    scaleCur,
    arrowDoubleParams,
  );
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  // 圆弧数据
  const w = lineWidth / 2;
  const headlen = 1.6 * lineWidth;
  const headlen2 = w / Math.cos((5 * Math.PI) / 12);
  ctx.beginPath();
  ctx.lineWidth = 1; // 宽度
  ctx.strokeStyle = fillStyle; // 线条颜色
  ctx.fillStyle = fillStyle; // 填充色
  // 起始点箭头
  // from 1
  ctx.moveTo(
    fromX + headlen2 * Math.cos(angle - Math.PI / 12),
    fromY + headlen2 * Math.sin(angle - Math.PI / 12),
  );
  ctx.lineTo(
    fromX + 2 * headlen * Math.cos(angle - Math.PI / 6),
    fromY + 2 * headlen * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    fromX - headlen * Math.cos(angle),
    fromY - headlen * Math.sin(angle),
  );
  ctx.lineTo(
    fromX + 2 * headlen * Math.cos(angle + Math.PI / 6),
    fromY + 2 * headlen * Math.sin(angle + Math.PI / 6),
  );
  // from 2
  ctx.lineTo(
    fromX + headlen2 * Math.cos(angle + Math.PI / 12),
    fromY + headlen2 * Math.sin(angle + Math.PI / 12),
  );
  // 目标点箭头
  // to 2
  ctx.lineTo(
    toX - headlen2 * Math.cos(angle - Math.PI / 12),
    toY - headlen2 * Math.sin(angle - Math.PI / 12),
  );
  ctx.lineTo(
    toX - 2 * headlen * Math.cos(angle - Math.PI / 6),
    toY - 2 * headlen * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(toX + headlen * Math.cos(angle), toY + headlen * Math.sin(angle));
  ctx.lineTo(
    toX - 2 * headlen * Math.cos(angle + Math.PI / 6),
    toY - 2 * headlen * Math.sin(angle + Math.PI / 6),
  );
  // to 1
  ctx.lineTo(
    toX - headlen2 * Math.cos(angle + Math.PI / 12),
    toY - headlen2 * Math.sin(angle + Math.PI / 12),
  );
  // 回到第一个点闭合图案
  ctx.lineTo(
    fromX + headlen2 * Math.cos(angle - Math.PI / 12),
    fromY + headlen2 * Math.sin(angle - Math.PI / 12),
  );
  ctx.fill();
  ctx.stroke();
};

// 直线 - 透明
export const arrowTransparent = function arrowDouble(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  arrowDoubleParams: ArrowDoubleParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY, lineWidth } = getCurParams(
    DrawingTypeEnum.LINE,
    scaleCur,
    arrowDoubleParams,
  );
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  const headlen = 2 * lineWidth;
  let width = transparentWidth;
  if (width < lineWidth) {
    width = lineWidth;
  }
  ctx.beginPath();
  ctx.lineWidth = width; // 宽度
  ctx.strokeStyle = 'transparent'; // 线条颜色 transparent
  ctx.fillStyle = 'transparent'; // 填充色 #000
  ctx.moveTo(
    fromX - headlen * Math.cos(angle),
    fromY - headlen * Math.sin(angle),
  );
  ctx.lineTo(toX + headlen * Math.cos(angle), toY + headlen * Math.sin(angle));
  ctx.fill();
  ctx.stroke();
};
