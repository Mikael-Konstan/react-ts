import { makeAutoObservable } from 'mobx';
import { Store } from './index';
import { getReactMobxTodoNumApi } from '@/services/mobx';

export declare type PayloadAction<P = void> = P & {};

export interface TodoItem {
  id: string;
  name: string;
}

export interface TodoState {
  store: Store;
  num: number;
  flag: boolean;
  obj: {
    title: string;
    [key: string]: any;
  };
  products: TodoItem[];
}

export class TodoStore implements TodoState {
  store;
  num = 0;
  flag = true;
  obj = {
    title: 'a',
  };
  products = [
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
  ];

  constructor(store: Store) {
    makeAutoObservable(this, { store: false });
    this.store = store;
  }
  // 更新产品
  updateProducts(
    payloadAction: PayloadAction<
      TodoItem[] | ((products: TodoItem[]) => TodoItem[])
    >,
  ) {
    if (Array.isArray(payloadAction)) {
      this.products = payloadAction;
    } else {
      this.products = payloadAction(this.products);
    }
  }
  // 删除产品
  deleteProduct(id: string) {
    this.products = this.products.filter((product) => {
      return product.id !== id;
    });
    console.log(id);
    console.log(this.products);
  }
  // 携带请求
  getNum() {
    return new Promise((resolve, reject) => {
      getReactMobxTodoNumApi()
        .then(
          (res) => {
            console.log(res);
            const { data } = res;
            this.num = data;
            resolve(res);
          },
          (err) => {
            console.log(err);
            reject(err);
          },
        )
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
  increaseNum() {
    this.num += 1;
  }
  flagToggle() {
    this.flag = !this.flag;
  }
  objChange() {
    this.obj = {
      ...this.obj,
      title: this.obj.title + 'c',
    };
  }
}
