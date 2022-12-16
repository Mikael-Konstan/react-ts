import { FC } from 'react';
import styles from './index.less';

interface ArticleLayoutProps {
  title: string;
}

export const ArticleLayout: FC<ArticleLayoutProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <a href="/note">Note</a>
      </div>
      {children}
    </div>
  );
};
