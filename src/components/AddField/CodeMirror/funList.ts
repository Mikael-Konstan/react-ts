export interface FunctionItem {
  name: string;
  list: {
    name: string;
    desc: string;
    usage: string;
    sample: string;
  }[];
  showList: boolean;
}

export const FunctionList: FunctionItem[] = [
  {
    name: '常用函数',
    list: [],
    showList: true,
  },
  {
    name: '数学函数',
    list: [],
    showList: false,
  },
  {
    name: '文本函数',
    list: [],
    showList: false,
  },
  {
    name: '日期函数',
    list: [
      {
        name: 'DateFormat',
        desc: 'DateFormat函数可以返回指定格式的日期',
        usage: 'DateFormat(日期，日期格式)',
        sample: 'DateFormat(2022-01-01, "YYYYmm")，返回:202201',
      },
      {
        name: 'WeekNum',
        desc: 'WeekNum函数可以返回日期所在年的周数',
        usage: 'WeekNum(日期)',
        sample: 'WeekNum(2022-01-01)，返回:1',
      },
      {
        name: 'Now',
        desc: 'Now函数可以返回当前服务器系统时间',
        usage: 'Now()',
        sample: 'Now()，返回:2022/05/28 11:01:21',
      },
    ],
    showList: false,
  },
  {
    name: '逻辑函数',
    list: [],
    showList: false,
  },
];
