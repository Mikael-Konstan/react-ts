import { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import styles from './index.less';
import comStyles from '@/pages/common.less';
import { strReplace } from '@/utils/tools';
import { TextOverFlow } from '@/components';

const innerText = 'aASLHD';
const innerText2 = 'aASLHDASLJHDLASHDLSAaASLHDASLJHDLASHD';
const innerText3 =
  'aASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSA';

const String = () => {
  const [keyWord, setKeyWord] = useState<string>('');
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1>String</h1>

      <div className={comStyles.ModalContainer}>
        <div className={styles.textContainerAll}>
          <div className={styles.textContainer}>
            <TextOverFlow title={innerText} />
          </div>
          <div className={styles.textContainer}>
            <TextOverFlow title={innerText2} />
          </div>
          <div className={styles.textContainer}>
            <a
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
              <TextOverFlow
                title={`多行文字显示省略号 ${innerText3}`}
                Tooltip={true}
                placement="top"
              />
            </a>
          </div>
        </div>
      </div>

      <div className={comStyles.ModalContainer}>
        <div className={styles.textContainerAll} style={{ height: '50px' }}>
          <div className={styles.textContainer}>
            <TextOverFlow title="无视长度 显示title" OverFlowAll={true} />
          </div>
          <div className={styles.textContainer}>
            <TextOverFlow title={`不使用antd的Tooltip ${innerText2}`} />
          </div>
          <div className={styles.textContainer}>
            <a
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
              <TextOverFlow
                title={`使用antd的Tooltip ${innerText3}`}
                Tooltip={true}
                placement="left"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default String;
