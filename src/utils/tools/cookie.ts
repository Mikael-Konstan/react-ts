import Cookie, { CookieAttributes } from 'js-cookie';

export const setCookie = (
  name: string,
  value: any,
  config?: CookieAttributes,
) => {
  Cookie.set(name, JSON.stringify(value), config);
};

export const getCookie = (name: string) => {
  return Cookie.get(name);
};

export const delCookie = (name: string) => {
  Cookie.remove(name);
};
