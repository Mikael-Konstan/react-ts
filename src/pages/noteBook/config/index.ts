import { NoteListItem } from './index.d';
export * from './tags';
import { cssArticles } from './css';
import { antdCompsArticles } from './antd';
import { javascriptArticles } from './javascript';
import { pluginsArticles } from './plugins';
import { canvasArticles } from './canvas';
export * from './index.d';

export const NoteList: NoteListItem[] = [
  {
    label: 'Plugins',
    key: 'Plugins',
    articles: pluginsArticles,
  },
  {
    label: 'JavaScript',
    key: 'JavaScript',
    articles: javascriptArticles,
  },
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
    label: 'Canvas',
    key: 'Canvas',
    articles: canvasArticles,
  },
];
