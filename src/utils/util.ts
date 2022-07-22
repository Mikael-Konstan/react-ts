const pattern = /(\w+)\[(\d+)\]/;

export default {
  /**
   * 字符串url编码
   * @param {String} str
   * @return {String}
   */
  encode(str: string): string {
    try {
      return encodeURIComponent(str);
    } catch (e) {
      return str;
    }
  },

  /**
   * 字符串url解码
   * @param {String} str
   * @return {String}
   */
  decode(str: string): string {
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
      return str;
    }
  },

  /**
   * 字符串base64加密
   * @param {String} str
   * @return {String}
   */
  base64Encode(str: string): string {
    str = this.encode(str);
    try {
      return window.btoa(str);
    } catch (e) {
      return str;
    }
  },

  /**
   * 字符串base64解密
   * @param {String} str
   * @return {String}
   */
  base64Decode(str: string): string {
    try {
      str = window.atob(str);
      return this.decode(str);
    } catch (e) {
      return str;
    }
  },

  /**
   * 将手机号中间4位隐藏
   * @param {String} phone
   * @return {String}
   */
  hidePhone(phone: string): string {
    if (/^1\d{10}$/.test(phone)) {
      return phone.replace(phone.substr(3, 4), '****');
    }

    return phone;
  },

  /**
   * 格式化日期
   * @param date
   * @param fmt
   */
  formatDate(date?: number | Date, fmt = 'YYYY-MM-DD HH:mm:ss'): string {
    if (date === undefined) return '-';
    if (typeof date === 'number') {
      date = new Date(date);
    }

    const opt: any = {
      'Y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'D+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3).toString(), // 季度
      S: date.getMilliseconds().toString(), // 毫秒
    };
    for (const k in opt) {
      const ret = new RegExp(`(${k})`).exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'),
        );
      }
    }

    return fmt;
  },

  /**
   * 倒计时函数
   * @param time
   * @param callback
   */
  countdown(time: number | Date, callback?: (date: any) => void): any {
    if (time instanceof Date) {
      time = time.getTime() - Date.now();
    }

    let timeout: any;
    const interval = 1000;
    let start = Date.now();
    const counter = () => {
      const date = {
        over: <number>time <= 0,
        day: Math.floor(Math.abs(<number>time) / 1000 / 60 / 60 / 24), // 日
        hours: Math.floor((Math.abs(<number>time) / 1000 / 60 / 60) % 24), // 时
        minutes: Math.floor((Math.abs(<number>time) / 1000 / 60) % 60), // 分
        seconds: Math.floor((Math.abs(<number>time) / 1000) % 60), // 秒
      };
      if (callback) {
        callback(date);
        if (!date.over) {
          (<number>time) -= interval;
          const _interval = interval - Date.now() + start;
          start += interval;
          timeout = setTimeout(counter, _interval < 0 ? 0 : _interval);
        }
      }
      return date;
    };

    let result: any = counter();
    if (callback) {
      result = () => {
        clearTimeout(timeout);
        timeout = undefined;
      };
    }

    return result;
  },

  /**
   * 截取字符串，多余...
   * @param str
   * @param len
   */
  subLen(str: string, len: number): string {
    let newLength = 0;
    let newStr = '';
    const chineseRegex = /[^\x00-\xff]/g;
    let singleChar = '';
    const strLength = str.replace(chineseRegex, '**').length;
    for (let i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (strLength > len) {
      newStr += '...';
    }
    return newStr;
  },

  /**
   * 将查询字符串转换为key/value对象
   * @param {String} str
   * @return {Object}
   */
  parse(str: string): Record<string, string | string[]> {
    str = str.trim();
    if (str === '') return {};
    if (str.charAt(0) === '?') str = str.slice(1);

    const obj: any = {};
    const pairs = str.split('&');
    for (let i = 0; i < pairs.length; i++) {
      const parts = pairs[i].split('=');
      const key = this.decode(parts[0]);
      const m = pattern.exec(key);

      if (m) {
        obj[m[1]] = obj[m[1]] || [];
        obj[m[1]][m[2]] = this.decode(parts[1]);
        continue;
      }

      obj[parts[0]] = parts[1] === null ? '' : this.decode(parts[1]);
    }

    return obj;
  },

  /**
   * 将对象转换为查询字符串
   * @param {object} obj
   * @return {String}
   */
  stringify(obj: Record<string, any>): string {
    if (!obj || !Object.keys(obj).length) return '';
    const pairs: string[] = [];

    for (const key in obj) {
      const value = obj[key];

      if (this.toType(value) === 'array') {
        for (let i = 0; i < value.length; i++) {
          const arrStr = `${this.encode(`${key}[${i}]`)}=${this.encode(value[i])}`;
          pairs.push(arrStr);
        }
        continue;
      }

      const str = `${this.encode(key)}=${this.encode(value)}`;
      pairs.push(str);
    }

    return pairs.join('&');
  },

  /**
   * 通过对象原型判断数据类型
   * @param obj
   * @return {String}
   */
  toType(obj: any): string {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },

  /**
   * 生成指定长度的随机字符串
   * @param long
   */
  randomStr(long: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const maxPos = chars.length;
    let string = '';
    for (let i = 0; i < long; i++) {
      string += chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return string;
  },

  /**
   * 获取请求的UUID，指定长度和进制,如
   * getUUID(8, 2)   //"01001010" 8 character (base=2)
   * getUUID(8, 10) // "47473046" 8 character ID (base=10)
   * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
   *
   */
  getUUID(len?: number, radix?: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid: string[] = [];
    let i: number;

    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },

  /**
   * 过滤数据中的空值
   * @param {object} params
   * @return {object}
   */
  filterNull(params: Record<string, any>): Record<string, any> {
    if (Array.isArray(params)) {
      params = params.filter((obj, index, arr) => {
        if (obj == null) {
          return false;
        }
        if (typeof obj === 'string') {
          obj = obj.trim();
          if (obj === '') {
            return false;
          }
        } else if (typeof obj === 'object') {
          obj = this.filterNull(obj);
          const len = obj.hasOwnProperty('length') ? obj.length : Object.keys(obj).length;
          if (len === 0) {
            return false;
          }
        }

        arr[index] = obj;
        return true;
      });
    } else {
      for (const key in params) {
        if (params[key] == null) {
          delete params[key];
        } else if (typeof params[key] === 'string') {
          params[key] = params[key].trim();
          if (params[key] === '') {
            delete params[key];
          }
        } else if (typeof params[key] === 'object') {
          params[key] = this.filterNull(params[key]);
          const len = Object.prototype.hasOwnProperty.call(params[key], 'length')
            ? params[key].length
            : Object.keys(params[key]).length;
          if (len === 0) {
            delete params[key];
          }
        }
      }
    }

    return params;
  },

  /**
   * 函数节流
   * @param {Function} func
   * @param {Number} wait
   * @param {Object} options -- leading = false | trailing = false
   * @return {Function}
   */
  throttle(func: any, wait: number, options: { leading?: boolean; trailing?: boolean } = {}): any {
    let result: any;
    let prev = 0;
    let timeout: NodeJS.Timeout | null;
    let args: any[] | null;
    let ctx: null;

    const later = () => {
      prev = options.leading === false ? 0 : Date.now();
      result = func.apply(ctx, args);
      timeout = args = ctx = null;
    };

    const throttled = function (...arrs: any[]) {
      const now = Date.now();
      if (!prev && options.leading === false) {
        prev = now;
      }
      const remaining = wait - (now - prev);
      args = arrs;
      // @ts-ignore
      ctx = this;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        prev = now;
        result = func.apply(ctx, args);
        if (!timeout) {
          args = ctx = null;
        }
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      prev = 0;
      args = ctx = null;
    };

    return throttled;
  },

  /**
   * 函数防抖
   * @param {Function} func
   * @param {Number} wait
   * @param {Boolean} immediate
   * @return {Function}
   */
  debounce(func: any, wait: number, immediate?: boolean): any {
    let result: any;
    let timeout: NodeJS.Timeout | null;

    const debounced = function (...args: any[]) {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (immediate) {
        const callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        if (callNow) {
          // @ts-ignore
          result = func.apply(this, args);
        }
      } else {
        timeout = setTimeout(() => {
          // @ts-ignore
          result = func.apply(this, args);
          timeout = null;
        }, wait);
      }

      return result;
    };

    debounced.cancel = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };

    return debounced;
  },

  /**
   * 延时执行
   * @param fn
   * @param time
   * @param args
   */
  delay(fn: (...args: any[]) => void, time: number, ...args: any[]): any {
    let timeoutId: any = setTimeout(() => {
      fn.apply(args.shift(), args);
      clearTimeout(timeoutId);
      timeoutId = null;
    }, time);

    return timeoutId;
  },

  /**
   * 将文件流保存为本地文件
   * @param blob
   * @param fileName
   */
  downloadExportFile(blob: any, fileName: string) {
    const downloadDom = document.createElement('a');
    let href = blob;
    if (typeof blob === 'string') {
      downloadDom.target = '_blank';
    } else {
      href = URL.createObjectURL(blob);
    }
    downloadDom.href = href;
    const timeStr = this.formatDate(new Date(), 'YYYYMMDDHHmmss');
    downloadDom.download = `${timeStr}-${fileName}`;
    downloadDom.style.display = 'none';
    document.body.appendChild(downloadDom);
    downloadDom.click();
    document.body.removeChild(downloadDom);
    if (typeof blob !== 'string') {
      URL.revokeObjectURL(href);
    }
  },

  /**
   * 从服务端下载文件
   * @param url
   * @param fileName
   */
  fileLinkToStreamDownload(url: string, fileName: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader('If-Modified-Since', '0');
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response]);
        this.downloadExportFile(blob, fileName);
      }
    };
    xhr.send(null);
  },
};
