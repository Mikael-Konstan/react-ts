// 静态配置
const fileDomain = 'http://****:8080';
const requestDomain = 'http://****:8080';

const _ENV: string = process.env.__ENV__ || '';

const URLMAP: any = {
  local: requestDomain,
  test: fileDomain,
  prod: '',
};

const _BASEURL_ = URLMAP[_ENV];

export { fileDomain, _BASEURL_ };

export const picturesExtension = ['jpg', 'jpeg', 'bmp', 'png', 'svg'];

export const filesExtension = ['pdf'];
