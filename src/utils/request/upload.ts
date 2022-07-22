import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { delCookie, getCookie } from '../tools';
import { history } from 'umi';
import { Base64 } from 'js-base64';
import { CommonRes } from '../type';
import { message as antdMessage } from 'antd';
import { downLoadFile } from '@/utils/tools';
import { _BASEURL_ } from '@/global.config';

interface RequestConfig<T> {
  url: string;
  file: File;
  data?: T;
}

export default async <T>({
  url,
  file,
  data,
}: RequestConfig<any>): Promise<CommonRes<T>> => {
  let token = getCookie('token') || '';
  token = Base64.decode(token);

  if (!token) {
    history.push('/login');
  }

  let config: AxiosRequestConfig = {
    baseURL: _BASEURL_,
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data',
      token,
    },
  };
  let param = new FormData();
  param.append('file', file);
  for (const key in data) {
    if (data[key]) {
      param.append(key, data[key]);
    }
  }

  return new Promise((resolve, reject) => {
    axios
      .post(url, param, config)
      .then((response: AxiosResponse) => {
        const { headers } = response;
        if (headers['content-disposition']) {
          const filename = headers['content-disposition'].split('filename=')[1];
          downLoadFile(
            response.data,
            window.decodeURI(filename) || '文件.xlsx',
          );
          antdMessage.error('上传失败');
          return reject('上传失败');
        }

        let reader = new FileReader();
        reader.readAsText(response.data, 'utf-8');
        reader.addEventListener('loadend', function () {
          const result: any = reader.result;
          data = JSON.parse(result);

          return resolve(data);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
