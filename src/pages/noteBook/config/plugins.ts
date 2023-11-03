import { Article, TagEnum } from './index.d';
import { tags } from './tags';

export const pluginsArticles: Article[] = [
  {
    title: 'Braft',
    path: '/editor/braft',
    tags: [tags[TagEnum.EDITOR]],
  },
];
