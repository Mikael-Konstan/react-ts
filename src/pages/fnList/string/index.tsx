import { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import styles from './index.less';
import comStyles from '@/pages/common.less';
import { strReplace } from '@/utils/tools';
import { TextOverFlow } from '@/components';

const innerText = 'aASLHD';
const innerText2 = 'aASLHDASLJHDLASHDLS';
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
            <TextOverFlow title={innerText3} Tooltip={true} placement="left" />
          </div>
        </div>
      </div>

      <div className={comStyles.ModalContainer}>
        <div className={styles.textContainerAll} style={{ height: '30px' }}>
          <div className={styles.textContainer}>
            <TextOverFlow title={innerText} OverFlowAll={true} />
          </div>
          <div className={styles.textContainer}>
            <TextOverFlow title={innerText2} />
          </div>
          <div className={styles.textContainer}>
            <TextOverFlow title={innerText3} Tooltip={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default String;
