// mobx 提供的hooks useLocalObservable
// 单个组件状态提取 替换useState useEffect...内置hooks
import { useLocalObservable } from 'mobx-react';

export interface TodoItem {
  id: string;
  name: string;
}

const state = {
  num: 0,
  flag: true,
  obj: {
    title: 'a',
  },
  products: [
    {
      id: 'dva',
      name: 'dva',
    },
    {
      id: 'mobx',
      name: 'mobx',
    },
    {
      id: 'antd',
      name: 'antd',
    },
  ],
  // 删除产品
  deleteProduct(id: string) {
    this.products = this.products.filter((product) => {
      return product.id !== id;
    });
  },
  increaseNum() {
    this.num += 1;
  },
  flagToggle() {
    this.flag = !this.flag;
  },
  objChange() {
    this.obj = {
      ...this.obj,
      title: this.obj.title + 'c',
    };
  },
};

export const useTodoStore = () => {
  const data = useLocalObservable(() => state);
  // useLocalObservable 状态不能多个组件共享
  // 能做的是替换单个组件内置hooks   比如useState useEffect
  // 相当于单个组件数据状态提取  与视图分离
  return data;
};
