import { cloudRX, cloudRY, transparentWidth } from './../config';
import { DrawingTypeEnum } from './../enum';
import { CloudParams } from './types';
import { getCurParams } from './util';

// 云图
export const cloud = function cloud(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  cloudParams: CloudParams,
  single = true,
) {
  if (ctx) {
    const { fromX, fromY, toX, toY, fillStyle } = getCurParams(
      DrawingTypeEnum.CLOUD,
      scaleCur,
      cloudParams,
    );
    const rx = cloudRX;
    const ry = cloudRY;
    const lineWidth = 2;
    const cornerOffsetX = rx + ry - 2;
    const cornerOffsetY = rx + ry - 2;
    let startX = fromX < toX ? fromX : toX;
    let startY = fromY < toY ? fromY : toY;
    let numX = 0;
    let numY = 0;
    let offsetX = 2 * rx + 4;
    let offsetY = 2 * rx + 4;
    const minW = Math.abs(toX - fromX) - offsetX;
    const minH = Math.abs(toY - fromY) - offsetX;
    const remainderX = minW % offsetX;
    const remainderY = minH % offsetY;

    numX = parseInt(minW / offsetX + '');
    numY = parseInt(minH / offsetY + '');
    if (remainderX > rx) {
      numX++;
      offsetX -= (offsetX - remainderX) / numX;
    } else {
      offsetX += remainderX / numX;
    }
    if (remainderY > rx) {
      numY++;
      offsetY -= (offsetY - remainderY) / numY;
    } else {
      offsetY += remainderY / numY;
    }

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = fillStyle;
    // 上
    for (let i = 0; i < numX; i++) {
      startX += offsetX;
      ctx.ellipse(
        startX,
        startY,
        rx,
        ry,
        0,
        (-3 * Math.PI) / 4,
        Math.PI / 4,
        false,
      );
    }
    // 右上
    startX += cornerOffsetX;
    startY += cornerOffsetY;
    ctx.ellipse(
      startX,
      startY,
      ry,
      rx,
      0,
      (-3 * Math.PI) / 4,
      (3 * Math.PI) / 4,
      false,
    );
    // 右
    for (let i = 0; i < numY; i++) {
      startY += offsetY;
      ctx.ellipse(
        startX,
        startY,
        ry,
        rx,
        0,
        (-1 * Math.PI) / 4,
        (3 * Math.PI) / 4,
        false,
      );
    }
    // 右下
    startX += -cornerOffsetX;
    startY += cornerOffsetY;
    ctx.ellipse(
      startX,
      startY,
      rx,
      ry,
      0,
      (-1 * Math.PI) / 4,
      (-3 * Math.PI) / 4,
      false,
    );
    // 下
    for (let i = 0; i < numX; i++) {
      startX -= offsetX;
      ctx.ellipse(
        startX,
        startY,
        rx,
        ry,
        0,
        Math.PI / 4,
        (-3 * Math.PI) / 4,
        false,
      );
    }
    // 左下
    startX += -cornerOffsetX;
    startY += -cornerOffsetY;
    ctx.ellipse(
      startX,
      startY,
      ry,
      rx,
      0,
      (1 * Math.PI) / 4,
      (-1 * Math.PI) / 4,
      false,
    );
    // 左
    for (let i = 0; i < numY; i++) {
      startY -= offsetY;
      ctx.ellipse(
        startX,
        startY,
        ry,
        rx,
        0,
        (3 * Math.PI) / 4,
        (-1 * Math.PI) / 4,
        false,
      );
    }
    // 左上
    startX += cornerOffsetX;
    startY += -cornerOffsetY;
    ctx.ellipse(
      startX,
      startY,
      rx,
      ry,
      0,
      (3 * Math.PI) / 4,
      (1 * Math.PI) / 4,
      false,
    );
    if (single) {
      ctx.closePath();
      ctx.stroke();
      return;
    }

    // 回头描绘一遍
    // 左上(回)
    ctx.ellipse(
      startX,
      startY,
      rx - lineWidth,
      ry - lineWidth,
      0,
      (1 * Math.PI) / 4,
      (3 * Math.PI) / 4,
      true,
    );
    // 左(回)
    startX += -cornerOffsetX;
    startY += cornerOffsetY;
    for (let i = 0; i < numY; i++) {
      ctx.ellipse(
        startX,
        startY,
        ry - lineWidth,
        rx - lineWidth,
        0,
        (-1 * Math.PI) / 4,
        (3 * Math.PI) / 4,
        true,
      );
      startY += offsetY;
    }
    // 左下(回)
    ctx.ellipse(
      startX,
      startY,
      ry - lineWidth,
      rx - lineWidth,
      0,
      (-1 * Math.PI) / 4,
      (1 * Math.PI) / 4,
      true,
    );
    // 下(回)
    startX += cornerOffsetX;
    startY += cornerOffsetY;
    for (let i = 0; i < numX; i++) {
      ctx.ellipse(
        startX,
        startY,
        rx - lineWidth,
        ry - lineWidth,
        0,
        (-3 * Math.PI) / 4,
        Math.PI / 4,
        true,
      );
      startX += offsetX;
    }
    // 右下(回)
    ctx.ellipse(
      startX,
      startY,
      rx - lineWidth,
      ry - lineWidth,
      0,
      (-3 * Math.PI) / 4,
      (-1 * Math.PI) / 4,
      true,
    );
    // 右(回)
    startX += cornerOffsetX;
    startY += -cornerOffsetY;
    for (let i = 0; i < numY; i++) {
      ctx.ellipse(
        startX,
        startY,
        ry - lineWidth,
        rx - lineWidth,
        0,
        (3 * Math.PI) / 4,
        (-1 * Math.PI) / 4,
        true,
      );
      startY -= offsetY;
    }
    // 右上(回)
    ctx.ellipse(
      startX,
      startY,
      ry - lineWidth,
      rx - lineWidth,
      0,
      (3 * Math.PI) / 4,
      (-3 * Math.PI) / 4,
      true,
    );
    // 上(回)
    startX += -cornerOffsetY;
    startY += -cornerOffsetY;
    for (let i = 0; i < numX; i++) {
      ctx.ellipse(
        startX,
        startY,
        rx - lineWidth,
        ry - lineWidth,
        0,

        Math.PI / 4,
        (-3 * Math.PI) / 4,
        true,
      );
      startX -= offsetX;
    }
    ctx.stroke();
  }
};

// 云图 - 透明
export const cloudTransparent = function cloudTransparent(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  cloudParams: CloudParams,
) {
  if (!ctx) return;
  const { fromX, fromY, toX, toY } = getCurParams(
    DrawingTypeEnum.CLOUD,
    scaleCur,
    cloudParams,
  );
  const rx = (cloudRX / 2) * (fromX < toX ? 1 : -1);
  const ry = (cloudRY / 2) * (fromY < toY ? 1 : -1);
  let width = transparentWidth;
  ctx.beginPath();
  ctx.lineWidth = width; // 宽度
  ctx.strokeStyle = 'transparent'; // 线条颜色
  ctx.fillStyle = 'transparent'; // 填充色
  ctx.moveTo(fromX - rx * 2 - width / 2, fromY);
  ctx.lineTo(toX - rx * 2, fromY);
  ctx.lineTo(toX - rx * 2, toY + ry);
  ctx.lineTo(fromX - rx * 2, toY + ry);
  ctx.lineTo(fromX - rx * 2, fromY);
  ctx.fill();
  ctx.stroke();
};
