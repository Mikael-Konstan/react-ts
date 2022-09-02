// 计算文本节点渲染长度
export const visualLen = (
  innerText: string,
  {
    fontSize = '16px',
    fontFamily = 'inherit',
  }: { fontSize: string; fontFamily: string } = {
    fontSize: '16px',
    fontFamily: 'inherit',
  },
) => {
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
  span.style.fontSize = fontSize;
  span.style.fontFamily = fontFamily;
  span.innerText = innerText;

  if (len === 0) {
    document.body.appendChild(span);
  }

  return span.offsetWidth;
};
