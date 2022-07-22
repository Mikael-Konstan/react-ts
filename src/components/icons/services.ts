import { CSSProperties } from 'react';

const isStyleNum = (num: string) => {
  const reg = /^[1-9]+[0-9]*.?[0-9]*/g;
  return reg.test(num + '');
};

export interface getStyleParams {
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export const getStyle = (params: getStyleParams) => {
  const style: CSSProperties = {};
  if (isStyleNum(params.size + '')) {
    style.width = params.size + 'px';
    style.height = params.size + 'px';
  }
  if (isStyleNum(params.width + '')) {
    style.width = params.width + 'px';
  }
  if (isStyleNum(params.height + '')) {
    style.height = params.height + 'px';
  }
  return style;
};
