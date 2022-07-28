export * from './canvas';
export * from './cookie';
export * from './file';

export interface CommonRegKey {
  phoneNumber: RegExp;
  percentage: RegExp;
  numerical: RegExp;
  idCardNo: RegExp;
  email: RegExp;
  text: RegExp;
}

export const CommonReg: CommonRegKey = {
  idCardNo:
    /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  phoneNumber:
    /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/,
  percentage: /^/,
  numerical: /^/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  text: /.*/,
};

export const CommonRegValidate = (key: keyof CommonRegKey, value: string) => {
  return CommonReg[key].test(value);
};

// 判断是否是function
export const isFn = (fn: any) => {
  return Object.prototype.toString.call(fn) === '[object Function]';
};

// 字符串按索引替换删除部分
export const strReplace = (
  str: string,
  start: number,
  end?: number,
  replace?: string,
) => {
  const len = str.length;
  const Replace =
    typeof replace === 'string'
      ? replace
      : replace === undefined
      ? ''
      : Object.prototype.toString.call(replace);
  let Start = start;
  let End = typeof end === 'number' ? end : len;
  if (End < start) {
    let temp = Start;
    Start = End;
    End = temp;
  }
  return str.substring(0, Start) + Replace + str.substring(End, len);
};
