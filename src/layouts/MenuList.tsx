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
    path: '/noteBook',
    name: 'NoteBook',
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
