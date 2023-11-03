import { NoteListItem } from './index.d';
export * from './tags';
import { cssArticles } from './css';
import { antdCompsArticles } from './antd';
import { pluginsArticles } from './plugins';
import { canvasArticles } from './canvas';
export * from './index.d';

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
  {
    label: 'Canvas',
    key: 'Canvas',
    articles: canvasArticles,
  },
];
