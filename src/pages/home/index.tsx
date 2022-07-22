import { CSSProperties, FC, useEffect, useState } from 'react';
import styles from './index.less';
import { setCookie } from '@/utils/tools/cookie';

const Home = () => {
  useEffect(() => {
    setCookie('token', 'token');
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
