import { FC } from 'react';
import { Link } from '@/components';
import styles from './index.less';

interface ArticleLayoutProps {
  title: string;
}

export const ArticleLayout: FC<ArticleLayoutProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <Link href="/noteBook" target="_self">
          NoteBook
        </Link>
      </div>
      {children}
    </div>
  );
};
