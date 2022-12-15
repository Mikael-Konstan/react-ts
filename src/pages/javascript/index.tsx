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
          <Link href="https://www.lodashjs.com/">Lodash</Link>
        </p>
        <p>lodash example - add</p>
        <div>1.333 + 4.666 = {_lodash.add(1.333, 4.666)}</div>
      </div>
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
