import { FC, useEffect, useState, useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import { history } from 'umi';
import { Provider } from 'react-redux';
import store from '@/reduxStore/reducerConfig';
import defaultProps from './MenuList';

interface LayoutProps {}

const LayoutProvider: FC<LayoutProps> = ({ children }) => {
  const [pathname, setPathname] = useState('/welcome');

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <Provider store={store}>
        <ProLayout
          {...defaultProps}
          location={{
            pathname,
          }}
          menuItemRender={(item, dom) => (
            <a
              onClick={() => {
                setPathname(item.path || '/welcome');
                history.push({
                  pathname: item.path,
                });
              }}
            >
              {dom}
            </a>
          )}
          headerHeight={0}
          // rightContentRender={() => (
          //   <div>
          //     rightContentRender
          //     <Avatar shape="square" size="small" icon={<UserOutlined />} />
          //   </div>
          // )}
        >
          {children}
        </ProLayout>
      </Provider>
    </div>
  );
};

export default LayoutProvider;
