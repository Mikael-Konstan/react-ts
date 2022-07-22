import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Spin } from 'antd';
import { IF } from '@/components/IF';
import styles from './index.less';

interface LoadingProps {
  loading?: boolean;
}

const Loading: FC<LoadingProps> = ({ loading = true }) => {
  if (!loading) return null;

  return createPortal(
    <IF condition={loading}>
      <div className={styles.loadingWrap}>
        <Spin className={styles.loading} size="large" />
      </div>
    </IF>,
    document.body,
  );
};

export default Loading;
