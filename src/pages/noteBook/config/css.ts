import { Article, TagEnum } from './index.d';
import { tags } from './tags';

export const cssArticles: Article[] = [
  {
    title: '文本超出',
    path: '/textOverFlow/textOverFlow',
    tags: [tags[TagEnum.STYLE]],
  },
  {
    title: '动画 - Animation',
    path: '/animation',
    tags: [tags[TagEnum.STYLE]],
  },
];
