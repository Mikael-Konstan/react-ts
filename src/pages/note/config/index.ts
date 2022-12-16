import { cssArticles } from './css';
import { antdCompsArticles } from './antd';
import { pluginsArticles } from './plugins';

export interface Article {
  title: string;
  path: string;
}

export interface NoteListItem {
  label: string;
  key: string;
  articles: Article[];
}

export const NoteList: NoteListItem[] = [
  {
    label: 'CSS',
    key: 'CSS',
    articles: cssArticles,
  },
  {
    label: 'Ant Design React',
    key: 'AntDesignReact',
    articles: antdCompsArticles,
  },
  {
    label: 'Plugins',
    key: 'Plugins',
    articles: pluginsArticles,
  },
];
