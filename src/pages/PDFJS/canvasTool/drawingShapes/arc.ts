import { pointR, transparentWidth } from './../config';
import { DrawingTypeEnum } from './../enum';
import { PointParams, ArcParams, ArcFrameParams } from './types';
import { getCurParams, getCenter } from './util';

// 圆形
export const arc = function arc(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  arcParams: ArcParams,
) {
  const { fromX, fromY, toX, toY, lineWidth, fillStyle } = getCurParams(
    DrawingTypeEnum.ARC,
    scaleCur,
    arcParams,
  );
  const rx = Math.floor(Math.abs(toX - fromX) / 2);
  const ry = Math.floor(Math.abs(toY - fromY) / 2);
  if (
    rx <= 1 ||
    ry <= 1 ||
    !ctx ||
    rx - 2 * lineWidth <= 1 ||
    ry - 2 * lineWidth <= 1
  ) {
    return;
  }
  ctx.beginPath();
  ctx.lineWidth = lineWidth; // 宽度
  ctx.strokeStyle = fillStyle; // 线条颜色
  ctx.fillStyle = 'transparent'; // 填充色
  // 椭圆中心点的x值、椭圆中心点的y值、半径x、半径y、旋转角度、起始角、结束角、方向(顺时针还是逆时针)
  ctx.ellipse(
    getCenter(fromX, toX),
    getCenter(fromY, toY),
    rx,
    ry,
    0,
    0,
    2 * Math.PI,
    true,
  );
  // if (toX > fromX) {
  //   ctx.lineTo(toX - lineWidth, getCenter(fromY, toY));
  // } else {
  //   ctx.lineTo(fromX - lineWidth, getCenter(fromY, toY));
  // }
  // ctx.ellipse(
  //   getCenter(fromX, toX),
  //   getCenter(fromY, toY),
  //   rx - 2 * lineWidth,
  //   ry - 2 * lineWidth,
  //   0,
  //   0,
  //   2 * Math.PI,
  //   false,
  // );
  ctx.fill();
  ctx.stroke();
};

// 圆形 - 透明
export const arcTransparent = function arcTransparent(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  arcParams: ArcParams,
) {
  const { fromX, fromY, toX, toY, lineWidth } = getCurParams(
    DrawingTypeEnum.ARC,
    scaleCur,
    arcParams,
  );
  const rx = Math.floor(Math.abs(toX - fromX) / 2);
  const ry = Math.floor(Math.abs(toY - fromY) / 2);
  if (
    rx <= 1 ||
    ry <= 1 ||
    !ctx ||
    rx - 2 * lineWidth <= 1 ||
    ry - 2 * lineWidth <= 1
  ) {
    return;
  }
  let width = transparentWidth;
  if (width < lineWidth) {
    width = lineWidth;
  }

  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = 'transparent';
  ctx.fillStyle = 'transparent';
  ctx.ellipse(
    getCenter(fromX, toX),
    getCenter(fromY, toY),
    rx,
    ry,
    0,
    0,
    2 * Math.PI,
    true,
  );
  ctx.fill();
  ctx.stroke();
};

// 圆形或椭圆形边框
export const arcFrame = function arcFrame(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  arcFrameParams: ArcFrameParams,
) {
  const { fromX, fromY, toX, toY } = getCurParams(
    'arcFrame',
    scaleCur,
    arcFrameParams,
  );
  if (fromX === undefined || fromY === undefined || !ctx) return;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(255,0,0,1)';
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineTo(fromX, toY);
  ctx.lineTo(fromX, fromY);
  ctx.stroke();
};

// 绘制定位圆点
export const arcPoint = function arcPoint(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  pointParams: PointParams,
) {
  const { x, y } = getCurParams('arcPoint', scaleCur, pointParams);
  if (x === undefined || y === undefined || !ctx) return;
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#f40';
  ctx.fillStyle = '#fff';
  ctx.moveTo(x, y);
  ctx.ellipse(x, y, pointR, pointR, 0, 0, 2 * Math.PI, true);
  ctx.stroke();
  ctx.fill();
  // 透明图案 定位使用
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'transparent';
  ctx.fillStyle = 'transparent';
  ctx.moveTo(x, y);
  ctx.ellipse(x, y, pointR, pointR, 0, 0, 2 * Math.PI, true);
  ctx.stroke();
  ctx.fill();
};
