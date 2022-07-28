export type FileSizeUnit = 'KB' | 'MB' | 'GB' | 'T';
// 文件大小单位转换 字节 B -> KB/MB/GB/T
export const fileSizeUnitConversion = (
  size: number,
  unit: FileSizeUnit = 'MB',
) => {
  // 小数点补零
  function filterNumber(value: number, len = 2) {
    const strNumber = value + '';
    const arr = strNumber.split('.');
    let floatNumber = arr[1] || '';
    floatNumber.substring(0, len);
    let length = len - floatNumber.length;
    for (let i = 0; i < length; i++) {
      floatNumber += '0';
    }
    return arr[0] + '.' + floatNumber;
  }
  function getShowSize(Size: number) {
    return filterNumber(Math.round(Size * 100) / 100) + unit;
  }
  let Size = size / 1024;
  if (unit === 'KB') return getShowSize(Size);
  Size = Size / 1024;
  if (unit === 'MB') return getShowSize(Size);
  Size = Size / 1024;
  if (unit === 'GB') return getShowSize(Size);
  Size = Size / 1024;
  if (unit === 'T') return getShowSize(Size);
};

// 下载文件
export const downLoadFile = (data: Buffer | any, filename: string) => {
  const blob = new Blob([data]);
  const dlLink = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  dlLink.href = href;
  dlLink.download = filename; // 下载后文件名
  document.body.appendChild(dlLink);
  dlLink.click(); // 点击下载
  document.body.removeChild(dlLink); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};
