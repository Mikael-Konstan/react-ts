import { Tags, TagEnum } from './index.d';

export const tags: Tags = {
  [TagEnum.STYLE]: {
    label: 'CSS',
    color: 'red',
  },
  [TagEnum.TREE]: {
    label: '树组件',
    color: 'green',
  },
  [TagEnum.EDITOR]: {
    label: '富文本',
    color: 'volcano',
  },
  [TagEnum.DRAG]: {
    label: '拖拽',
    color: '#fa6400',
  },
  [TagEnum.DRAG_SORT]: {
    label: '拖拽排序',
    color: '#fa6400',
  },
  [TagEnum.VISUALIZATION]: {
    label: '可视化',
    color: 'blue',
  },
};
