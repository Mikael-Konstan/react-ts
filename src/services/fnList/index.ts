import request from '@/utils/request';
import { getDataListApiRes } from './type';

export const getThrottleListApi = (): Promise<getDataListApiRes> => {
  return request({
    url: '/fnList/throttle/queryList',
    method: 'get',
  });
};
