import './index.less';

export interface ShapeTipProps {
  x: number;
  y: number;
  tip: string;
  oldVersion: boolean;
  [key: string]: any;
}

export const ShapeTip = (props: ShapeTipProps) => {
  if (props.oldVersion) {
    return (
      <div
        className="shapeTip oldShapeTip"
        style={{ left: `${props.x}px`, top: `${props.y}px` }}
      >
        {props.tip}
      </div>
    );
  }

  return (
    <div
      className="shapeTip"
      style={{ left: `${props.x}px`, top: `${props.y}px` }}
    >
      <div className="shapeTipTitle">{props.tip}</div>
      <div className="shapeTipArrow"></div>
    </div>
  );
};
