import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { delCookie, getCookie } from '../tools';
import { history } from 'umi';
import { Base64 } from 'js-base64';
import { CommonRes } from '../type';
import { message as antdMessage, Modal } from 'antd';
import { _BASEURL_ } from '@/global.config';

// TODO code代号意义枚举，没有写全，知道的补充下
enum Code {
  // 老的接口返回0为成功，可以通过success区分是否为成功
  successOld = 0,
  // 新的接口返回200为成功，可以通过success区分是否为成功
  successNew = 200,
  // token过期
  tokenExpire = 12001,
}

interface Options extends AxiosRequestConfig {
  // 是否自动加loading，默认true
  loading?: boolean;
}

const downLoadFile = (data: any, filename: string) => {
  const blob = new Blob([data]);

  let downloadElement = document.createElement('a');
  let href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = filename; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

const TokenExpire = () => {
  delCookie('token');
  Modal.destroyAll();
  history.push('/login');
};

export default async <T>(options: Options) => {
  const {
    data,
    method = 'get',
    loading = true,
    headers = {},
    ...args
  } = options;
  let token = getCookie('token') || '';

  if (!token) {
    history.push('/login');
  }
  // try {
  //   token = Base64.decode(token);
  // } catch (error) {
  //   antdMessage.error('无效的token.');
  //   console.log('无效的token');
    
  //   TokenExpire();
  // }

  const _options: AxiosRequestConfig = {
    baseURL: _BASEURL_,
    method,
    // timeout: 15000,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: data,
    headers: {
      ...headers,
      token,
    },
    ...args,
  };

  return axios(_options)
    .then((response: AxiosResponse<CommonRes<T> | any>) => {
      const { headers } = response;
      // 文件下载
      if (response.data instanceof Blob) {
        const filename =
          headers['content-disposition']?.split('filename=')[1] || '压缩包.zip';
        // return
        downLoadFile(response.data, window.decodeURI(filename) || '文件.xlsx');
        return Promise.resolve(response.data);
      }

      const { success, code } = response.data;
      if (code === Code.tokenExpire && !success) {
        return Promise.reject(new Error('Sorry, you are not logged in'));
      }
      if (code !== 200) {
        // response.data.message && antdMessage.error(response.data.message);
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      const { response = {}, message, code } = error || {};
      if (
        message ===
        `Failed to execute 'setRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point.`
      ) {
        TokenExpire();
        antdMessage.error('无效的token.');
        return;
      }
      let { data, status } = response;

      const judgeCode = (data: any) => {
        antdMessage.destroy();
        data?.message && antdMessage.error(data?.message);

        if (data?.code === Code.tokenExpire) {
          TokenExpire();
        }
      };

      if (data?.type) {
        //当是文件流的时候处理
        let reader = new FileReader();
        reader.readAsText(data, 'utf-8');
        reader.addEventListener('loadend', function () {
          const result: any = reader.result;
          data = JSON.parse(result);
          judgeCode(data);

          return Promise.reject({
            success: false,
            code: code || status,
            message,
            data: null,
          });
        });
      } else {
        judgeCode(data);
        return Promise.reject({
          success: false,
          code: code || status,
          message,
          data: null,
        });
      }
    })
    .finally(() => {});
};
