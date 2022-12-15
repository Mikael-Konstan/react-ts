import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
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
      <ZoomOutOutlined
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
      <ZoomInOutlined
        className="rightBarZoom rightBarZoomIn"
        onClick={() => {
          props.setCanvasScale(false);
        }}
      />
      <p className="rightBarZoomNum">{scalePercent}%</p>
      {/* <Input type="text" onBlur={() => {
        props.setCanvasScale(1);
      }} /> */}
    </div>
  );
};
