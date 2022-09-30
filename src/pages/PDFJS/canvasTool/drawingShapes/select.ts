import { PointsItem } from './../type';
import { SelectTypeEnum } from './../enum';
import { getCurParams } from './util';

// 套索选择
export const lasso = function lasso(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  pointParams: PointsItem[],
) {
  const pointsAry = pointParams.map((item) => {
    const params = getCurParams(SelectTypeEnum.LASSO, scaleCur, item);
    return {
      x: params.x,
      y: params.y,
    };
  });
  if (pointsAry.length === 0 || !ctx) return;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillStyle = 'rgba(204, 255, 255, 0.5)';
  ctx.setLineDash([5, 5]);
  const { x, y } = pointsAry[0];
  ctx.moveTo(x, y);
  pointsAry.forEach((item, idx) => {
    if (idx > 0) {
      ctx.lineTo(item.x, item.y);
    }
  });
  ctx.lineTo(x, y);
  ctx.fill();
  ctx.stroke();
};

// 绘制 方形选择框
const clusterRect = function clusterSelect(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  pointParams: PointsItem[],
  strokeStyle: string,
) {
  const pointsAry = pointParams.map((item) => {
    const params = getCurParams(SelectTypeEnum.MULTI, scaleCur, item);
    return {
      x: params.x,
      y: params.y,
    };
  });
  const s = pointsAry[0];
  const t = pointsAry[1];
  if (!t || !ctx) return;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = 'rgba(204, 255, 255, 0.5)';
  ctx.setLineDash([5, 5]);
  ctx.moveTo(s.x, s.y);
  ctx.lineTo(t.x, s.y);
  ctx.lineTo(t.x, t.y);
  ctx.lineTo(s.x, t.y);
  ctx.lineTo(s.x, s.y);
  ctx.fill();
  ctx.stroke();
};

// 方形选择
export const multi = function multi(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  pointParams: PointsItem[],
) {
  clusterRect(ctx, scaleCur, pointParams, 'rgba(0, 0, 0, 0.5)');
};

// 集合选择 选择的选择框
export const clusterSelect = function clusterSelect(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  pointParams: PointsItem[],
) {
  clusterRect(ctx, scaleCur, pointParams, 'rgba(0, 0, 0, 1)');
};
