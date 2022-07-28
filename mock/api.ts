const Mock = require('mockjs');

const resCommon = {
  code: 200,
  success: true,
  message: 'message',
};

const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
    },
  ],
});

const throttleData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'name|1-10': 'name',
    },
  ],
});

const modelNumber = Mock.mock({
  'number|1-100': 100,
});

export default {
  // 支持值为 Object 和 Array
  'GET /ReactRedux/modelNumber': {
    ...resCommon,
    data: modelNumber.number,
  },

  // GET 可忽略
  '/fnList/throttle/queryList': {
    ...resCommon,
    message: 'throttle',
    data: throttleData.list,
    total: 86,
  },

  // 支持自定义函数，API 参考 express@4
  'POST /users/create': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },

  'POST /drop/data': data,
};
