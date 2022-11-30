import { transparentWidth } from './../config';
import { DrawingTypeEnum } from './../enum';
import { RectParams } from './types';
import { getCurParams } from './util';

// 矩形
export const rect = function rect(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  rectParams: RectParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY, lineWidth, fillStyle } = getCurParams(
    DrawingTypeEnum.RECT,
    scaleCur,
    rectParams,
  );
  ctx.beginPath();
  ctx.lineWidth = lineWidth; // 宽度
  ctx.strokeStyle = fillStyle; // 线条颜色
  ctx.fillStyle = 'transparent'; // 填充色
  ctx.lineJoin = 'miter';
  ctx.moveTo(fromX - lineWidth / 2, fromY);
  ctx.lineTo(toX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineTo(fromX, toY);
  ctx.lineTo(fromX, fromY);
  ctx.fill();
  ctx.stroke();
};

// 矩形 - 透明
export const rectTransparent = function rectTransparent(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  rectParams: RectParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY, lineWidth } = getCurParams(
    DrawingTypeEnum.RECT,
    scaleCur,
    rectParams,
  );
  let width = transparentWidth;
  if (width < lineWidth) {
    width = lineWidth;
  }
  ctx.beginPath();
  ctx.lineWidth = width; // 宽度
  ctx.strokeStyle = 'transparent'; // 线条颜色
  ctx.fillStyle = 'transparent'; // 填充色
  ctx.moveTo(fromX - width / 2, fromY);
  ctx.lineTo(toX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineTo(fromX, toY);
  ctx.lineTo(fromX, fromY);
  ctx.fill();
  ctx.stroke();
};
