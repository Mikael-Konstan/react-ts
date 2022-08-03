import { makeAutoObservable } from 'mobx';
import { Store } from './index';

export class UserStore {
  store;
  name: string = '';
  constructor(store: Store) {
    makeAutoObservable(this, { store: false });
    this.store = store;
  }

  getTodos(user: string) {
    return this.store.todo.products.filter(
      (product) => product.id === user,
    );
  }
}
