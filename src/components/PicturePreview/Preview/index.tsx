import { FC, useState, useEffect, useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './index.less';
import { getScale } from '@/utils/tools/canvas';
import { IconSvg } from '@/components';

export interface PictureListItem {
  url: string;
  fileCode?: string;
  fileName?: string;
  [key: string]: any;
}

export interface PicturePreviewProps {
  index: number;
  pictureList: PictureListItem[];
  fullScreen?: boolean;
  changeImg: (flag: boolean) => void;
}

export const PicturePreview: FC<PicturePreviewProps> = (
  props: PicturePreviewProps,
) => {
  const PicturePreviewRef = useRef<HTMLDivElement>(null);
  const imgsRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [scaleStatus, setScaleStatus] = useState<string>('');
  const [index, setIndex] = useState<number>(-1);
  const [sourceSize, setSourceSize] = useState<number[]>([0, 0]);
  const [maxSize, setMaxSize] = useState<number[]>([0, 0]);
  const [rotateStep, setRotateStep] = useState<number>(0);
  const backGroundCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (props.index !== undefined || props.index !== null) {
      setIndex(props.index);
    }
  }, [props.index]);

  useEffect(() => {
    if (!props.pictureList[index]) return;
    if (!!backGroundCanvasRef.current) {
      const ctx = backGroundCanvasRef.current.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      ctx.clearRect(
        0,
        0,
        backGroundCanvasRef.current.width,
        backGroundCanvasRef.current.height,
      );
    }
    const imgHTML = new Image();
    imgHTML.src = props.pictureList[index].url;
    imgHTML.onload = function () {
      imgsRef.current = imgHTML;
      imageLoad(imgHTML);
    };
  }, [index, props.pictureList, backGroundCanvasRef.current]);

  useEffect(() => {
    refreshMaxSize();
  }, [props.fullScreen]);

  useEffect(() => {
    PicturePreviewInit({ rotate: 90 * rotateStep });
  }, [sourceSize, scale, imgsRef.current, maxSize, rotateStep]);

  const imageLoad = (imgHTML: HTMLImageElement) => {
    const sWidth = imgHTML.width;
    const sHeight = imgHTML.height;
    setSourceSize([sWidth, sHeight]);
    setRotateStep(0);
    if (backGroundCanvasRef.current) {
      backGroundCanvasRef.current.width = sWidth;
      backGroundCanvasRef.current.height = sHeight;
      let ctx = backGroundCanvasRef.current.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      ctx.drawImage(imgHTML, 0, 0);
    }

    refreshMaxSize([sWidth, sHeight]);
  };
  const PicturePreviewInit = (opts?: { fit?: boolean; rotate?: number }) => {
    if (!backGroundCanvasRef.current || !imgsRef.current) return;
    // 过大才自适应 不穿fit 1:1自适应 不平铺
    let tWidth = sourceSize[0] * scale;
    let tHeight = sourceSize[1] * scale;
    if (opts && opts.fit === true) {
      // 无论原始大小 自适应铺满底框
      const scaleX = maxSize[0] / sourceSize[0];
      const scaleY = maxSize[1] / sourceSize[1];
      let s = scaleX;
      if (scaleX > scaleY) {
        s = scaleY;
      }

      tWidth = sourceSize[0] * s;
      tHeight = sourceSize[1] * s;
    }
    if (opts && opts.fit === false) {
      // 原始大小
      tWidth = sourceSize[0];
      tHeight = sourceSize[1];
    }

    let canvasWidth = tWidth;
    let canvasHeight = tHeight;
    if (opts && (opts.rotate === 90 || opts.rotate === 270)) {
      canvasWidth = tHeight;
      canvasHeight = tWidth;
    }
    backGroundCanvasRef.current.width = canvasWidth;
    backGroundCanvasRef.current.height = canvasHeight;
    const left = (maxSize[0] - canvasWidth) / 2;
    const top = (maxSize[1] - canvasHeight) / 2;
    backGroundCanvasRef.current.style.top = top + 24 + 'px';
    backGroundCanvasRef.current.style.left = left + 'px';

    const ctx = backGroundCanvasRef.current?.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    if (opts && opts.rotate !== undefined) {
      switch (opts.rotate) {
        case 0:
          break;
        case 90:
          ctx.translate(tHeight, 0);
          break;
        case 180:
          ctx.translate(tWidth, tHeight);
          break;
        case 270:
          ctx.translate(0, tWidth);
          break;
        default:
          break;
      }
      ctx.rotate((opts.rotate * Math.PI) / 180);
    }

    ctx.drawImage(
      imgsRef.current,
      0,
      0,
      sourceSize[0],
      sourceSize[1],
      0,
      0,
      tWidth,
      tHeight,
    );
    requestAnimationFrame(() => {
      if (!imgsRef.current) return;
      ctx.drawImage(
        imgsRef.current,
        0,
        0,
        sourceSize[0],
        sourceSize[1],
        0,
        0,
        tWidth,
        tHeight,
      );
    });
  };
  // 鼠标滚轮改变缩放大小
  const onCanvasBGWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setCanvasScale(e.deltaY > 0);
  };
  // 设置画布放缩比例
  const setCanvasScale = (flag: boolean) => {
    let step = 0.1;
    const increment = (flag ? -1 : 1) * step;
    setScale((state) => {
      state += increment;
      return state;
    });
  };
  // 更新最大宽度
  const refreshMaxSize = (sSize?: number[]) => {
    let sWidth = sourceSize[0];
    let sHeight = sourceSize[1];
    if (sSize) {
      sWidth = sSize[0];
      sHeight = sSize[1];
    }
    const { scale, maxW, maxH } = getScale(
      PicturePreviewRef.current,
      sWidth,
      sHeight,
    );
    setScale(scale);
    setScaleStatus('origin');
    setMaxSize([maxW, maxH]);
  };
  // 1:1自适应或者原始大小
  const fitAndOrigin = function () {
    setScaleStatus((status) => {
      const flag = status === 'fit';
      if (!flag && scale === 1) return status;
      // origin 放缩自适应底框   fit 原始大小
      PicturePreviewInit({ fit: flag });
      status = flag ? 'origin' : 'fit';
      return status;
    });
  };
  // 图片旋转
  const rotate = function () {
    setRotateStep((step) => {
      step++;
      if (step === 4) {
        step = 0;
      }
      return step;
    });
  };
  return (
    <>
      <div
        ref={PicturePreviewRef}
        className="PicturePreview"
        onWheel={(e) => onCanvasBGWheel(e)}
        style={{
          height: props.fullScreen
            ? document.body.clientHeight - 68 + 'px'
            : '600px',
        }}
      >
        <canvas ref={backGroundCanvasRef} className="backGroundCanvas"></canvas>
        <div className="PicturePreviewOpts">
          <IconSvg
            type="zoomin"
            className="zoomIn"
            onClick={() => {
              setCanvasScale(false);
            }}
          ></IconSvg>
          <IconSvg
            type="zoomout"
            className="zoomOut"
            onClick={() => {
              setCanvasScale(true);
            }}
          ></IconSvg>
          <span
            className={`scale ${
              scaleStatus === 'origin' && scale === 1 ? 'disabled' : ''
            }`}
            onClick={() => {
              fitAndOrigin();
            }}
          >
            {scaleStatus === 'origin' ? (
              <>1:1</>
            ) : (
              <span className="fit"></span>
            )}
          </span>
          <span className="divider"></span>
          <IconSvg
            type="rotate"
            className="rotate"
            onClick={() => {
              rotate();
            }}
          ></IconSvg>
          <span className="divider"></span>
          <IconSvg
            type="download"
            className="download"
            onClick={() => {
              const url = props.pictureList[index].url;
              open(url);
            }}
          ></IconSvg>
        </div>
        {index > 0 ? <LeftOutlined /> : null}
        {index < props.pictureList.length - 1 ? <RightOutlined /> : null}
      </div>
    </>
  );
};
