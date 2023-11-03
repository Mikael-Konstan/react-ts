import { Article, TagEnum } from './index.d';
import { tags } from './tags';

export const cssArticles: Article[] = [
  {
    title: '动画 - Animation',
    path: '/animation',
    tags: [tags[TagEnum.ANIMATION]],
  },
  {
    title: '文本超出',
    path: '/css/textOverFlow',
    tags: [tags[TagEnum.STYLE]],
  },
  {
    title: '高度塌陷',
    path: '/css/highCollapse',
    tags: [tags[TagEnum.STYLE]],
  },
];
