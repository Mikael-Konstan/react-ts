import { defaultShapeStyle } from './../config';
import { DrawingTypeEnum } from './../enum';
import { line } from './index';
import { TextFrameParams, TextParams } from './types';
import { getCurParams } from './util';

// 文字
export const text = function text(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  textParams: TextParams,
): number {
  if (!ctx || !textParams.text) return 1;
  const { text, x, y, fontColor, fontWeight, fontSize, fontFamily } =
    getCurParams(DrawingTypeEnum.TEXT, scaleCur, textParams);
  ctx.beginPath();
  ctx.font = `normal normal ${fontWeight} ${fontSize}px/${fontSize}px ${fontFamily}`; // 字体 "500 48px serif"
  // ctx.strokeStyle = fontColor; // 字体颜色
  ctx.fillStyle = fontColor; // 字体颜色 与fillText搭配
  let rows = 0;
  let lineWidth = 0;
  let canvasWidth = 150;
  let initHeight = y + fontSize + (fontSize + 4) * rows;
  let lastSubStrIndex = 0;
  for (let i = 0; i < text.length; i++) {
    lineWidth += ctx.measureText(text[i]).width;
    if (lineWidth > canvasWidth) {
      ctx.fillText(text.substring(lastSubStrIndex, i), x, initHeight);
      initHeight += fontSize;
      lineWidth = 0;
      lastSubStrIndex = i;
      rows++;
    }
    if (i == text.length - 1) {
      // 绘制剩余部分
      ctx.fillText(text.substring(lastSubStrIndex, i + 1), x, initHeight);
      rows++;
    }
  }
  ctx.stroke();

  // 透明的 定位所用
  textFrame(ctx, {
    x,
    y,
    fontSize,
    rows,
    strokeStyle: 'transparent',
  });

  return rows;
};

// 文字边框
export const textFrame = function textFrame(
  ctx: CanvasRenderingContext2D | null,
  {
    x,
    y,
    fontSize = defaultShapeStyle.fontSize,
    strokeStyle = '#f40',
    rows = 1,
  }: TextFrameParams = {
    x: 0,
    y: 0,
  },
) {
  if (!ctx) return;
  let textWidth = 160;
  let textPadding = 4;
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 1;
  ctx.moveTo(x - textPadding, y - textPadding);
  ctx.lineTo(x - textPadding + textWidth, y - textPadding);
  ctx.lineTo(
    x - textPadding + textWidth,
    y + 2 * textPadding + fontSize * rows,
  );
  ctx.lineTo(x - textPadding, y + 2 * textPadding + fontSize * rows);
  ctx.lineTo(x - textPadding, y - textPadding);
  ctx.stroke();
};

// 文字toolTip
export const toolTip = function toolTip(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  toolTipParams: TextParams,
) {
  if (!ctx || !toolTipParams.text) return 1;
  let { text, x, y } = getCurParams(
    DrawingTypeEnum.TEXT,
    scaleCur,
    toolTipParams,
  );
  const {
    fontWeight = '400',
    fontColor = '#FFFFFF',
    fontSize = 12,
    fontFamily = 'PingFangSC-Regular, PingFang SC',
    canvasWidth = 80,
  } = toolTipParams;

  let rows = 1;
  let MaxRows = 1;
  let lineWidth = 0;
  let lastSubStrIndex = 0;
  const offsetX = -4;
  const offsetY = -20;
  x += offsetX;
  y += offsetY;

  ctx.font = `normal normal ${fontWeight} ${fontSize}px/${fontSize}px ${fontFamily}`;
  const suffixWidth = ctx.measureText('...').width;
  const allWidth = ctx.measureText(text).width;
  const len = text.length;
  const padding = 4;
  let x2 = x + canvasWidth / 2 + 6 + padding;
  const y2 = y + 2 + padding;
  if (allWidth > canvasWidth) {
    MaxRows = 2;
    x -= canvasWidth / 2;
    y -= fontSize + 4;
  } else {
    x2 = x + allWidth / 2 + 10 + padding;
    x -= allWidth / 2;
  }
  const x1 = x - padding;
  const y1 = y - fontSize - padding;

  paintBgc(ctx, { x1: x1 - 2, y1, x2, y2 });

  ctx.beginPath();
  ctx.fillStyle = fontColor; // 字体颜色 与fillText搭配
  for (let i = 0; i < len; i++) {
    lineWidth += ctx.measureText(text[i]).width;
    if (rows < MaxRows) {
      if (lineWidth > canvasWidth) {
        ctx.fillText(text.substring(lastSubStrIndex, i), x, y);
        y += fontSize + 2;
        lineWidth = 0;
        lastSubStrIndex = i;
        rows++;
      }
    }
    if (rows === MaxRows) {
      if (i === len - 1) {
        ctx.fillText(text.substring(lastSubStrIndex, len), x, y);
        break;
      }
      if (lineWidth + suffixWidth > canvasWidth) {
        ctx.fillText(text.substring(lastSubStrIndex, i) + '...', x, y);
        break;
      }
    }
  }

  ctx.stroke();
};

// 绘制带弧度方形背景
export function paintBgc(
  ctx: CanvasRenderingContext2D | null,
  {
    x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0,
    strokeStyle = '#1D2129',
    fillStyle = '#1D2129',
    arrow = true,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeStyle?: string;
    fillStyle?: string;
    arrow?: boolean; // 是否绘制尖角
  } = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    strokeStyle: '#1D2129',
    fillStyle: '#1D2129',
    arrow: true,
  },
) {
  if (!ctx) return;
  const arrowX = (x1 + x2) / 2;
  const arrowW = 8;
  const r = 2;
  ctx.beginPath();
  ctx.lineWidth = 1; // 宽度
  ctx.strokeStyle = strokeStyle; // 线条颜色
  ctx.fillStyle = fillStyle; // 填充色
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x1 + r, y1);
  ctx.arcTo(x2, y1, x2, y2, r);
  ctx.arcTo(x2, y2, x1, y2, r);

  if (arrow) {
    ctx.lineTo(arrowX + arrowW, y2);
    ctx.lineTo(arrowX, y2 + arrowW);
    ctx.lineTo(arrowX - arrowW, y2);
  }

  ctx.arcTo(x1, y2, x1, y1, r);
  ctx.arcTo(x1, y1, x2, y1, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export function paintVersion(
  ctx: CanvasRenderingContext2D | null,
  scaleCur: number,
  paintVersionParams: TextParams,
) {
  let flag = false;
  if (!ctx || !paintVersionParams.version || !paintVersionParams.paintVersion) {
    return flag;
  }
  let { version, x, y } = getCurParams(
    DrawingTypeEnum.TEXT,
    scaleCur,
    paintVersionParams,
  );
  // if (paintVersionParams.curVersion) {
  //   version += '（在用版本）';
  // }
  ctx.font = `normal normal 600 12px/12px PingFangSC-Regular, PingFang SC`;
  const width = ctx.measureText(version).width;
  // 绘制背景
  line(ctx, 1, {
    fromX: x,
    fromY: y,
    toX: x + width,
    toY: y,
    lineWidth: 20,
    strokeStyle: '#fff',
    fillStyle: '#F53E3F',
  });

  const { mousePosi } = paintVersionParams;
  if (!!mousePosi) {
    flag =
      ctx.isPointInPath(mousePosi.x, mousePosi.y) ||
      ctx.isPointInStroke(mousePosi.x, mousePosi.y);
  }

  ctx.beginPath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(version, x - 2, y + 4);
  ctx.stroke();

  return flag;
}
