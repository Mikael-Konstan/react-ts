import request from '@/utils/request';
import { getAboutModelNumberRes } from './type';

export const getAboutModelNumberApi = (): Promise<getAboutModelNumberRes> => {
  return request({
    url: '/about/modelNumber',
    method: 'get',
  });
};
