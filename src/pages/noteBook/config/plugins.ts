import { Article, TagEnum } from './index.d';
import { tags } from './tags';

export const pluginsArticles: Article[] = [
  {
    title: '代码、公式编辑 - CodeMirrorMark',
    path: '/code/codeMirrorMark',
    tags: [tags[TagEnum.CODE]],
  },
  {
    title: '代码高亮 - CodeHighLight',
    path: '/code/CodeHighLight',
    tags: [tags[TagEnum.CODE]],
  },
  {
    title: 'Braft',
    path: '/editor/braft',
    tags: [tags[TagEnum.EDITOR]],
  },
  {
    title: 'React Dnd',
    path: '/drag/dnd',
    tags: [tags[TagEnum.DRAG]],
  },
  {
    title: 'React Dnd Dort',
    path: '/drag/dragSort',
    tags: [tags[TagEnum.DRAG]],
  },
  {
    title: 'React Redux',
    path: '/reactRedux/reduxConnect',
    tags: [tags[TagEnum.REDUX]],
  },
  {
    title: 'React Redux',
    path: '/reactRedux/reduxHooks',
    tags: [tags[TagEnum.REDUX]],
  },
  {
    title: 'React Redux',
    path: '/reactRedux/reduxToolkit',
    tags: [tags[TagEnum.REDUX]],
  },
  {
    title: 'Mobx Class',
    path: '/mobx/mobxClass',
    tags: [tags[TagEnum.MOBX]],
  },
  {
    title: 'Mobx Hooks',
    path: '/mobx/mobxHooks',
    tags: [tags[TagEnum.MOBX]],
  },
  {
    title: 'lodash - javascript',
    path: '/javascript/lodash',
    tags: [tags[TagEnum.UTILS]],
  },
  {
    title: 'underscore - javascript',
    path: '/javascript/underscore',
    tags: [tags[TagEnum.UTILS]],
  },
];
