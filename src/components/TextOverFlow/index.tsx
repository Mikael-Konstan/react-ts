import { CSSProperties, useState, useEffect, useRef } from 'react';
import { Tooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import styles from './index.less';

interface TextOverFlowProps extends TooltipPropsWithTitle {
  Tooltip?: boolean;
  OverFlowAll?: boolean;
}

export const TextOverFlow = (props: TextOverFlowProps) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [line, setLine] = useState<number>(1);
  const [style, setStyle] = useState<CSSProperties>({});
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const parentNode: any = divRef.current?.parentNode;
    const textWidth = visualLen(props.title + '');
    let line = 1;
    let flag = false;
    if (!!parentNode) {
      const style = window.getComputedStyle(parentNode, null);
      const parantW = parseInt(style.width);
      let contentW = parantW;
      let contentH = parseInt(style.height);
      if (style.boxSizing === 'border-box') {
        contentW -= parseInt(style.paddingLeft) - parseInt(style.paddingRight);
        contentH -= parseInt(style.paddingTop) - parseInt(style.paddingBottom);
      }
      line = parseInt(contentH / parseInt(style.lineHeight) + '');
      flag = parantW * line < textWidth;
    }
    setFlag(flag);
    setLine(line);
    setStyle({
      lineClamp: line,
      WebkitLineClamp: line,
    });
  }, []);

  const visualLen = (innerText: string) => {
    let span: any;
    const className = 'visualLenContainer';
    const spans = document.getElementsByClassName(className);
    const len = spans.length;
    if (len > 0) {
      span = spans[0];
    } else {
      span = document.createElement('span');
      span.className = className;
      span.style.position = 'fixed';
      span.style.visibility = 'hidden';
      span.style.whiteSpace = 'nowrap';
      span.style.zIndex = '-100';
    }
    span.style.fontSize = '16px';
    span.style.fontFamily = 'inherit';
    span.innerText = innerText;

    if (len === 0) {
      document.body.appendChild(span);
    }

    return span.offsetWidth;
  };
  if (props.Tooltip) {
    return (
      <Tooltip {...props} title={flag || props.OverFlowAll ? props.title : ''}>
        <div
          ref={divRef}
          className={`${styles.TextOverflowBase} ${
            line === 1 ? styles.TextOverflowSingle : styles.TextOverflowMulti
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
        line === 1 ? styles.TextOverflowSingle : styles.TextOverflowMulti
      }`}
      style={style}
      title={flag || props.OverFlowAll ? props.title + '' : ''}
    >
      {props.title}
    </div>
  );
};

export default TextOverFlow;
