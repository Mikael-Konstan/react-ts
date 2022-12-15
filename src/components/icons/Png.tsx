import React, { CSSProperties } from 'react';
import styles from './index.less';
import { getStyle } from './services';
import WordPng from './pngs/word.png';
import DatePng from './pngs/date.png';
import NumberPng from './pngs/number.png';
import OtherPng from './pngs/other.png';

export enum IconPngType {
  WORD = 'word',
  DATE = 'date',
  NUMBER = 'number',
  OTHER = 'other',
}

export const PngMap = {
  word: WordPng,
  date: DatePng,
  number: NumberPng,
  other: OtherPng,
};

export interface IconPngProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  type: IconPngType;
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export const IconPng = (props: IconPngProps) => {
  const className = `${styles.pngContainer} ${props.className || ''}`;
  const style: CSSProperties = getStyle(props);
  const Props = {
    ...props,
    className,
  };

  return (
    <img
      src={PngMap[props.type]}
      {...Props}
      style={{ ...style, ...props.style }}
    />
  );
};
