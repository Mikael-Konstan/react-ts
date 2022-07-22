import {
  CrownOutlined,
  SmileOutlined,
  TabletOutlined,
} from '@ant-design/icons';

const routes = [
  {
    path: '/home',
    name: '欢迎',
    icon: <SmileOutlined />,
  },
  {
    path: '/fnList',
    name: '功能列表',
    icon: <CrownOutlined />,
    access: 'canAdmin',
    routes: [
      {
        path: '/fnList/dnd',
        name: '拖拽',
        icon: <CrownOutlined />,
      },
      {
        path: '/fnList/throttle',
        name: '节流',
        icon: <CrownOutlined />,
      },
      {
        path: '/fnList/style',
        name: '特殊样式',
        icon: <CrownOutlined />,
      },
    ],
  },
  {
    name: '列表页',
    icon: <TabletOutlined />,
    path: '/list',
    routes: [
      {
        path: '/list/sub-page',
        name: '一级列表页面',
        icon: <CrownOutlined />,
        routes: [
          {
            path: 'sub-sub-page1',
            name: '二级列表页面',
            icon: <CrownOutlined />,
          },
        ],
      },
      {
        path: '/about',
        name: '二级列表页面',
        icon: <CrownOutlined />,
      },
    ],
  },
];

export default {
  route: {
    path: '/',
    routes,
  },
  location: {
    pathname: '/',
  },
};
