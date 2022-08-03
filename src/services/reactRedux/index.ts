import request from '@/utils/request';
import { getReactReduxModelNumberRes } from './type';

export const getReactReduxModelNumberApi =
  (): Promise<getReactReduxModelNumberRes> => {
    return request({
      url: '/ReactRedux/modelNumber',
      method: 'get',
    });
  };
