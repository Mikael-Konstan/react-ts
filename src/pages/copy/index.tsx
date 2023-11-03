import { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import numPng from '@/components/icons/pngs/number.png';

const Copy = () => {
  return (
    <div>
      <h1>Copy</h1>
      <div>
        <img src={numPng} alt="" id="testImg" />
        <div className={styles.copy}>
          <span id="copyLink">Welcome to Mikael_Konstan!</span>
          <span className="copyBtn">Copy</span>
        </div>
        <div className={styles.copy}>
          <span id="copyLink2">https://cn.vuejs.org/v2/api/</span>
          <span className="copyBtn2">复制链接</span>
        </div>
        <input type="text" />
      </div>
    </div>
  );
};

export default Copy;
