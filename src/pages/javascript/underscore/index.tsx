import { useEffect } from 'react';
import styles from './index.less';
import comStyles from '@/pages/common.less';
import { Link } from '@/components';
import * as _lodash from 'lodash';
import * as _underscore from 'underscore';

const JavaScript = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <h1>JavaScript</h1>
      <div className={comStyles.ModalContainer}>
        <p>
          <Link href="https://underscorejs.net/">Underscore</Link>
        </p>
        <p>underscore example - isBoolean</p>
        <div>isBoolean('sss'): {_underscore.isBoolean('sss') + ''}</div>
      </div>
    </div>
  );
};

export default JavaScript;
