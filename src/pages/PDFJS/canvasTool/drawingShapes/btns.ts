import { fileSize } from './../config';
import { BtnEnum, DrawingTypeEnum } from './../enum';
import { paintBgc } from './text';
import { BtnParams, TextParams } from './types';
import { getCurParams } from './util';

// 按钮
export const btns = function btns(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  btnParams: BtnParams,
) {
  if (!ctx) return;
  const { x, y, iconSize } = getCurParams(
    DrawingTypeEnum.TEXT,
    scaleCur,
    btnParams,
  );
  const paintVersion = btnParams.paintVersion && !!btnParams.version;
  let paintVersionText = '版本：' + btnParams.version;
  if (btnParams.curVersion) {
    paintVersionText += '（在用版本）';
  }
  let x2 = x;
  if (paintVersion) {
    ctx.font = `normal normal 400 12px/12px PingFangSC-Regular, PingFang SC`;
    const width = ctx.measureText(paintVersionText).width;
    x2 = x2 + width + 36;
  }

  // 绘制背景
  paintBgc(ctx, {
    x1: x - 98,
    y1: y - 54,
    x2,
    y2: y - 10,
    arrow: false,
  });

  ctx.beginPath();
  ctx.fillStyle = 'transparent';
  // 绘制按钮
  renderImg(ctx, x - 80, y - 32, btnParams.detailSvg);
  renderImg(ctx, x - 50, y - 32, btnParams.editSvg);
  renderImg(ctx, x - 20, y - 32, btnParams.deleteSvg);
  ctx.fill();
  // 绘制版本文字
  if (paintVersion) {
    ctx.lineWidth = 1;
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.moveTo(x, y - 26);
    ctx.lineTo(x, y - 39);
    ctx.fillStyle = '#fff';
    ctx.fillText(paintVersionText, x + 15, y - 28);
  }
  ctx.stroke();
};

function renderImg(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  imgHTML: HTMLImageElement,
) {
  const tWidth = 26;
  const offset = tWidth / 2;
  ctx.drawImage(
    imgHTML,
    0,
    0,
    fileSize,
    fileSize,
    x - offset,
    y - offset,
    tWidth, // 固定大小
    tWidth,
  );
}

// 按钮 - 透明
export const btnTransparent = function btns(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  btnParams: TextParams,
) {
  if (!ctx) return;
  let { x, y } = getCurParams(DrawingTypeEnum.TEXT, scaleCur, btnParams);
  y -= 15;
  if (btnParams.text === BtnEnum.DETAIL) {
    x -= 70;
  } else if (btnParams.text === BtnEnum.EDIT) {
    x -= 35;
  } else {
    x -= 1;
  }
  ctx.beginPath();
  ctx.lineWidth = 1; // 宽度
  ctx.strokeStyle = '#000'; // 线条颜色
  ctx.fillStyle = '#000'; // 填充色
  ctx.moveTo(x, y - 7);
  ctx.moveTo(x, y - 27);
  ctx.lineTo(x - 20, y - 27);
  ctx.lineTo(x - 20, y - 7);
  ctx.lineTo(x, y - 7);
  ctx.fill();
  ctx.stroke();
};
