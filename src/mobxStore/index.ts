// mobx 提供的store
import { UserStore } from './user';
import { TodoStore } from './todo';

export { UserStore, TodoStore };

export class Store {
  user;
  todo;
  constructor() {
    this.user = new UserStore(this);
    this.todo = new TodoStore(this);
  }
}

const store = new Store();
const userStore = store.user;
const todoStore = store.todo;

export { store, userStore, todoStore };
