import { Article, TagEnum } from './index.d';
import { tags } from './tags';

export const javascriptArticles: Article[] = [
  {
    title: '复制 - copy',
    path: '/javascript/copy',
    tags: [tags[TagEnum.UTILS]],
  },
  {
    title: '节流 - throttle',
    path: '/javascript/throttle',
    tags: [tags[TagEnum.UTILS]],
  },
];
