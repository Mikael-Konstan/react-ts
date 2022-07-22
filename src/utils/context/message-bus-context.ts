import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// TODO define type
export class MessageBus {
  constructor() {}
  emit(name: string, data?: any) {
    const observers = this._subscriptions[name];
    if (observers !== undefined) {
      observers.forEach((obs: any) => {
        obs.observer(data);
      });
    }
  }
  // return is unsubscribe function, use it to unsubscribe
  on(name: string, observer: any, key: string = '', force = false) {
    let observers = this._subscriptions[name];
    if (observers === undefined) {
      observers = this._subscriptions[name] = [];
    }
    let newObserver = {
      key: key ? key : uuidv4(),
      observer: observer,
    };
    const pos = observers.findIndex((item: any) => item.key == newObserver.key);

    if (pos >= 0 && force) {
      observers.splice(pos, 1);
      observers.push(newObserver);
    }

    if (pos >= 0 && !force) {
      newObserver = observers[pos];
    }

    if (pos < 0) {
      observers.push(newObserver);
    }

    return () => {
      observers.splice(observers.indexOf(newObserver), 1);
    };
  }
  once(name: string, observer: any, key: string = '', force = false) {
    let observers = this._subscriptions[name];
    if (observers === undefined) {
      observers = this._subscriptions[name] = [];
    }
    let newObserver = {
      key: key ? key : uuidv4(),
      observer: (data: any) => {
        observer(data);
        observers.splice(observers.indexOf(observer), 1);
      },
    };
    const pos = observers.findIndex((item: any) => item.key == newObserver.key);

    if (pos >= 0 && force) {
      observers.splice(pos, 1);
      observers.push(newObserver);
    }

    if (pos >= 0 && !force) {
      newObserver = observers[pos];
    }

    if (pos < 0) {
      observers.push(newObserver);
    }

    return () => {
      observers.splice(observers.indexOf(newObserver), 1);
    };
  }

  _subscriptions: { [key: string]: any } = {};
}

export const MessageBusContext = React.createContext(new MessageBus());
