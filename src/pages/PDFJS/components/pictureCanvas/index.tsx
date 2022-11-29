import { FC, useState, useEffect, useRef } from 'react';
import './index.less';
import CanvasEdit from '../canvasEdit';
import { getScale } from './../util/index';

interface PictureCanvasProps {
  imgUrl?: string; // 图片链接
}

const PictureCanvas: FC<PictureCanvasProps> = (props: PictureCanvasProps) => {
  const PictureCanvasRef = useRef<HTMLDivElement>(null);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const [sourceSize, setSourceSize] = useState<number[]>([0, 0]);
  const [offsetSize, setOffsetSize] = useState<number[]>([0, 0]);
  const [curSize, setCurSize] = useState<number[]>([0, 0]);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const backGroundCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!!props.imgUrl) {
      setImgUrl(props.imgUrl);
    }
  }, [props.imgUrl]);

  useEffect(() => {
    if (backGroundCanvasRef.current && imgUrl !== '') {
      init();
    }
  }, [backGroundCanvasRef.current, imgUrl]);

  useEffect(() => {
    pictureCanvasInit();
  }, [sourceSize, scale]);

  const onScaleChange = (scale: number) => {
    setScale(scale);
  };
  const init = () => {
    const imgHTML = new Image();
    imgHTML.src = imgUrl;
    imgHTML.onload = function () {
      imageLoad(imgHTML);
    };
  };
  const imageLoad = (imgHTML: HTMLImageElement) => {
    const sWidth = imgHTML.width;
    const sHeight = imgHTML.height;
    setSourceSize([sWidth, sHeight]);
    if (sourceCanvasRef.current) {
      sourceCanvasRef.current.width = sWidth;
      sourceCanvasRef.current.height = sHeight;
      let ctx = sourceCanvasRef.current.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      ctx.drawImage(imgHTML, 0, 0);
    }

    const { scale, maxW, maxH } = getScale(
      PictureCanvasRef.current,
      sWidth,
      sHeight,
    );
    setScale(scale);
    const left = (maxW - sWidth * scale) / 2;
    const top = (maxH - sHeight * scale) / 2;
    setOffsetSize([left, top]);
  };
  const pictureCanvasInit = () => {
    if (!sourceCanvasRef.current || !backGroundCanvasRef.current) return;
    const tWidth = sourceSize[0] * scale;
    const tHeight = sourceSize[1] * scale;
    setCurSize([tWidth, tHeight]);
    backGroundCanvasRef.current.width = tWidth;
    backGroundCanvasRef.current.height = tHeight;
    const zoomctx = backGroundCanvasRef.current?.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    zoomctx.drawImage(
      sourceCanvasRef.current,
      0,
      0,
      sourceSize[0],
      sourceSize[1],
      0,
      0,
      tWidth,
      tHeight,
    );
  };
  return (
    <>
      <div ref={PictureCanvasRef} className="PictureCanvas">
        <canvas ref={sourceCanvasRef} className="sourceCanvas"></canvas>
        <canvas ref={backGroundCanvasRef} className="backGroundCanvas"></canvas>
        {backGroundCanvasRef.current && (
          <CanvasEdit
            backGroundCanvas={backGroundCanvasRef.current}
            curSize={curSize}
            offsetSize={offsetSize}
            scale={scale}
            onScaleChange={onScaleChange}
          ></CanvasEdit>
        )}
      </div>
    </>
  );
};

export default PictureCanvas;
