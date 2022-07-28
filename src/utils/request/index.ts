import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { history } from 'umi';
import { Base64 } from 'js-base64';
import { message as antdMessage, Modal } from 'antd';
import { CommonRes } from '@/utils/type';
import { delCookie, getCookie, downLoadFile } from '@/utils/tools';
import { _BASEURL_ } from '@/global.config';

// TODO code代号意义枚举，需要补充
enum Code {
  // 接口返回200为成功
  success = 200,
  // token过期
  tokenExpire = 12001,
}

interface Options extends AxiosRequestConfig {
  // 是否自动加loading，默认true
  loading?: boolean;
}

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
        const reader = new FileReader();
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
