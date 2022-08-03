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

// 接口继承类
class Control {
  private statePrivate: string = '';
  public statePublic: string = 'statePublic';
}

interface SelectableControl extends Control {
  select(): void;
}

interface ImplementsMulti {
  a: string;
}
// class类 定义接口
class Button extends Control implements SelectableControl, ImplementsMulti {
  select() {}
  a = '111';
}
// const button = new Button();
// console.log(button.statePublic);
// console.log(button.select());
// console.log(button.a);
