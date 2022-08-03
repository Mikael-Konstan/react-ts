import request from '@/utils/request';
import { getReactMobxTodoNumRes } from './type';

export const getReactMobxTodoNumApi = (): Promise<getReactMobxTodoNumRes> => {
  return request({
    url: '/ReactMobx/todoNum',
    method: 'get',
  });
};
