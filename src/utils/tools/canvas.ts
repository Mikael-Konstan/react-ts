// 计算canvas初始放缩比例
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
