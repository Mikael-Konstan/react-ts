import { CSSProperties, useState, useEffect, useRef } from 'react';
import { Tooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import styles from './index.less';
import { visualLen } from '@/components/utils';

interface TextOverFlowProps extends TooltipPropsWithTitle {
  Tooltip?: boolean; // 启用antd的Tooltip
  overflowall?: boolean; // 不计算长度 全部显示title
}

export const TextOverFlow = (
  props: TextOverFlowProps = {
    title: '',
    Tooltip: false,
    overflowall: false,
  },
) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [line, setLine] = useState<number>(1);
  const [style, setStyle] = useState<CSSProperties>({});
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const parentNode: any = divRef.current?.parentNode;
    let line = 1;
    let flag = false;
    if (!!parentNode) {
      const style = window.getComputedStyle(parentNode, null);
      const textWidth = visualLen(props.title + '', {
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
      });
      let contentW = parseInt(style.width);
      let contentH = parseInt(style.height);
      if (style.boxSizing === 'border-box') {
        contentW =
          contentW - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
        contentH =
          contentH - parseInt(style.paddingTop) - parseInt(style.paddingBottom);
      }
      line = parseInt(contentH / (parseInt(style.lineHeight) || 16) + '');
      if (line < 1 || typeof line !== 'number') {
        line = 1;
      }
      flag = contentW * line < textWidth;
    }
    setFlag(flag);
    setLine(line);
    setStyle({
      lineClamp: line,
      WebkitLineClamp: line,
    });
  }, [props.title]);

  if (props.Tooltip) {
    return (
      <Tooltip {...props} title={flag || props.overflowall ? props.title : ''}>
        <div
          ref={divRef}
          className={`${styles.TextOverflowBase} ${
            line > 1 ? styles.TextOverflowMulti : styles.TextOverflowSingle
          }`}
          style={style}
        >
          {props.title}
        </div>
      </Tooltip>
    );
  }
  return (
    <div
      {...props}
      ref={divRef}
      className={`${styles.TextOverflowBase} ${
        line > 1 ? styles.TextOverflowMulti : styles.TextOverflowSingle
      }`}
      style={style}
      title={flag || props.overflowall ? props.title + '' : ''}
    >
      {props.title}
    </div>
  );
};

export default TextOverFlow;
