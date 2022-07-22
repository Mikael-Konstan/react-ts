import request from '@/utils/request';
import { CommonRes } from '@/utils/type';
import { getFileInfoApiRes } from './type';

export const getFileInfoApi = (
  fileList: string[],
): Promise<CommonRes<getFileInfoApiRes[]>> => {
  return request({
    url: '/proptech_filestore/feign/file',
    method: 'post',
    data: fileList,
  });
};
