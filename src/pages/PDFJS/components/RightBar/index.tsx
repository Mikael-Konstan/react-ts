import { IconFont } from '@/components';
import { Slider } from 'century';
import { FC, useEffect, useState } from 'react';
import './index.less';

export interface RightBarProps {
  scale: number;
  setCanvasScale: (flag: boolean | number) => void;
}

export const RightBar: FC<RightBarProps> = (props: RightBarProps) => {
  const [scalePercent, setScalePercent] = useState<number>(0);
  useEffect(() => {
    const num = Math.floor(100 * props.scale);
    setScalePercent(num);
  }, [props.scale]);
  const onChange = (value: any) => {
    setScalePercent(value);
    props.setCanvasScale(value / 100);
  };
  return (
    <div className="rightOperationBar">
      <IconFont
        type="icon-suoxiao2"
        className="rightBarZoom rightBarZoomOut"
        onClick={() => {
          props.setCanvasScale(true);
        }}
      />
      <Slider
        className="rightBarZoomSlider"
        min={1}
        max={500}
        value={scalePercent}
        onChange={onChange}
      />
      <IconFont
        type="icon-fangda2"
        className="rightBarZoom rightBarZoomIn"
        onClick={() => {
          props.setCanvasScale(false);
        }}
      />
      <p className="rightBarZoomNum">{scalePercent}%</p>
      {/* <Input type="text" onBlur={() => {
        props.setCanvasScale(1);
      }} /> */}
      <IconFont type="icon-quanping4" className="rightBarFullScreen" />
    </div>
  );
};
