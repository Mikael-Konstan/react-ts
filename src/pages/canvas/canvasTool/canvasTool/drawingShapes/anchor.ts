import { DrawingTypeEnum } from './../enum';
import { anchorParams } from './types';
import { getCurParams } from './util';

// 铆钉大小固定
const constFlag = true;

// 铆钉
export const anchor = function anchor(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  anchorParams: anchorParams,
) {
  if (!ctx) return;
  const { x, y, iconSize } = getCurParams(
    DrawingTypeEnum.TEXT,
    scaleCur,
    anchorParams,
  );
  ctx.beginPath();
  const fileSize = 100; // img标签原始大小 计算使用
  // 渲染大小为 iconSize * scaleCur
  const imgHTML = anchorParams.anchorSvg;
  const tWidth = getTWidth(
    fileSize,
    scaleCur,
    constFlag,
    anchorParams.bigSizeFlag || false,
  );
  const offset = tWidth / 2;
  ctx.drawImage(
    imgHTML,
    0,
    0,
    fileSize,
    fileSize,
    x - offset,
    y - offset,
    // iconSize * scaleCur, // 放缩效果
    // iconSize * scaleCur,
    tWidth, // 固定大小
    tWidth,
  );
  ctx.fill();
  ctx.stroke();
};

// 铆钉 - 透明
export const anchorTransparent = function anchorTransparent(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  anchorParams: anchorParams,
) {
  if (!ctx) return;
  const { x, y } = getCurParams(DrawingTypeEnum.TEXT, scaleCur, anchorParams);
  const fileSize = 100; // img标签原始大小 计算使用
  const tWidth = getTWidth(
    fileSize,
    scaleCur,
    constFlag,
    anchorParams.bigSizeFlag || false,
  );
  const r = (4 * tWidth) / 11; // 放缩效果
  ctx.beginPath();
  ctx.strokeStyle = 'transparent';
  ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI, true);
  ctx.stroke();
};

function getTWidth(
  fileSize: number,
  scaleCur: number,
  constFlag: boolean,
  bigSizeFlag: boolean,
) {
  if (!constFlag) {
    return fileSize * scaleCur;
  }
  let tWidth = 32; // 固定大小 铆钉
  if (bigSizeFlag) {
    tWidth = 48;
  }
  return tWidth;
}
