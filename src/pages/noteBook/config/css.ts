import { Article, TagEnum } from './index.d';
import { tags } from './tags';

export const cssArticles: Article[] = [
  {
    title: '文本超出',
    path: '/css/textOverFlow',
    tags: [tags[TagEnum.STYLE]],
  },
];
