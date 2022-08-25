import { CSSProperties, FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Link } from '@/components';
import { setCookie } from '@/utils/tools/cookie';

const Home = () => {
  useEffect(() => {
    setCookie('token', 'token');
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <div>
        <h1>React</h1>
        <p>
          <Link href="https://github.com/CJY0208/react-activation/blob/master/README_CN.md">
            react-activation (Vue 中 keep-alive 功能在 React 中的黑客实现)
          </Link>
        </p>
      </div>
      <div>
        <h1>UmiJS</h1>
        <p>
          <Link href="https://v2.umijs.org/zh/guide/">UmiJS V2</Link>
        </p>
        <p>
          <Link href="https://v3.umijs.org/zh-CN/docs/getting-started">
            UmiJS V3
          </Link>
        </p>
        <p>
          <Link href="https://umijs.org/docs/introduce/upgrade-to-umi-4">
            UmiJS V4
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
