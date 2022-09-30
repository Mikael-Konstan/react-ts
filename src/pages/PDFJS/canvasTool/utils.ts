import { cloudRX, cloudRY } from './config';
import {
  ShapesDataItem,
  ShapesDataParams,
  PointsItem,
  DefaultShapeStyle,
  PointData,
  Offset,
} from './type';
import { DrawingTypeEnum, SelectTypeEnum, BtnEnum } from './enum';
import { getCenter } from './drawingShapes/util';

// 计算缩放数据
export const getScaleData = function (
  offset: PointsItem,
  selectTarget: ShapesDataItem,
  selectPointIndex: number,
): ShapesDataItem | null {
  let shapeData = null;
  switch (selectTarget.type) {
    case DrawingTypeEnum.TEXT:
      break;
    case DrawingTypeEnum.RECT:
    case DrawingTypeEnum.ARC:
    case DrawingTypeEnum.CLOUD:
      // 第一个定位点
      if (selectPointIndex == 0) {
        let fromX = selectTarget.fromX + offset.x;
        let toX = selectTarget.toX;
        if (fromX >= toX) {
          let temp = fromX;
          fromX = toX;
          toX = temp;
        }

        let fromY = selectTarget.fromY + offset.y;
        let toY = selectTarget.toY;
        if (fromY >= toY) {
          let temp = fromY;
          fromY = toY;
          toY = temp;
        }

        shapeData = {
          ...selectTarget,
          fromX,
          fromY,
          toX,
          toY,
        };
      }
      // 第二个定位点
      if (selectPointIndex == 1) {
        let fromY = selectTarget.fromY + offset.y;
        let toY = selectTarget.toY;
        if (fromY >= toY) {
          let temp = fromY;
          fromY = toY;
          toY = temp;
        }
        shapeData = {
          ...selectTarget,
          fromY,
          toY,
        };
      }
      // 第三个定位点
      if (selectPointIndex == 2) {
        let fromX = selectTarget.fromX;
        let toX = selectTarget.toX + offset.x;
        if (fromX >= toX) {
          let temp = fromX;
          fromX = toX;
          toX = temp;
        }

        let fromY = selectTarget.fromY + offset.y;
        let toY = selectTarget.toY;
        if (fromY >= toY) {
          let temp = fromY;
          fromY = toY;
          toY = temp;
        }

        shapeData = {
          ...selectTarget,
          fromX,
          fromY,
          toX,
          toY,
        };
      }
      // 第四个定位点
      if (selectPointIndex == 3) {
        let toX = selectTarget.toX + offset.x;
        let fromX = selectTarget.fromX;
        if (fromX >= toX) {
          let temp = fromX;
          fromX = toX;
          toX = temp;
        }
        shapeData = {
          ...selectTarget,
          fromX,
          toX,
        };
      }
      // 第五个定位点
      if (selectPointIndex == 4) {
        let fromX = selectTarget.fromX;
        let toX = selectTarget.toX + offset.x;
        if (fromX >= toX) {
          let temp = fromX;
          fromX = toX;
          toX = temp;
        }

        let fromY = selectTarget.fromY;
        let toY = selectTarget.toY + offset.y;
        if (fromY >= toY) {
          let temp = fromY;
          fromY = toY;
          toY = temp;
        }

        shapeData = {
          ...selectTarget,
          fromX,
          fromY,
          toX,
          toY,
        };
      }
      // 第六个定位点
      if (selectPointIndex == 5) {
        let toY = selectTarget.toY + offset.y;
        let fromY = selectTarget.fromY;
        if (fromY >= toY) {
          let temp = fromY;
          fromY = toY;
          toY = temp;
        }
        shapeData = {
          ...selectTarget,
          fromY,
          toY,
        };
      }
      // 第七个定位点
      if (selectPointIndex == 6) {
        let fromX = selectTarget.fromX + offset.x;
        let toX = selectTarget.toX;
        if (fromX >= toX) {
          let temp = fromX;
          fromX = toX;
          toX = temp;
        }

        let fromY = selectTarget.fromY;
        let toY = selectTarget.toY + offset.y;
        if (fromY >= toY) {
          let temp = fromY;
          fromY = toY;
          toY = temp;
        }

        shapeData = {
          ...selectTarget,
          fromX,
          fromY,
          toX,
          toY,
        };
      }
      // 第八个定位点
      if (selectPointIndex == 7) {
        let fromX = selectTarget.fromX + offset.x;
        let toX = selectTarget.toX;
        if (fromX >= toX) {
          let temp = fromX;
          fromX = toX;
          toX = temp;
        }
        shapeData = {
          ...selectTarget,
          fromX,
          toX,
        };
      }
      break;
    case DrawingTypeEnum.ARROWTRIANGLE:
    case DrawingTypeEnum.LINE:
    case DrawingTypeEnum.ARROWRADIUS:
    case DrawingTypeEnum.ARROWDOUBLE:
      if (selectPointIndex == 0) {
        shapeData = {
          ...selectTarget,
          fromX: selectTarget.fromX + offset.x,
          fromY: selectTarget.fromY + offset.y,
        };
      } else {
        shapeData = {
          ...selectTarget,
          toX: selectTarget.toX + offset.x,
          toY: selectTarget.toY + offset.y,
        };
      }
      break;
    default:
      break;
  }
  return shapeData;
};

// 计算定位点坐标
export const getPointData = function (
  selectTarget: ShapesDataItem | null,
  pointCode: string,
): PointData {
  let pointData: PointData = {
    pointTarget: selectTarget,
    pointCode,
    points: [],
    originPoints: [],
  };
  if (!selectTarget) return pointData;
  let dx;
  let dy;
  let angle;
  let headlen;
  switch (selectTarget.type) {
    case DrawingTypeEnum.TEXT:
      break;
    case DrawingTypeEnum.RECT:
    case DrawingTypeEnum.ARC:
      pointData.points.push({
        x: selectTarget.fromX,
        y: selectTarget.fromY,
      });
      pointData.points.push({
        x: getCenter(selectTarget.fromX, selectTarget.toX),
        y: selectTarget.fromY,
      });
      pointData.points.push({
        x: selectTarget.toX,
        y: selectTarget.fromY,
      });
      pointData.points.push({
        x: selectTarget.toX,
        y: getCenter(selectTarget.fromY, selectTarget.toY),
      });
      pointData.points.push({
        x: selectTarget.toX,
        y: selectTarget.toY,
      });
      pointData.points.push({
        x: getCenter(selectTarget.toX, selectTarget.fromX),
        y: selectTarget.toY,
      });
      pointData.points.push({
        x: selectTarget.fromX,
        y: selectTarget.toY,
      });
      pointData.points.push({
        x: selectTarget.fromX,
        y: getCenter(selectTarget.fromY, selectTarget.toY),
      });
      break;
    case DrawingTypeEnum.CLOUD:
      const cornerOffset = (cloudRX + cloudRY + 1) * 2;
      const x1 = selectTarget.fromX - cornerOffset;
      const y1 = selectTarget.fromY;
      const x2 = selectTarget.toX - cornerOffset;
      const y2 = selectTarget.toY + cloudRY;
      const RX = Math.floor(x2 - x1) / 2;
      const RY = Math.floor(y2 - y1) / 2;
      pointData.points.push({
        x: x1,
        y: y1,
      });
      pointData.points.push({
        x: x1 + RX,
        y: y1,
      });
      pointData.points.push({
        x: x2,
        y: y1,
      });
      pointData.points.push({
        x: x2,
        y: y1 + RY,
      });
      pointData.points.push({
        x: x2,
        y: y2,
      });
      pointData.points.push({
        x: x2 - RX,
        y: y2,
      });
      pointData.points.push({
        x: x1,
        y: y2,
      });
      pointData.points.push({
        x: x1,
        y: y2 - RY,
      });
      break;
    case DrawingTypeEnum.ARROWTRIANGLE:
      dx = selectTarget.toX - selectTarget.fromX;
      dy = selectTarget.toY - selectTarget.fromY;
      angle = Math.atan2(dy, dx);
      pointData.points.push({
        x: selectTarget.fromX,
        y: selectTarget.fromY,
      });
      pointData.points.push({
        x: Math.floor(selectTarget.toX + 6 * Math.cos(angle)),
        y: Math.floor(selectTarget.toY + 6 * Math.sin(angle)),
      });
      break;
    case DrawingTypeEnum.LINE:
      pointData.points.push({
        x: selectTarget.fromX,
        y: selectTarget.fromY,
      });
      pointData.points.push({
        x: selectTarget.toX,
        y: selectTarget.toY,
      });
      break;
    case DrawingTypeEnum.ARROWRADIUS:
      dx = selectTarget.toX - selectTarget.fromX;
      dy = selectTarget.toY - selectTarget.fromY;
      angle = Math.atan2(dy, dx);
      headlen = 1.6 * selectTarget.lineWidth;
      pointData.points.push({
        x: selectTarget.fromX,
        y: selectTarget.fromY,
      });
      pointData.points.push({
        x: Math.ceil(selectTarget.toX + headlen * Math.cos(angle)),
        y: Math.ceil(selectTarget.toY + headlen * Math.sin(angle)),
      });
      break;
    case DrawingTypeEnum.ARROWDOUBLE:
      dx = selectTarget.toX - selectTarget.fromX;
      dy = selectTarget.toY - selectTarget.fromY;
      angle = Math.atan2(dy, dx);
      headlen = 1.6 * selectTarget.lineWidth;
      pointData.points.push({
        x: Math.ceil(selectTarget.fromX - headlen * Math.cos(angle)),
        y: Math.ceil(selectTarget.fromY - headlen * Math.sin(angle)),
      });
      pointData.points.push({
        x: Math.ceil(selectTarget.toX + headlen * Math.cos(angle)),
        y: Math.ceil(selectTarget.toY + headlen * Math.sin(angle)),
      });
      break;
    default:
      break;
  }
  return pointData;
};

// 补充图案数据
export const getDefaultData = function (
  item: ShapesDataParams,
  shapeStyle: DefaultShapeStyle,
): ShapesDataItem {
  let shapeData;
  switch (item.type) {
    case DrawingTypeEnum.TEXT:
      shapeData = {
        fontColor: shapeStyle.fontColor,
        fontWeight: shapeStyle.fontWeight,
        fontSize: shapeStyle.fontSize,
        fontFamily: shapeStyle.fontFamily,
        rows: 1,
      };
      break;
    case DrawingTypeEnum.RECT:
    case DrawingTypeEnum.ARC:
      shapeData = {
        lineWidth: shapeStyle.lineWidth,
        fillStyle: shapeStyle.fillStyle,
      };
      break;
    case DrawingTypeEnum.ARROWTRIANGLE:
      shapeData = {
        fillStyle: shapeStyle.fillStyle,
      };
      break;
    case DrawingTypeEnum.LINE:
    case DrawingTypeEnum.ARROWRADIUS:
    case DrawingTypeEnum.ARROWDOUBLE:
      shapeData = {
        lineWidth: shapeStyle.lineWidth,
        fillStyle: shapeStyle.fillStyle,
      };
      break;
    default:
      break;
  }
  return {
    ...shapeData,
    ...item,
    code: (item as any).code || new Date().getTime() + uuid(12, 16),
  } as ShapesDataItem;
};

// 设置画布鼠标样式
export const setCanvasCursor = function (
  selectedType: string, // 选中标注的type
  selectOptType: string, // 选择操作的type
  btnSelectType: string, // 选中按钮的类型
  selectIndex: number,
  canvas: HTMLCanvasElement | null,
) {
  if (!canvas) return;
  let cursor = 'grab';
  switch (selectedType) {
    case DrawingTypeEnum.TEXT:
      cursor = 'move';
      break;
    case DrawingTypeEnum.RECT:
    case DrawingTypeEnum.ARC:
    case DrawingTypeEnum.CLOUD:
      cursor = 'move';
      switch (selectIndex) {
        case 0:
        case 4:
          cursor = 'nw-resize';
          break;
        case 1:
        case 5:
          cursor = 's-resize';
          break;
        case 2:
        case 6:
          cursor = 'ne-resize';
          break;
        case 3:
        case 7:
          cursor = 'e-resize';
          break;
        default:
          break;
      }
      break;
    case DrawingTypeEnum.ARROWTRIANGLE:
    case DrawingTypeEnum.LINE:
    case DrawingTypeEnum.ARROWRADIUS:
    case DrawingTypeEnum.ARROWDOUBLE:
      cursor = 'move';
      switch (selectIndex) {
        case 0:
        case 1:
          cursor = 'pointer';
          break;
        default:
          break;
      }
      break;
    case DrawingTypeEnum.ANCHOR:
      cursor = 'move';
      break;
    default:
      break;
  }
  // 选择标注操作类型
  switch (selectOptType) {
    case SelectTypeEnum.MULTI:
      cursor = 'default';
      break;
    case SelectTypeEnum.LASSO:
      cursor = 'default';
      break;
    default:
      break;
  }
  // 选中按钮的类型
  switch (btnSelectType) {
    case BtnEnum.DETAIL:
      cursor = 'pointer';
      break;
    case BtnEnum.EDIT:
      cursor = 'pointer';
      break;
    case BtnEnum.DELETE:
      cursor = 'pointer';
      break;
    default:
      break;
  }
  canvas.style.cursor = cursor;
};

// 全局唯一标识符
export const uuid = function (len: number, radix: number): string {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
};

// 获取偏移距离
export const getOffSet = function (
  originE: MouseEvent | null,
  event: MouseEvent,
): Offset {
  const ox = originE?.clientX || 0;
  const oy = originE?.clientY || 0;
  const x = event.clientX;
  const y = event.clientY;
  return {
    x: x - ox,
    y: y - oy,
  };
};

// 获取元素边距
export const getElementClient = function (element: HTMLElement) {
  let left = element.offsetLeft;
  let top = element.offsetTop;
  let parent: HTMLElement | null = element.parentElement;
  while (parent !== null) {
    const styles = window.getComputedStyle(parent);
    if (styles.position !== 'static') {
      // 避免重复添加
      left += parent.offsetLeft;
      top += parent.offsetTop;
    }
    parent = parent.parentElement;
  }
  return { left, top };
};

// 获取选择框 路径点
export const getSelectData = function (
  selectType: string,
  clusterData: PointsItem[],
): PointsItem[] {
  let data: PointsItem[] = [];
  if (selectType === SelectTypeEnum.LASSO) {
    data = JSON.parse(JSON.stringify(clusterData));
  }
  if (selectType === SelectTypeEnum.MULTI && clusterData.length > 1) {
    let s: PointsItem = JSON.parse(JSON.stringify(clusterData[0]));
    let t: PointsItem = JSON.parse(JSON.stringify(clusterData[1]));
    if (clusterData[0].x > clusterData[1].x) {
      s.x = clusterData[1].x;
      t.x = clusterData[0].x;
    }
    if (clusterData[0].y > clusterData[1].y) {
      s.y = clusterData[1].y;
      t.y = clusterData[0].y;
    }
    const step = 1;
    data.push(s);
    let num = s.x + step;
    // 上
    while (num < t.x) {
      data.push({
        x: num,
        y: s.y,
      });
      num += step;
    }
    data.push({
      x: t.x,
      y: s.y,
    });
    num = s.y + step;
    // 右
    while (num < t.y) {
      data.push({
        x: t.x,
        y: num,
      });
      num += step;
    }
    data.push(t);
    num = s.x - step;
    // 下
    while (num > t.x) {
      data.push({
        x: num,
        y: t.y,
      });
      num -= step;
    }
    data.push({
      x: s.x,
      y: t.y,
    });
    num = s.y - step;
    // 左
    while (num > t.y) {
      data.push({
        x: t.x,
        y: num,
      });
      num -= step;
    }
  }
  return data;
};

// 获取框选框 顶点
export const getClusterData = function (
  selectedIndexs: number[],
  shapesData: ShapesDataItem[],
  scale: number,
): PointsItem[] {
  let data: PointsItem[] = [];
  shapesData.forEach((item, index) => {
    if (Array.prototype.includes.call(selectedIndexs, index)) {
      switch (item.type) {
        case DrawingTypeEnum.TEXT:
        case DrawingTypeEnum.ANCHOR:
          data = getLimitData(data, item.x, item.y);
          break;
        case DrawingTypeEnum.RECT:
        case DrawingTypeEnum.ARC:
        case DrawingTypeEnum.ARROWTRIANGLE:
        case DrawingTypeEnum.LINE:
        case DrawingTypeEnum.ARROWRADIUS:
        case DrawingTypeEnum.ARROWDOUBLE:
          data = getLimitData(data, item.fromX, item.fromY);
          data = getLimitData(data, item.toX, item.toY);
          break;
        case DrawingTypeEnum.CLOUD:
          const r = cloudRX + cloudRY;
          data = getLimitData(data, item.fromX - r * 2, item.fromY - r);
          data = getLimitData(data, item.toX, item.toY + r);
          break;
        default:
          break;
      }
    }
  });
  if (data.length > 1) {
    const padding = 10 / scale; // 内间距
    data[0].x -= padding;
    data[0].y -= padding;
    data[1].x += padding;
    data[1].y += padding;
  }
  return data;
};

// 获取极限值
function getLimitData(data: PointsItem[], x: number, y: number): PointsItem[] {
  if (data.length === 0) {
    data.push({
      x,
      y,
    });
    data.push({
      x,
      y,
    });
    return data;
  }
  if (data[0].x > x) {
    data[0].x = x;
  }
  if (data[0].y > y) {
    data[0].y = y;
  }
  if (data[1].x < x) {
    data[1].x = x;
  }
  if (data[1].y < y) {
    data[1].y = y;
  }
  return data;
}

// 简单对象深复制
export const copy = function (obj: any) {
  return JSON.parse(JSON.stringify(obj));
};
