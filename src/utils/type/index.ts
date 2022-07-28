import { FieldTypeEnum } from '@/utils/enum';

export interface CommonRes<T = any> {
  requestId?: number; // 接口请求id
  success: boolean; // 状态(true:成功,false:失败)
  message: string; // 错误提示
  code?: number; // 错误码
  total: number; // 记录总数（分页时有用）
  timestamp: number; // 接口响应时间戳
  data: T; // 业务对象（分页信息不要放在data里）
}

export type FieldType =
  | FieldTypeEnum.WORD
  | FieldTypeEnum.DATE
  | FieldTypeEnum.NUMBER
  | FieldTypeEnum.OTHER;

// 参数式type start
export declare type PayloadAction<P = void> = {
  payload: P;
} & {};
// 列子
const PayloadActionEg: PayloadAction<string> = {
  payload: '',
};
// 参数式type end

// type 命名空间 例子 start
export declare namespace DeclareTypeEg {
  type StringEg = string;
  type NumberEg = number;
}
interface SubTypeEg {
  text: DeclareTypeEg.StringEg;
}
// type 命名空间 例子 end

// type 继承多个 start
interface Sub1 {
  a: number;
}
interface Sub2 {
  b: string;
}
interface Supper extends Sub1, Sub2 {}
const obj: Supper = {
  a: 1,
  b: '2',
};
// type 继承多个 end
