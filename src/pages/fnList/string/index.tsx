import { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import styles from './index.less';
import { strReplace } from '@/utils/tools';

const String = () => {
  const [keyWord, setKeyWord] = useState<string>('');
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1>String</h1>
      
    </div>
  );
};

export default String;
