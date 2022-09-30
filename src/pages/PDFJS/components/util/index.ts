// 计算初始放缩比例
export const getScale = function (
  divContainer: HTMLDivElement | null,
  targetWidth: number,
  targetHeight: number,
  fit = false,
) {
  let scale = 1;
  if (!divContainer) {
    return {
      scale,
      maxW: 0,
      maxH: 0,
    };
  }

  const maxW = divContainer.offsetWidth || 0;
  const maxH = (divContainer.offsetHeight || 0) - 64;

  if (targetWidth > maxW || targetHeight > maxH || fit) {
    const scaleX = maxW / targetWidth;
    const scaleY = maxH / targetHeight;
    scale = scaleX;
    if (scaleX > scaleY) {
      scale = scaleY;
    }
  }
  return {
    scale,
    maxW,
    maxH,
  };
};

// 手动计算title长度显示省略号
export const getComment = (comment: string, maxLength = 634, len = 300) => {
  const reg =
    /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]/g;
  let showDetail = false;
  let str = '';
  let str2 = '';
  let num = 0;
  comment.split('').forEach((item, index) => {
    if (reg.test(item)) {
      num += 12;
    } else if (/[0-9]/g.test(item)) {
      num += 7;
    } else if (/[a-z]/g.test(item)) {
      num += 9.5;
    } else if (/[A-Z]/g.test(item)) {
      num += 12;
    } else {
      num += 5;
    }
    if (num < maxLength) {
      str += item;
    }
    if (index < len) {
      str2 += item;
    }
  });
  if (str !== comment) {
    showDetail = true;
  }
  if (str2 !== comment) {
    str2 += '...';
  }
  return {
    commentShow: str2,
    showDetail,
  };
};
