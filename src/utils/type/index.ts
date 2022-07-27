import { FieldTypeEnum } from '@/utils/enum';

// interface declare 样例 start
interface SubInterface {
  Test: number;
}
interface SupInterface extends React.FC<SubInterface> {
  Button: string;
}
declare const Sup: SupInterface;
// Sup.Button;
// end
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

export declare type PayloadAction<P = void> = {
  payload: P;
} & {};
