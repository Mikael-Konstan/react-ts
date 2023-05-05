import {
  CrownOutlined,
  SmileOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';

const routes = [
  {
    path: '/home',
    name: '欢迎',
    icon: <SmileOutlined />,
  },
  {
    name: 'Store',
    icon: <TabletOutlined />,
    path: '/list',
    routes: [
      {
        path: '/reactRedux/reduxHooks',
        name: 'Redux Hooks',
        icon: <CrownOutlined />,
        // routes: [
        //   {
        //     path: 'sub-sub-page1',
        //     name: '二级列表页面',
        //     icon: <CrownOutlined />,
        //   },
        // ],
      },
      {
        path: '/reactRedux/reduxConnect',
        name: 'Redux Connect',
        icon: <CrownOutlined />,
      },
      {
        path: '/reactRedux/reduxToolkit',
        name: 'Redux Toolkit',
        icon: <CrownOutlined />,
      },
    ],
  },
  {
    name: 'Mobx Store',
    icon: <TabletOutlined />,
    path: '/mobx',
    routes: [
      {
        path: '/mobx/mobxClass',
        name: 'Mobx Class',
        icon: <CrownOutlined />,
      },
      {
        path: '/mobx/mobxHooks',
        name: 'Mobx Hook',
        icon: <CrownOutlined />,
      },
    ],
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
        path: '/fnList/dragSort',
        name: '拖拽排序',
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
      {
        path: '/fnList/codeMirrorMark',
        name: 'CodeMirror Mark',
        icon: <CrownOutlined />,
      },
      {
        path: '/fnList/string',
        name: '字符串',
        icon: <CrownOutlined />,
      },
    ],
  },
  {
    path: '/editor',
    name: '富文本',
    icon: <EditOutlined />,
    access: 'canAdmin',
    routes: [
      {
        path: '/editor/braft',
        name: 'Braft',
        icon: <CrownOutlined />,
      },
    ],
  },
  {
    path: '/javascript',
    name: 'JavaScript',
    icon: <EditOutlined />,
    access: 'canAdmin',
  },
  {
    path: '/noteBook',
    name: 'NoteBook',
    icon: <EditOutlined />,
    access: 'canAdmin',
  },
  {
    path: '/PDFJS',
    name: 'Canvas Tools',
    icon: <EditOutlined />,
    access: 'canAdmin',
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
  title: 'React',
};
