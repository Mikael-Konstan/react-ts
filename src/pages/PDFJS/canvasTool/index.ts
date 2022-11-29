export * from './utils';
import {
  defaultDrawingType,
  defaultSelectType,
  defaultShapeStyle,
  drawingTypes,
  rectAry,
  selectTypes,
  TextIptDefaultStyle,
} from './config';
import {
  anchor,
  anchorTransparent,
  arc,
  arcFrame,
  arcPoint,
  arcTransparent,
  arrowDouble,
  arrowRadius,
  arrowTransparent,
  arrowTriangle,
  btns,
  btnTransparent,
  cloud,
  cloudTransparent,
  clusterSelect,
  getAllSvgs,
  getCurParams,
  lasso,
  line,
  multi,
  paintVersion,
  rect,
  rectTransparent,
  SvgMaps,
  text,
  textFrame,
  toolTip,
} from './drawingShapes';
import {
  BtnEnum,
  CrossTypeEnum,
  DrawingTypeEnum,
  SelectTypeEnum,
} from './enum';
import {
  BooleanToggle,
  BtnType,
  CanvasInit,
  CanvasTextIpt,
  CrossType,
  DrawIngStatus,
  DrawingType,
  EventCB,
  Offset,
  PointData,
  PointsItem,
  Ready,
  SelectType,
  ShapesChange,
  ShapesData,
  ShapesDataItem,
  ShapesDataParams,
  ShapeStyle,
} from './type';
import {
  copy,
  getClusterData,
  getDefaultData,
  getElementClient,
  getOffSet,
  getPointData,
  getScaleData,
  getSelectData,
  setCanvasCursor,
} from './utils';

interface CanvasToolProps {
  canvas: HTMLCanvasElement; // 画布
  canvasInit?: CanvasInit; // 背景图初始化API
  canvasTextIpt?: HTMLTextAreaElement; // 文字输入框
  bindEventDom?: Element | undefined; // 事件绑定DOM
  shapesChange?: ShapesChange; // 图案数据变动监听
  backGround?: HTMLCanvasElement; // 背景图
  paintVersion?: boolean;
  ready?: Ready; // 图案数据变动监听
  keyUp?: EventCB;
  selectedShapes?: (...items: Array<any>) => any;
  mouseOver?: (...items: Array<any>) => any;
  mouseOut?: (...items: Array<any>) => any;
  mouseUp?: (...items: Array<any>) => any;
  [key: string]: any;
}

export class CanvasTool {
  // 画布参数
  private canvasToolProps: CanvasToolProps = {
    canvas: document.createElement('canvas'),
  };
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private canvasInit: CanvasInit = null;
  private canvasTextIpt: CanvasTextIpt = null;
  private scale = 1;
  private boundingBox = {
    offsetX: 0,
    offsetY: 0,
    w: 0,
    h: 0,
    maxW: 0,
    maxH: 0,
    targetWidth: 0,
    targetHeight: 0,
    parentOffsetX: 0,
    parentOffsetY: 0,
    offsetXAll: 0,
    offsetYAll: 0,
  };
  private bindEventDom: Element | undefined;
  private shapesChange: ShapesChange = null;
  private backGround: HTMLCanvasElement | undefined;
  private canvasMoveEnAble = false;

  // 动画参数
  private FPSTime = 100; // 帧率
  private drawIngStatus: DrawIngStatus = 'readying';

  // 绘制自定义图案内部参数
  private judgePosi = true; // 鼠标滑动时 操作flag(是否判断划上某个图案)
  private shapesData: ShapesData = []; // 自定义图案数据
  private selectTarget: ShapesDataItem | null = null; // 选中的自定义图案
  private selectCode = '';
  private textEditIndex = -1;
  private pointData: PointData = {
    // 拖动定位点数据
    // 自定义图案定位点 数据
    pointTarget: null,
    pointCode: '',
    points: [],
    originPoints: [],
  };
  private selectPointIndex = -1; // 选中的拖动定位点
  private originE: MouseEvent | null = null;

  // 绘制自定义图案外部参数
  private drawingAble = true;
  private drawingType: DrawingType | '' = defaultDrawingType;
  private shapeStyle = defaultShapeStyle;
  // 标注选择 方式切换
  private selectType: SelectType | '' = defaultSelectType;
  private clusterData: PointsItem[] = [];
  private clearClusterDataAble = false; // 是否清除clusterData的flag
  private selectedIndexs: number[] = [];
  // 是否绘制版本号
  private paintVersion = false;

  private svgs: SvgMaps = getAllSvgs();
  private showBtnFlag = true;
  public btnSelectType: BtnType | '' = '';

  constructor(canvasToolProps: CanvasToolProps) {
    if (canvasToolProps.canvas) {
      this.init(canvasToolProps);
    } else {
      console.log('请指定画布DOM');
    }
  }
  // 获取或设置 是否可编辑
  drawingEnabled(drawingAble?: BooleanToggle) {
    if (typeof drawingAble === 'boolean') {
      this.drawingAble = drawingAble;
      this.drawingType = defaultDrawingType;
      return this;
    } else if (String.prototype.trim.call(drawingAble) === 'true') {
      this.drawingAble = true;
      this.drawingType = defaultDrawingType;
      return this;
    } else if (String.prototype.trim.call(drawingAble) === 'false') {
      this.drawingAble = false;
      this.drawingType = defaultDrawingType;
      return this;
    } else {
      return this.drawingAble;
    }
  }
  // 设置可编辑类型
  setDrawingType(type?: string) {
    if (type === undefined) {
      return this.drawingType;
    } else if (Array.prototype.includes.call(drawingTypes, type)) {
      this.drawingType = type as DrawingType;
      if (type !== DrawingTypeEnum.TEXT) {
        this.hideCanvasTextIpt();
      }
    } else {
      this.drawingType = '';
      this.hideCanvasTextIpt();
    }
    return this;
  }
  // 设置选择标注方式
  setSelectType(type?: string) {
    if (type === undefined) {
      return this.selectType;
    } else if (Array.prototype.includes.call(selectTypes, type)) {
      this.selectType = type as SelectType;
      this.clearSelectedShapes();
    } else {
      this.selectType = '';
      this.clearSelectedShapes();
    }
    return this;
  }
  // 设置点击选中的标注
  setSelected(
    selectTarget: ShapesDataItem | null | undefined | string,
    refresh = true,
  ) {
    // selectTarget 可能为null  此时清空定位点
    if (typeof selectTarget === 'string') {
      let target = this.shapesData.find((item) => {
        return item.code === selectTarget;
      });
      this.pointData = getPointData(target || null, target?.code || '');
    } else {
      this.pointData = getPointData(
        selectTarget || null,
        selectTarget?.code || '',
      );
    }
    this.pointData.originPoints = copy(this.pointData.points);
    if (refresh) {
      this.refresh();
    }
  }
  // 清除框选选中数据
  clearSelectedShapes() {
    this.clusterData = [];
    this.canvasToolProps.selectedShapes &&
      this.canvasToolProps.selectedShapes([], 0, 0);
  }
  // 设置、更新Box Bounding
  private setBoundingBox() {
    if (!this.canvas) return;
    this.boundingBox.w = this.canvas.width;
    this.boundingBox.h = this.canvas.height;
    this.boundingBox.offsetX = this.canvas.offsetLeft;
    this.boundingBox.offsetY = this.canvas.offsetTop;
    const elementClient = getElementClient(this.canvas);
    this.boundingBox.offsetXAll = elementClient.left;
    this.boundingBox.offsetYAll = elementClient.top;
  }
  // 获取Box Bounding
  getBoundingBox() {
    return this.boundingBox;
  }
  // 更新自定义图案样式
  style(shapeStyle: ShapeStyle) {
    this.shapeStyle = {
      ...this.shapeStyle,
      ...shapeStyle,
    };
  }
  // 设置缩放比例
  zoom(scale?: number) {
    if (typeof scale === 'number') {
      this.scale = scale;
      this.refresh();
      setTimeout(() => {
        this.refresh();
      }, 600);
    } else {
      return this.scale;
    }
  }
  // 设置初始画布
  setBackGround(backGround?: HTMLCanvasElement) {
    if (!!backGround) {
      this.backGround = backGround;
      this.refresh();
      setTimeout(() => {
        this.refresh();
      }, 600);
    }
  }
  // 设置获取是否绘制版本号
  enableShowVision(paintVersion?: BooleanToggle) {
    if (typeof paintVersion === 'boolean') {
      this.paintVersion = paintVersion;
      this.refresh();
      return this;
    } else if (String.prototype.trim.call(paintVersion) === 'true') {
      this.paintVersion = true;
      this.refresh();
      return this;
    } else if (String.prototype.trim.call(paintVersion) === 'false') {
      this.paintVersion = false;
      this.refresh();
      return this;
    } else {
      return this.paintVersion;
    }
  }
  // 获取可以移动画布
  canvasMoveAble() {
    return this.canvasMoveEnAble;
  }
  // 获取选中的图案
  getSelectedShape() {
    return {
      shapesData: this.shapesData,
      pointData: this.pointData,
    };
  }
  // 初始化
  init(canvasToolProps: CanvasToolProps) {
    this.canvasToolProps = canvasToolProps;
    this.canvas = canvasToolProps.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.setBoundingBox();
    this.canvasInit = canvasToolProps.canvasInit;
    this.canvasTextIpt = canvasToolProps.canvasTextIpt;
    this.shapesChange = canvasToolProps.shapesChange;
    this.backGround = canvasToolProps.backGround;
    this.paintVersion = !!canvasToolProps.paintVersion;
    if (!canvasToolProps.bindEventDom) {
      this.bindEventDom = canvasToolProps.canvas;
    } else {
      this.bindEventDom = canvasToolProps.bindEventDom;
    }

    if (!this.canvasTextIpt) {
      this.canvasTextIpt = document.createElement('textarea');
      this.canvasTextIpt.rows = 1;
      this.canvasTextIpt.style.overflow = TextIptDefaultStyle.overflow;
      this.canvasTextIpt.style.resize = TextIptDefaultStyle.resize;
      this.canvasTextIpt.style.backgroundColor =
        TextIptDefaultStyle.backgroundColor;
      this.canvasTextIpt.style.borderColor = TextIptDefaultStyle.borderColor;
      this.canvasTextIpt.style.borderWidth =
        TextIptDefaultStyle.borderWidth + 'px';
      this.canvasTextIpt.style.padding = TextIptDefaultStyle.padding + 'px';
      this.canvasTextIpt.style.width = TextIptDefaultStyle.width + 'px';
      this.canvasTextIpt.style.maxWidth = TextIptDefaultStyle.maxWidth + 'px';
      this.canvasTextIpt.style.wordWrap = TextIptDefaultStyle.wordWrap;
      this.canvasTextIpt.style.outline = TextIptDefaultStyle.outline;
      this.canvasTextIpt.style.display = TextIptDefaultStyle.display;
      this.canvasTextIpt.style.position = TextIptDefaultStyle.position;
      this.canvasTextIpt.style.zIndex = TextIptDefaultStyle.zIndex;
      this.canvasTextIpt.style.top = TextIptDefaultStyle.top + 'px';
      this.canvasTextIpt.style.left = TextIptDefaultStyle.left + 'px';
      document.body.appendChild(this.canvasTextIpt);
    }
    this.bindEvent();
    // 画布初始化
    this.paintCanvas();
    canvasToolProps.ready && canvasToolProps.ready(this);
  }
  // 绑定事件
  bindEvent() {
    this.bindEventDom?.addEventListener(
      'click',
      (event) => {
        event.stopPropagation();
        this.clickHandle(event as MouseEvent);
      },
      {
        capture: true,
      },
    );
    this.bindEventDom?.addEventListener('dblclick', (event) => {
      event.stopPropagation();
      this.dblClickHandle(event as MouseEvent);
    });
    window.addEventListener('mousemove', (event) => {
      event.stopPropagation();
      if (this.judgePosi) {
        this.refresh(event);
      } else {
        this.moveHandle(event as MouseEvent);
      }
    });
    this.bindEventDom?.addEventListener('mousedown', (event) => {
      event.stopPropagation();
      this.judgePosi = false;
      this.originE = event as MouseEvent;
      this.setBoundingBox();
      if (this.btnSelectType === '') {
        // 点击到按钮时 不清空
        this.updatePointData();
      }
      if (this.drawingAble && this.selectType === SelectTypeEnum.MULTI) {
        this.clusterData.push(this.getPoint(event as MouseEvent));
      }
    });
    window.addEventListener('mouseup', (event) => {
      event.stopPropagation();
      this.mouseUpHandle();
    });
    this.bindEventDom?.addEventListener('contextmenu', (event) => {
      event.stopPropagation();
    });

    this.canvasTextIpt?.addEventListener('keydown', (event) => {
      event.stopPropagation();
      const { key } = event;
      if (key === 'Enter' && !event.shiftKey) {
        const target = event.target as HTMLTextAreaElement;
        this.getIptVal(target);
      }
    });
    this.canvasTextIpt?.addEventListener('blur', (event) => {
      event.stopPropagation();
      const target = event.target as HTMLTextAreaElement;
      this.getIptVal(target);
    });
    this.canvasTextIpt?.addEventListener('input', (event) => {
      event.stopPropagation();
      const target = event.target as HTMLTextAreaElement;
      const value = target.value || '';
      const rows = Math.floor(value.length / 27) + 1;
      const fontSize = parseInt(target.style.fontSize);
      if (this.canvasTextIpt) {
        this.canvasTextIpt.rows = rows;
        this.canvasTextIpt.style.height = fontSize * rows + 4 + 'px';
      }
    });

    window.addEventListener(
      'keyup',
      (event: Event) => {
        event.stopPropagation();
        this.canvasToolProps.keyUp &&
          this.canvasToolProps.keyUp(
            this.selectTarget || this.pointData.pointTarget,
            event,
          );
      },
      false,
    );
  }
  // 事件监听
  on(eventType: string, cb: EventCB) {
    switch (eventType) {
      case 'shapesChange':
        break;
      default:
        break;
    }
  }
  // 用输入框的值 添加文字
  getIptVal(target: HTMLTextAreaElement) {
    const value = String.prototype.trim.call(target.value);
    if (value === '') return;
    let x = target.offsetLeft;
    let y = target.offsetTop;
    if (this.canvas) {
      x -= this.boundingBox.offsetXAll;
      y -= this.boundingBox.offsetYAll;
    }
    x = x / this.scale;
    y = y / this.scale;
    this.hideCanvasTextIpt();
    if (this.textEditIndex !== -1) {
      const textShapeData = {
        ...this.shapesData[this.textEditIndex],
        text: value,
        x,
        y,
      };
      this.shapesData[this.textEditIndex] = textShapeData;
      this.textEditIndex = -1;
      this.shapesChange && this.shapesChange('update', textShapeData);
    } else {
      this.add({
        type: DrawingTypeEnum.TEXT,
        text: value,
        x,
        y,
        show: true,
      });
    }
  }
  // 单击事件
  clickHandle(event: MouseEvent) {
    const selectIndex = this.getSelectIndex();
    if (this.clearClusterDataAble) {
      this.clearClusterDataAble = false;
    } else {
      if (this.clusterData.length > 0 && this.btnSelectType === '') {
        this.selectType = '';
        this.clearSelectedShapes();
      }
    }
    if (
      this.drawingAble &&
      selectIndex === -1 &&
      this.selectPointIndex === -1
    ) {
      if (this.drawingType === DrawingTypeEnum.ANCHOR) {
        this.add({
          type: DrawingTypeEnum.ANCHOR,
          ...this.getPoint(event),
          show: true,
        });
      }
      if (this.drawingType === DrawingTypeEnum.TEXT && this.canvasTextIpt) {
        this.canvasTextIpt.style.display = 'block';
        this.canvasTextIpt.style.left = event.clientX + 4 + 'px';
        this.canvasTextIpt.style.top = event.clientY + 4 + 'px';
        this.canvasTextIpt.style.color = this.shapeStyle.fontColor;
        this.canvasTextIpt.style.fontWeight = this.shapeStyle.fontWeight;
        this.canvasTextIpt.style.fontSize = this.shapeStyle.fontSize + 'px';
        this.canvasTextIpt.style.fontFamily = this.shapeStyle.fontFamily;
        this.canvasTextIpt.focus();
      } else {
        this.hideCanvasTextIpt();
      }
    } else {
      this.hideCanvasTextIpt();
    }
    this.paintCanvas(event);
  }
  // 双击事件
  dblClickHandle(event: MouseEvent) {
    const selectIndex = this.getSelectIndex();
    if (
      this.selectTarget &&
      this.selectTarget.type === DrawingTypeEnum.TEXT && // 双击修改文字
      selectIndex !== -1
    ) {
      this.textEditIndex = selectIndex;
      if (this.canvasTextIpt) {
        this.canvasTextIpt.value = this.selectTarget.text;
        this.canvasTextIpt.rows = this.selectTarget.rows || 1;
        if (!!this.selectTarget.fontColor) {
          this.shapeStyle.fontColor = this.selectTarget.fontColor;
        }
        if (!!this.selectTarget.fontSize) {
          this.shapeStyle.fontSize = this.selectTarget.fontSize;
        }
        if (!!this.selectTarget.fontFamily) {
          this.shapeStyle.fontFamily = this.selectTarget.fontFamily;
        }
        if (!!this.selectTarget.fontWeight) {
          this.shapeStyle.fontWeight = this.selectTarget.fontWeight;
        }
        const style = {
          ...TextIptDefaultStyle,
          display: 'block',
          left: this.selectTarget.x * this.scale + this.boundingBox.offsetXAll,
          top: this.selectTarget.y * this.scale + this.boundingBox.offsetYAll,
          ...this.selectTarget,
        };
        this.canvasTextIpt.style.display = style.display;
        this.canvasTextIpt.style.left = style.left + 'px';
        this.canvasTextIpt.style.top = style.top + 'px';
        this.canvasTextIpt.style.color = style.fontColor;
        this.canvasTextIpt.style.fontSize = style.fontSize + 'px';
        this.canvasTextIpt.style.fontFamily = style.fontFamily;
        this.canvasTextIpt.style.fontWeight = style.fontWeight;
        this.canvasTextIpt.style.height =
          this.canvasTextIpt.rows * style.fontSize + 4 + 'px';

        this.canvasTextIpt.focus();
      }
    } else {
    }
    this.paintCanvas(event);
  }
  // 拖动自定义图案
  moveHandle(event: MouseEvent) {
    const selectIndex = this.getSelectIndex();
    this.canvasMoveEnAble = false;
    if (selectIndex !== -1 || this.selectPointIndex !== -1) {
      const offset = getOffSet(this.originE, event);
      if (this.selectPointIndex === -1) {
        // 拖动图案
        this.updateData(offset);
      } else {
        // 拖动更改图案大小
        this.updateScaleData(offset);
        this.updatePointData();
      }
      this.refresh();
    } else {
      if (this.drawingAble && this.selectType === SelectTypeEnum.MULTI) {
        this.clusterData[1] = this.getPoint(event);
        this.refresh();
      } else if (this.drawingAble && this.selectType === SelectTypeEnum.LASSO) {
        this.clusterData.push(this.getPoint(event));
        this.refresh();
      } else if (
        this.drawingAble &&
        this.selectType === '' &&
        this.drawingType !== '' &&
        this.drawingType !== DrawingTypeEnum.TEXT
      ) {
        const offsetLeft = this.boundingBox.offsetXAll;
        const offsetTop = this.boundingBox.offsetYAll;
        if (this.drawIngStatus === 'readying') {
          this.drawIngStatus = 'pending';

          let paramsObj: any = {
            type: this.drawingType,
            fromX: ((this.originE?.clientX || 0) - offsetLeft) / this.scale,
            fromY: ((this.originE?.clientY || 0) - offsetTop) / this.scale,
            toX: (event.clientX - offsetLeft) / this.scale,
            toY: (event.clientY - offsetTop) / this.scale,
            fillStyle: this.shapeStyle.fillStyle,
            show: true,
          };
          if (this.drawingType !== DrawingTypeEnum.ARROWTRIANGLE) {
            paramsObj.lineWidth = this.shapeStyle.lineWidth;
          }
          this.add(paramsObj, false); // 暂不通知
        } else {
          let idx = this.shapesData.length - 1;
          let shapeData: any = {
            ...this.shapesData[idx],
            toX: (event.clientX - offsetLeft) / this.scale,
            toY: (event.clientY - offsetTop) / this.scale,
          };
          this.shapesData[idx] = shapeData;
        }
        this.refresh(event);
      } else {
        this.canvasMoveEnAble = true;
        const offset = getOffSet(this.originE, event);
        if (this.canvas) {
          this.canvas.style.left = this.boundingBox.offsetX + offset.x + 'px';
          this.canvas.style.top = this.boundingBox.offsetY + offset.y + 'px';
        }
      }
    }
  }
  // 鼠标抬起
  mouseUpHandle() {
    const selectIndex = this.getSelectIndex();
    this.judgePosi = true;
    if (this.drawIngStatus === 'pending') {
      this.drawIngStatus = 'readying';
      let idx = this.shapesData.length - 1;
      let drawingPattern = this.shapesData[idx];
      if (
        drawingPattern.type !== DrawingTypeEnum.TEXT &&
        (drawingPattern.toX - drawingPattern.fromX <= 2 ||
          drawingPattern.toY - drawingPattern.fromY <= 2)
      ) {
        // 去掉没画好 不合理的图案
        // this.shapesData.pop()
      }
      // 鼠标抬起再通知 标注增加
      this.shapesChange && this.shapesChange('add', this.shapesData[idx]);
    }

    // 拖动结束更新初始数据
    if (selectIndex !== -1) {
      this.selectTarget = copy(this.shapesData[selectIndex]);
      this.pointData.originPoints = copy(this.pointData.points);
    }

    if (
      this.selectType !== '' &&
      this.selectType !== SelectTypeEnum.CLUSTERSELECT
    ) {
      this.getSelectShapes();
    } else {
      // 选中单击的图案
      this.canvasToolProps.selectedShapes &&
        this.shapesData[selectIndex] &&
        this.canvasToolProps.selectedShapes([
          this.shapesData[selectIndex].code || '',
        ]);
    }
    this.canvasToolProps.mouseUp &&
      this.canvasToolProps.mouseUp(
        this.shapesData[this.getSelectIndex(this.pointData.pointCode)],
      );

    this.setBoundingBox();
  }
  // 隐藏文字输入框
  hideCanvasTextIpt() {
    if (this.canvasTextIpt) {
      this.canvasTextIpt.style.display = TextIptDefaultStyle.display;
      this.canvasTextIpt.value = '';
    }
  }
  // 按帧刷新
  refresh(event?: any) {
    requestAnimationFrame(() => {
      this.paintCanvas(event);
    });
  }
  // 更新定位点数据
  updatePointData() {
    const selectIndex = this.getSelectIndex();
    const selectTarget = this.shapesData[selectIndex];
    // selectIndex可能为-1  此时清空定位点
    this.setSelected(selectTarget, false);
  }
  // 清空
  clear() {
    this.ctx?.clearRect(0, 0, this.boundingBox.w, this.boundingBox.h);
  }
  // 绘制画布
  paintCanvas(event?: MouseEvent) {
    if (!this.canvas || !this.ctx) return;
    let points = null;
    if (event) {
      points = {
        x: event.clientX - this.canvas.getBoundingClientRect().left,
        y: event.clientY - this.canvas.getBoundingClientRect().top,
      };
    }

    this.clear();
    this.ctx.save();
    this.canvasInit && this.canvasInit();
    if (
      this.backGround &&
      !!this.backGround.width &&
      !!this.backGround.height
    ) {
      this.ctx.drawImage(this.backGround, 0, 0);
    }
    this.ctx.restore();

    this.ctx.save();
    this.paintShapes(points);
    this.ctx.restore();

    this.ctx.save();
    this.paintPoint(points);
    this.ctx.restore();

    this.ctx.save();
    this.paintSelectPoint(points);
    this.ctx.restore();

    setCanvasCursor(
      this.selectTarget?.type || '',
      this.selectType,
      this.btnSelectType,
      this.selectPointIndex,
      this.canvas,
    );
  }
  // 更新数据
  updateData(offset: Offset) {
    const selectIndex = this.getSelectIndex();
    // 拖动时需要初始数据来计算
    const x = offset.x / this.scale;
    const y = offset.y / this.scale;
    if (!this.selectTarget || this.selectTarget === undefined) return;
    switch (this.selectTarget.type) {
      case DrawingTypeEnum.TEXT:
      case DrawingTypeEnum.ANCHOR:
        this.shapesData[selectIndex] = {
          ...this.selectTarget,
          x: this.selectTarget.x + x,
          y: this.selectTarget.y + y,
        };
        break;
      case DrawingTypeEnum.RECT:
      case DrawingTypeEnum.ARC:
      case DrawingTypeEnum.CLOUD:
      case DrawingTypeEnum.ARROWTRIANGLE:
      case DrawingTypeEnum.LINE:
      case DrawingTypeEnum.ARROWRADIUS:
      case DrawingTypeEnum.ARROWDOUBLE:
        this.shapesData[selectIndex] = {
          ...this.selectTarget,
          fromX: this.selectTarget.fromX + x,
          fromY: this.selectTarget.fromY + y,
          toX: this.selectTarget.toX + x,
          toY: this.selectTarget.toY + y,
        };
        break;
      default:
        break;
    }
    this.shapesChange &&
      this.shapesChange('update', this.shapesData[selectIndex]);
    this.pointData.points = this.pointData.originPoints.map((item) => {
      return {
        x: item.x + x,
        y: item.y + y,
      };
    });
  }
  // 更新放缩数据
  updateScaleData(offset: Offset) {
    if (!this.selectTarget) return;
    const shapeData = getScaleData(
      { x: offset.x / this.scale, y: offset.y / this.scale },
      this.selectTarget,
      this.selectPointIndex,
    );
    if (shapeData) {
      const pointIndex = this.getSelectIndex(this.pointData.pointCode);
      this.shapesData[pointIndex] = shapeData;
      this.shapesChange && this.shapesChange('update', shapeData);
    }
  }
  // 添加数据
  add(shapesData: ShapesDataParams | ShapesDataParams[], emit = true) {
    let data: any;
    if (Array.isArray(shapesData)) {
      data = shapesData.map((item) => {
        const shapeData = getDefaultData(item, this.shapeStyle);
        return shapeData;
      });
      this.shapesData = Array.prototype.concat(this.shapesData, data);
    } else {
      data = getDefaultData(shapesData, this.shapeStyle);
      this.shapesData.push(data);
    }
    if (emit) {
      this.shapesChange && this.shapesChange('add', data);
    }
    this.paintCanvas();
  }
  // 删除数据
  remove(shapesData: ShapesDataItem | ShapesDataItem[]) {
    let delData: ShapesDataItem[] = [];
    let len = this.shapesData.length;
    if (Array.isArray(shapesData)) {
      let sum = shapesData.length;
      for (let i = len - 1; i >= 0; i--) {
        for (let item of shapesData) {
          if (item.code === this.shapesData[i].code) {
            delData.push(this.shapesData[i]);
            this.deleteShapeData(i);
            sum--;
            break;
          }
        }
        if (sum === 0) {
          break;
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        if (this.shapesData[i].code === shapesData.code) {
          delData.push(this.shapesData[i]);
          this.deleteShapeData(i);
          break;
        }
      }
    }
    this.shapesChange && this.shapesChange('delete', delData);
    this.updatePointData();
    this.paintCanvas();
  }
  // 删除全部
  removeAll() {
    let delData: ShapesDataItem[] = this.shapesData;
    this.shapesData = [];
    this.shapesChange && this.shapesChange('delete', delData);
    this.paintCanvas();
  }
  // 删除某一项
  deleteShapeData(i: number) {
    if (this.shapesData[i].code === this.selectTarget?.code) {
      this.selectTarget = null;
      this.selectCode = '';
    }
    if (this.selectedIndexs.includes(i)) {
      this.clearSelectedShapes();
    }
    this.shapesChange && this.shapesChange('delete', this.shapesData[i]);
    this.shapesData.splice(i, 1);
  }
  // 更新某一项
  updateShapeData(item: ShapesDataItem) {
    let idx = this.shapesData.findIndex((shapeData) => {
      return shapeData.code === item.code;
    });
    if (idx === -1) {
      idx = this.shapesData.length;
    }
    const newData = {
      ...this.shapesData[idx],
      ...item,
    };
    this.shapesChange && this.shapesChange('update', newData);
    this.shapesData.splice(idx, 1, newData);
  }
  // 获取数据
  getShapesData() {
    return this.shapesData;
  }
  // 绘制自定义
  paintShapes(mousePosi: PointsItem | null) {
    let selectTarget = null;
    let selectCode = '';
    let versionHoverTarget = null;
    const len = this.shapesData.length - 1;
    const flag = this.judgePosi && !!mousePosi;
    for (let i = len; i >= 0; i--) {
      if (i === this.textEditIndex) continue;
      const item = this.shapesData[i];
      if (!item.show) continue;
      if (flag) {
        this.paintShapeTransparent(item);
        let type = CrossTypeEnum.LINE;
        if (
          item.type === DrawingTypeEnum.TEXT ||
          item.type === DrawingTypeEnum.ANCHOR
        ) {
          type = CrossTypeEnum.BOTH;
        }

        if (this.isCross(mousePosi, type)) {
          // 鼠标位置判断 是否选中自定义图案
          selectTarget = item;
          selectCode = item.code;
        }
      }
      const hoverFlag = this.paintShape(item, mousePosi);
      if (hoverFlag) {
        versionHoverTarget = item;
      }
    }
    if (this.judgePosi) {
      if (
        !!this.canvas &&
        !!mousePosi &&
        !!this.canvasToolProps.mouseOver &&
        (!!selectTarget || !!versionHoverTarget)
      ) {
        this.canvasToolProps.mouseOver({
          commentHover: selectTarget || null,
          versionHover: {
            ...versionHoverTarget,
            mousePosiX: mousePosi.x + this.canvas.getBoundingClientRect().left,
            mousePosiY: mousePosi.y + this.canvas.getBoundingClientRect().top,
          },
        });
      } else {
        this.canvasToolProps.mouseOut && this.canvasToolProps.mouseOut(null);
        this.canvasToolProps.mouseOver && this.canvasToolProps.mouseOver(null);
      }

      if (this.selectCode !== '' && this.selectCode !== selectCode) {
        const selectIndex = this.getSelectIndex();
        this.canvasToolProps.mouseOut &&
          this.canvasToolProps.mouseOut(this.shapesData[selectIndex]);
      }
      this.selectTarget = copy(selectTarget);
      this.selectCode = selectCode;
    } else {
      this.canvasToolProps.mouseOver && this.canvasToolProps.mouseOver(null);
    }
  }
  // 绘制定位 框及点
  paintPoint(mousePosi: PointsItem | null) {
    let selectPointIndex = -1;

    // this.shapesData 的数据是新的 但是selectIndex要用旧的
    const pointIndex = this.getSelectIndex(this.pointData.pointCode);
    const selectTargetOld = this.shapesData[pointIndex];
    const flag = this.judgePosi && !!mousePosi;
    if (selectTargetOld) {
      const type = selectTargetOld.type;

      if (type === DrawingTypeEnum.TEXT && pointIndex !== this.textEditIndex) {
        // 文字边框
        textFrame(this.ctx, {
          ...selectTargetOld,
          x: selectTargetOld.x * this.scale,
          y: selectTargetOld.y * this.scale,
        });
      }
      if (type === DrawingTypeEnum.ARC) {
        // 绘制圆形或椭形边框
        arcFrame(this.ctx, this.scale, selectTargetOld);
      }
      const types = [
        DrawingTypeEnum.RECT,
        DrawingTypeEnum.ARC,
        DrawingTypeEnum.CLOUD,
      ];
      if (
        this.showBtnFlag &&
        // types.includes(type) &&
        this.selectType !== SelectTypeEnum.CLUSTERSELECT
      ) {
        let x =
          selectTargetOld.fromX > selectTargetOld.toX
            ? selectTargetOld.fromX
            : selectTargetOld.toX;
        let y =
          selectTargetOld.fromY > selectTargetOld.toY
            ? selectTargetOld.toY
            : selectTargetOld.fromY;
        if (type === DrawingTypeEnum.ANCHOR || type === DrawingTypeEnum.TEXT) {
          x = selectTargetOld.x;
          y = selectTargetOld.y - 20 * this.scale;
        }
        if (
          [
            DrawingTypeEnum.ARROWRADIUS,
            DrawingTypeEnum.LINE,
            DrawingTypeEnum.ARROWDOUBLE,
          ].includes(type)
        ) {
          if (selectTargetOld.fromY < selectTargetOld.toY) {
            x = selectTargetOld.fromX;
            y = selectTargetOld.fromY;
          } else {
            x = selectTargetOld.toX;
            y = selectTargetOld.toY;
          }
        }
        this.paintBtns({
          x,
          y,
          mousePosi,
          version: selectTargetOld.versionName,
          curVersion: selectTargetOld.curVersion,
        });
      }
    }
    this.pointData.points.forEach((item, index) => {
      arcPoint(this.ctx, this.scale, {
        x: item.x,
        y: item.y,
      });
      if (flag && this.isCross(mousePosi)) {
        selectPointIndex = index;
      }
    });
    if (this.judgePosi) {
      this.selectPointIndex = selectPointIndex;

      if (selectPointIndex !== -1) {
        // 选中定位点 同时选中定位点对应的标注
        this.selectTarget = this.shapesData[pointIndex];
        this.selectCode = this.selectTarget.code;
      }
    }
  }
  // 绘制图案
  paintShape(shapeData: ShapesDataItem, mousePosi: PointsItem | null) {
    const types = [
      DrawingTypeEnum.RECT,
      DrawingTypeEnum.ARC,
      DrawingTypeEnum.CLOUD,
    ];
    const type = shapeData.type;
    const selectedCode = this.getSelectedCode();
    let hoverFlag = false;
    switch (type) {
      case DrawingTypeEnum.TEXT:
        const rows = text(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        shapeData.rows = rows;
        hoverFlag = paintVersion(this.ctx, this.scale, {
          ...shapeData,
          mousePosi,
          x: shapeData.x + 4 / this.scale,
          y: shapeData.y - (shapeData.fontSize - 2) / this.scale,
          version: shapeData.versionName,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.RECT:
        rect(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          mousePosi,
          x: shapeData.fromX > shapeData.toX ? shapeData.fromX : shapeData.toX,
          y: shapeData.fromY < shapeData.toY ? shapeData.fromY : shapeData.toY,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.ARC:
        arc(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          mousePosi,
          x: shapeData.fromX > shapeData.toX ? shapeData.fromX : shapeData.toX,
          y:
            (shapeData.fromY < shapeData.toY
              ? shapeData.fromY
              : shapeData.toY) +
            Math.abs(shapeData.fromY - shapeData.toY) / 4,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.CLOUD:
        cloud(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          mousePosi,
          x: shapeData.fromX > shapeData.toX ? shapeData.fromX : shapeData.toX,
          y: shapeData.fromY < shapeData.toY ? shapeData.fromY : shapeData.toY,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.ARROWTRIANGLE:
        arrowTriangle(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          mousePosi,
          x: shapeData.fromX > shapeData.toX ? shapeData.fromX : shapeData.toX,
          y: shapeData.fromX > shapeData.toX ? shapeData.fromY : shapeData.toY,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.LINE:
        line(this.ctx, this.scale, {
          ...this.shapeStyle,
          strokeStyle: this.shapeStyle.fillStyle,
          ...shapeData,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          mousePosi,
          x:
            (shapeData.fromX > shapeData.toX
              ? shapeData.fromX
              : shapeData.toX) +
            16 / this.scale,
          y: shapeData.fromX > shapeData.toX ? shapeData.fromY : shapeData.toY,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.ARROWRADIUS:
        arrowRadius(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          mousePosi,
          x:
            (shapeData.fromX > shapeData.toX
              ? shapeData.fromX
              : shapeData.toX) +
            16 / this.scale,
          y: shapeData.fromX > shapeData.toX ? shapeData.fromY : shapeData.toY,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.ARROWDOUBLE:
        arrowDouble(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          mousePosi,
          x:
            (shapeData.fromX > shapeData.toX
              ? shapeData.fromX
              : shapeData.toX) +
            16 / this.scale,
          y: shapeData.fromX > shapeData.toX ? shapeData.fromY : shapeData.toY,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      case DrawingTypeEnum.ANCHOR:
        anchor(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
          bigSizeFlag: selectedCode === shapeData.code,
          anchorSvg: this.svgs.anchorSvg,
        });
        hoverFlag = paintVersion(this.ctx, this.scale, {
          text: shapeData.versionName || '',
          ...shapeData,
          mousePosi,
          x: shapeData.x + 20 / this.scale,
          y: shapeData.y - 20 / this.scale,
          version: shapeData.versionName,
          curVersion: shapeData.curVersion,
          paintVersion: this.paintVersion,
        });
        break;
      default:
        break;
    }
    if (types.includes(type)) {
      const x = (shapeData.fromX + shapeData.toX) / 2;
      const y =
        shapeData.fromY < shapeData.toY ? shapeData.fromY : shapeData.toY;
      toolTip(this.ctx, this.scale, {
        ...shapeData,
        fontColor: '#FFFFFF',
        text: shapeData.comment || '',
        x,
        y,
      });
    }
    return hoverFlag;
  }
  // 绘制图案 - 透明 定位用
  paintShapeTransparent(shapeData: ShapesDataItem) {
    const selectedCode = this.getSelectedCode();
    switch (shapeData.type) {
      case DrawingTypeEnum.TEXT:
        const rows = text(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        shapeData.rows = rows;
        break;
      case DrawingTypeEnum.RECT:
        rectTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        break;
      case DrawingTypeEnum.ARC:
        arcTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        break;
      case DrawingTypeEnum.CLOUD:
        cloudTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        break;
      case DrawingTypeEnum.ARROWTRIANGLE:
        arrowTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        break;
      case DrawingTypeEnum.LINE:
        arrowTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        break;
      case DrawingTypeEnum.ARROWRADIUS:
        arrowTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        break;
      case DrawingTypeEnum.ARROWDOUBLE:
        arrowTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
        });
        break;
      case DrawingTypeEnum.ANCHOR:
        anchorTransparent(this.ctx, this.scale, {
          ...this.shapeStyle,
          ...shapeData,
          bigSizeFlag: selectedCode === shapeData.code,
          anchorSvg: this.svgs.anchorSvg,
        });
      default:
        break;
    }
  }
  // 绘制选择功能图案
  paintSelectPoint(mousePosi: PointsItem | null) {
    switch (this.selectType) {
      case SelectTypeEnum.MULTI:
        multi(this.ctx, this.scale, this.clusterData);
        break;
      case SelectTypeEnum.LASSO:
        lasso(this.ctx, this.scale, this.clusterData);
        break;
      case SelectTypeEnum.CLUSTERSELECT:
        // 绘制最终选中标注的容器
        if (this.clusterData.length > 1) {
          clusterSelect(this.ctx, this.scale, this.clusterData);
          if (!!mousePosi && this.isCross(mousePosi) && this.canvas) {
            this.canvas.style.cursor = 'move';
            this.selectCode = '';
          }
          if (this.showBtnFlag) {
            const x = this.clusterData[1].x;
            const y = this.clusterData[0].y;
            this.paintBtns({
              x,
              y,
              mousePosi,
            });
          }
        }
        break;
      default:
        break;
    }
  }
  // 绘制按钮
  paintBtns({
    x,
    y,
    mousePosi,
    version = '',
    curVersion = false,
  }: {
    x: number;
    y: number;
    mousePosi: PointsItem | null;
    version?: string;
    curVersion?: boolean;
  }) {
    const flag = this.judgePosi && !!mousePosi;
    let btnSelectType: BtnType | '' = '';
    if (this.showBtnFlag && flag) {
      const btnTypes = [BtnEnum.DETAIL, BtnEnum.EDIT, BtnEnum.DELETE];
      btnTypes.forEach((btnType) => {
        btnTransparent(this.ctx, this.scale, {
          text: btnType,
          x,
          y,
        });
        if (this.isCross(mousePosi)) {
          btnSelectType = btnType;
        }
      });
    }
    this.btnSelectType = btnSelectType;
    btns(this.ctx, this.scale, {
      x,
      y,
      version,
      detailSvg: this.svgs.detailSvg,
      editSvg: this.svgs.editSvg,
      deleteSvg: this.svgs.deleteSvg,
      paintVersion: true,
      curVersion,
    });
  }
  // 获取选中标注type
  getSelectedCode() {
    const pointIndex = this.getSelectIndex(this.pointData.pointCode);
    const selectTargetOld = this.shapesData[pointIndex];
    return selectTargetOld?.code || '';
  }
  // 获取鼠标在当前画布坐标
  getPoint(event: MouseEvent) {
    let x = event.clientX;
    let y = event.clientY;
    if (this.canvas) {
      x -= this.boundingBox.offsetXAll;
      y -= this.boundingBox.offsetYAll;
    }
    return {
      x: x / this.scale,
      y: y / this.scale,
    };
  }
  // 获取isPointInPath 的x, y 这个坐标不需要放缩
  getCrossPoint(point: PointsItem, flag = false) {
    const scale = flag ? this.scale : 1;
    const clientX = point.x * scale + this.boundingBox.offsetXAll;
    const clientY = point.y * scale + this.boundingBox.offsetYAll;
    let left = 0;
    let top = 0;
    if (this.canvas) {
      left = this.canvas.getBoundingClientRect().left;
      top = this.canvas.getBoundingClientRect().top;
    }
    return {
      x: clientX - left,
      y: clientY - top,
    };
  }
  // 获取选中的自定义图案
  getSelectShapes() {
    if (
      this.selectType !== '' &&
      this.selectType !== SelectTypeEnum.CLUSTERSELECT
    ) {
      const clusterData = getSelectData(this.selectType, this.clusterData);
      let selectedIndexs: number[] = [];
      // 1、全部包含 只判断图案上任意一点
      if (clusterData.length > 0) {
        // 最后一个图案可能是上一次框选绘制的
        this.shapesData.forEach((shapeData, idx) => {
          const point = { x: 0, y: 0 };
          if (Array.prototype.includes.call(rectAry, shapeData.type)) {
            const { fromX, fromY, toX, toY } = getCurParams(
              DrawingTypeEnum.RECT,
              this.scale,
              shapeData,
            );
            point.x = (fromX + toX) / 2;
            point.y = (fromY + toY) / 2;
          } else {
            let { x, y } = getCurParams(
              DrawingTypeEnum.TEXT,
              this.scale,
              shapeData,
            );
            point.x = x;
            point.y = y;
          }
          if (this.isCross(this.getCrossPoint(point))) {
            // 图案坐标不需要放缩
            selectedIndexs.push(idx);
          }
        });
      }
      // 2、有交叉 判断clusterData 里面的点是否在图案内
      // 自定义透明的图案绘制一遍
      this.shapesData.forEach((item, index) => {
        this.paintShapeTransparent(item);
        clusterData.forEach((pointItem) => {
          if (this.isCross(this.getCrossPoint(pointItem, true))) {
            // 鼠标坐标需要放缩
            selectedIndexs.push(index);
          }
        });
      });

      // selectedIndexs = Array.from(new Set(selectedIndexs));
      const selectedIndex = selectedIndexs[0];
      selectedIndexs = [selectedIndex]; // 目前先做单选
      this.selectedIndexs = selectedIndexs;
      this.selectType = SelectTypeEnum.CLUSTERSELECT;
      this.clusterData = getClusterData(
        selectedIndexs,
        this.shapesData,
        this.scale,
      );
      this.paintCanvas();
      this.clearClusterDataAble = true;

      this.pointData.pointTarget = this.shapesData[selectedIndex];
    }
  }
  // 判断点是否在闭合图案内
  isCross({ x, y }: PointsItem, type: CrossType = CrossTypeEnum.BOTH): boolean {
    if (x === undefined || y === undefined || !this.ctx) return false;
    if (type === CrossTypeEnum.CONTENT) {
      // 判定最后绘制的闭合图案 内部是否包含检测点
      return this.ctx.isPointInPath(x, y);
    }
    if (type === CrossTypeEnum.LINE) {
      // 判定最后绘制的闭合图案 线上是否包含检测点
      return this.ctx.isPointInStroke(x, y);
    }
    return this.ctx.isPointInPath(x, y) || this.ctx.isPointInStroke(x, y);
  }
  // 拖动时重新获取标注列表 标注的索引会变化 更换code定位
  getSelectIndex(code?: string) {
    if (
      !Array.isArray(this.shapesData) ||
      this.shapesData.length === 0 ||
      code === ''
    ) {
      // 传了空code 即为没有选中 返回-1
      return -1;
    }
    let selectCode = this.selectCode;
    if (!!code) {
      selectCode = code;
    }
    return this.shapesData.findIndex((item) => {
      return item.code === selectCode;
    });
  }
}
