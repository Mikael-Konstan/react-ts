import React, { CSSProperties } from 'react';
import styles from './index.less';
import { getStyle } from './services';
import { ReactComponent as DeleteSvg } from './svgs/delete.svg';
import { ReactComponent as DetailSvg } from './svgs/detail.svg';
import { ReactComponent as EditSvg } from './svgs/edit.svg';
import { ReactComponent as DownloadSvg } from './svgs/download.svg';
import { ReactComponent as RotateSvg } from './svgs/rotate.svg';
import { ReactComponent as ZoomInSvg } from './svgs/zoomIn.svg';
import { ReactComponent as ZoomOutSvg } from './svgs/zoomOut.svg';
import { ReactComponent as FullScreenSvg } from './svgs/fullScreen.svg';
import { ReactComponent as NotFullScreenSvg } from './svgs/notFullScreen.svg';

export type IconSvgType =
  | 'delete'
  | 'detail'
  | 'edit'
  | 'download'
  | 'rotate'
  | 'zoomin'
  | 'zoomout'
  | 'fullScreen'
  | 'notFullScreen';

export const SvgMap = {
  delete: DeleteSvg,
  detail: DetailSvg,
  edit: EditSvg,
  download: DownloadSvg,
  rotate: RotateSvg,
  zoomin: ZoomInSvg,
  zoomout: ZoomOutSvg,
  fullScreen: FullScreenSvg,
  notFullScreen: NotFullScreenSvg,
};

export interface IconSvgProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  type: IconSvgType;
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export const IconSvg = (props: IconSvgProps) => {
  const className = `${styles.svgContainer} ${props.className || ''}`;
  const style: CSSProperties = getStyle(props);
  const Props = {
    ...props,
    className,
  };
  return (
    <p {...Props} style={style}>
      {SvgMap[props.type]}
    </p>
  );
};

export {
  DeleteSvg,
  DetailSvg,
  EditSvg,
  DownloadSvg,
  RotateSvg,
  ZoomInSvg,
  ZoomOutSvg,
  FullScreenSvg,
  NotFullScreenSvg,
};
